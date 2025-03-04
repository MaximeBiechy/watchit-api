import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { MovieRepositoryInterface } from '../../../domain/repositories/index.js';
import { TMDBServerError, ValidationError } from '../../../shared/errors/index.js';
import { HomePageMovieDTO } from '../../../domain/dtos/index.js';
import { config } from '../../../config/config.js';

@injectable()
class GetPopularMoviesUseCase {
  constructor(@inject(TYPES.MovieRepository) private movieRepository: MovieRepositoryInterface) {}

  async execute(region: string, language: string, page: number = 1): Promise<any> {
    if (!region || !language) {
      throw new ValidationError('Invalid region or language', 'InvalidRegionOrLanguage');
    }

    if (page <= 0) {
      throw new ValidationError('Invalid page', 'InvalidPage');
    }

    try {
      const movies = await this.movieRepository.getTopRatedMovies(region, language, page);

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
