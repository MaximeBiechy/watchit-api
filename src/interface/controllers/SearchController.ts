import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import { SearchMoviesAndActorsUseCase } from '../../application/use-cases/index.js';

class SearchController {
  constructor(@inject(TYPES.SearchMoviesAndActorsUseCase) private searchMoviesAndActorsUseCase: SearchMoviesAndActorsUseCase) {
  }

  async search(req: any, res: any, next: any) {
    try {
      const query = req.query.query as string;
      const language = req.query.language as string;
      const include_adult = req.query.include_adult as boolean;
      const page = parseInt(req.query.page as string) || 1;

      const results = await this.searchMoviesAndActorsUseCase.execute(query, language, include_adult, page);

      return res.status(200).json({
        status: 'success',
        message: 'Search results retrieved successfully',
        results,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default SearchController;
