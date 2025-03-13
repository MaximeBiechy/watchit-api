import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { MoviesRepositoryInterface } from '../../../domain/repositories/index.js';
import { TMDBServerError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class GetMovieTrailerUseCase {
  constructor(@inject(TYPES.MoviesRepository) private moviesRepository: MoviesRepositoryInterface) {
  }

  async execute(movieId: string, language: string = 'fr-FR'): Promise<any> {
    if (!movieId) {
      throw new ValidationError('movieId is required', 'MovieIdRequired');
    }

    try {
      const trailer = await this.moviesRepository.getMovieTrailer(movieId, language);
      if (!trailer) {
        throw new ValidationError('Trailer not found', 'TrailerNotFound');
      }
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    } catch (error: any) {
      throw new TMDBServerError(error.message, 'ServerError');
    }
  }
}

export default GetMovieTrailerUseCase;
