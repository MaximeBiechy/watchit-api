import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { MovieRepositoryInterface } from '../../../domain/repositories/index.js';
import { HomePageMovieDTO } from '../../../domain/dtos/index.js';
import { ValidationError, TMDBServerError } from '../../../shared/errors/index.js';
import { config } from '../../../config/config.js';

@injectable()
class GetUpcomingMoviesUseCase {
  constructor(@inject(TYPES.MovieRepository) private movieRepository: MovieRepositoryInterface) {}

  async execute(region: string, language: string, page: number = 1): Promise<HomePageMovieDTO[]> {
    if (!region || !language) {
      throw new ValidationError('Invalid region or language', 'InvalidRegionOrLanguage');
    }

    try {
      const movies = await this.movieRepository.getUpcomingMovies(region, language, page);

      return movies.map(
        (movie: any) =>
          new HomePageMovieDTO(
            movie.id,
            movie.title,
            movie.poster_path ? `${config.TMDB.IMAGE_BASE_URL}${movie.poster_path}` : null,
          ),
      );
    } catch (error: any) {
      throw new TMDBServerError(error.message, 'ServerError');
    }
  }
}

export default GetUpcomingMoviesUseCase;
