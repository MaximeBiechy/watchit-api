import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { MoviesRepositoryInterface } from '../../../domain/repositories/index.js';
import { ActorDTO, MovieSearchDTO } from '../../../domain/dtos/index.js';
import { config } from '../../../config/config.js';
import { TMDBServerError } from '../../../shared/errors/index.js';

@injectable()
class SearchMoviesAndActorsUseCase {
  constructor(@inject(TYPES.MoviesRepository) private moviesRepository: MoviesRepositoryInterface) {
  }

  async execute(query: string, language: string = 'fr-FR', include_adult: boolean = true, page: number = 1): Promise<(MovieSearchDTO | ActorDTO)[]> {
    if (!query.trim()) {
      return [];
    }

    try {
      const searchResults = await this.moviesRepository.search(query, language, include_adult, page);

      return searchResults.map((result: any) => {
        if (result.media_type === 'movie') {
          return new MovieSearchDTO(
            result.id,
            result.title,
            result.release_date,
            result.vote_average,
            result.poster_path ? `${config.TMDB.IMAGE_BASE_URL}${result.poster_path}` : null,
            `/movies/${result.id}`,
          );
        } else if (result.media_type === 'person') {
          return new ActorDTO(
            result.id,
            result.name,
            result.profile_path ? `${config.TMDB.IMAGE_BASE_URL}${result.profile_path}` : null,
          );
        }
      }).filter(Boolean);
    } catch (error: any) {
      throw new TMDBServerError(error.message, 'ServerError');
    }
  }
}

export default SearchMoviesAndActorsUseCase;
