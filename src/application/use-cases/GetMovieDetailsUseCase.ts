import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import MovieRepositoryInterface from '../../domain/repositories/MovieRepositoryInterface.js';
import MovieDTO from '../../domain/dtos/MovieDTO.js';
import { ValidationError } from '../../shared/errors/index.js';

@injectable()
class GetMovieDetailsUseCase {
  constructor(@inject(TYPES.MovieRepository) private movieRepository: MovieRepositoryInterface) {}

  async execute(movieId: string): Promise<MovieDTO> {
    if (!movieId) {
      throw new ValidationError('Invalid movieId', 'InvalidMovieId');
    }

    try {
      const movie = await this.movieRepository.getMovieDetails(movieId);
      return new MovieDTO(movie.id, movie.title, movie.overview, movie.posterPath, movie.director, movie.releaseDate);
    } catch (error: any) {
      throw new ValidationError(error.message, error.name);
    }
  }
}

export default GetMovieDetailsUseCase;
