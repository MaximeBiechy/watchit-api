import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import GetMovieDetailsUseCase from '../../application/use-cases/GetMovieDetailsUseCase.js';
import MovieDTO from '../../domain/dtos/MovieDTO';

class MovieController {
  constructor(@inject(TYPES.GetMovieDetailsUseCase) private getMovieDetailsUseCase: GetMovieDetailsUseCase) {}

  async getMovieDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.id;
      const movie: MovieDTO = await this.getMovieDetailsUseCase.execute(movieId);

      return res.status(200).json({
        status: 'success',
        message: 'Movie details retrieved successfully',
        movie,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default MovieController;
