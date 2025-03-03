import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
// UseCases
import {
  GetMovieDetailsUseCase,
  GetNowPlayingMoviesUseCase,
  GetUpcomingMoviesUseCase,
  GetPopularMoviesUseCase,
} from '../../application/use-cases/index.js';
// DTOs
import { MovieDTO, HomePageMovieDTO } from '../../domain/dtos/index.js';

class MovieController {
  constructor(
    @inject(TYPES.GetMovieDetailsUseCase) private getMovieDetailsUseCase: GetMovieDetailsUseCase,
    @inject(TYPES.GetNowPlayingMoviesUseCase) private getNowPlayingMoviesUseCase: GetNowPlayingMoviesUseCase,
    @inject(TYPES.GetUpcomingMoviesUseCase) private getUpcomingMoviesUseCase: GetUpcomingMoviesUseCase,
    @inject(TYPES.GetPopularMoviesUseCase) private getPopularMoviesUseCase: GetPopularMoviesUseCase,
  ) {}

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

  async getNowPlayingMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const region = req.query.region as string;
      const language = req.query.language as string;

      const movies: HomePageMovieDTO[] = await this.getNowPlayingMoviesUseCase.execute(region, language);

      return res.status(200).json({
        status: 'success',
        message: 'Now Playing Movies retrieved successfully',
        movies,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getUpcomingMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const region = req.query.region as string;
      const language = req.query.language as string;

      const movies: HomePageMovieDTO[] = await this.getUpcomingMoviesUseCase.execute(region, language);

      return res.status(200).json({
        status: 'success',
        message: 'Upcoming Movies retrieved successfully',
        movies,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getPopularMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const region = req.query.region as string;
      const language = req.query.language as string;

      const movies: HomePageMovieDTO[] = await this.getPopularMoviesUseCase.execute(region, language);

      return res.status(200).json({
        status: 'success',
        message: 'Popular Movies retrieved successfully',
        movies,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default MovieController;
