import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { MoviesRepositoryInterface } from '../../../domain/repositories/index.js';
import { TMDBServerError, ValidationError } from '../../../shared/errors/index.js';
import { HomePageMovieDTO } from '../../../domain/dtos/index.js';
import { config } from '../../../config/config.js';

@injectable()
class GetPopularMoviesUseCase {
  constructor(@inject(TYPES.MoviesRepository) private moviesRepository: MoviesRepositoryInterface) {}

  async execute(region: string = 'FR', language: string = 'fr-FR', page: number = 1): Promise<any> {
    if (page <= 0) {
      throw new ValidationError('Invalid page', 'InvalidPage');
    }

    try {
      const movies = await this.moviesRepository.getTopRatedMovies(region, language, page);

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

export default GetPopularMoviesUseCase;
