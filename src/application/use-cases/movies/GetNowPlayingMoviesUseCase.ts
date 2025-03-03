import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import MovieRepositoryInterface from '../../../domain/repositories/MovieRepositoryInterface.js';
import { ValidationError, TMDBServerError } from '../../../shared/errors/index.js';
import { config } from '../../../config/config.js';
import { NowPlayingMovieDTO } from '../../../domain/dtos/index.js';

@injectable()
class GetNowPlayingMoviesUseCase {
  constructor(@inject(TYPES.MovieRepository) private movieRepository: MovieRepositoryInterface) {}

  async execute(region: string, language: string): Promise<NowPlayingMovieDTO[]> {
    if (!region || !language) {
      throw new ValidationError('Invalid region or language', 'InvalidRegionOrLanguage');
    }

    try {
      const movies = await this.movieRepository.getNowPlayingMovies(region, language);

      return movies.map(
        (movie: any) =>
          new NowPlayingMovieDTO(movie.id, movie.poster_path ? `${config.TMDB.IMAGE_BASE_URL}${movie.poster_path}` : null),
      );
    } catch (error: any) {
      throw new TMDBServerError(error.message, 'ServerError');
    }
  }
}

export default GetNowPlayingMoviesUseCase;
