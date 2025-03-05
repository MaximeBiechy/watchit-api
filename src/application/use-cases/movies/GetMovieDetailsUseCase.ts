import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { MovieRepositoryInterface } from '../../../domain/repositories/index.js';
import { ValidationError, TMDBServerError } from '../../../shared/errors/index.js';
import { config } from '../../../config/config.js';
import { MovieDTO } from '../../../domain/dtos/index.js';

@injectable()
class GetMovieDetailsUseCase {
  constructor(@inject(TYPES.MovieRepository) private movieRepository: MovieRepositoryInterface) {
  }

  async execute(movieId: string, language: string = 'fr-FR'): Promise<MovieDTO> {
    if (!movieId) {
      throw new ValidationError('Invalid movieId', 'InvalidMovieId');
    }

    if (language.length !== 5) {
      language = 'fr-FR';
    }

    try {
      const [details, credits, watchProviders] = await Promise.all([
        this.movieRepository.getMovieDetails(movieId, language),
        this.movieRepository.getMovieCredits(movieId, language),
        this.movieRepository.getMovieWatchProviders(movieId),
      ]);

      const actors = credits.cast.slice(0, 10)?.map((actor: any) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePath: actor.profile_path ? `${config.TMDB.IMAGE_BASE_URL}${actor.profile_path}` : null,
      }));

      const codeCountry = language.split('-')[1].toUpperCase();

      const streamingProviders =
        watchProviders.results?.[codeCountry]?.flatrate?.map((provider: any) => provider.provider_name) || [];

      return new MovieDTO(
        details.id,
        details.title,
        details.genres?.map((genre: any) => genre.name),
        details.runtime,
        details.overview,
        details.poster_path ? `${config.TMDB.IMAGE_BASE_URL}${details.poster_path}` : null,
        details.backdrop_path ? `${config.TMDB.IMAGE_BASE_URL}${details.backdrop_path}` : null,
        credits.crew.find((crewMember: any) => crewMember.job === 'Director')?.name || 'Unknown',
        new Date(details.release_date),
        details.vote_average,
        actors,
        streamingProviders,
      );
    } catch (error: any) {
      throw new TMDBServerError(error.message, 'ServerError');
    }
  }
}

export default GetMovieDetailsUseCase;
