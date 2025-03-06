import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { ActorsRepositoryInterface } from '../../../domain/repositories/index.js';
import { TMDBServerError, ValidationError } from '../../../shared/errors/index.js';
import { MovieSearchDTO } from '../../../domain/dtos/index.js';
import { config } from '../../../config/config.js';

@injectable()
class GetMoviesByActorUseCase {
  constructor(@inject(TYPES.ActorsRepository) private actorsRepository: ActorsRepositoryInterface) {
  }

  async execute(actorId: string, language: string = 'fr-FR'): Promise<MovieSearchDTO[]> {
    if (!actorId) {
      throw new ValidationError('Actor ID is required', 'ValidationError');
    }

    try {
      const movies = await this.actorsRepository.getMoviesByActor(actorId, language);

      return movies.map(
        (movie: any) =>
          new MovieSearchDTO(
            movie.id,
            movie.title,
            movie.release_date,
            movie.vote_average,
            movie.poster_path ? `${config.TMDB.IMAGE_BASE_URL}${movie.poster_path}` : null,
            `/movies/${movie.id}`,
          ),
      );
    } catch (error: any) {
      throw new TMDBServerError(error.message, 'ServerError');
    }
  }
}

export default GetMoviesByActorUseCase;
