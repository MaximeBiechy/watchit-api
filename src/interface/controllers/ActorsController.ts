import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import { GetMoviesByActorUseCase } from '../../application/use-cases/index.js';
import { NextFunction, Request, Response } from 'express';
import { MovieSearchDTO } from '../../domain/dtos/index.js';

class ActorsController {
  constructor(@inject(TYPES.GetMoviesByActorUseCase) private getMoviesByActorUseCase: GetMoviesByActorUseCase) {
  }

  async getMoviesByActor(req: Request, res: Response, next: NextFunction) {
    try {
      const actorId = req.params.actorId;
      const language = req.query.language as string;
      const movies: MovieSearchDTO[] = await this.getMoviesByActorUseCase.execute(actorId, language);

      return res.status(200).json({
        status: 'success',
        message: 'Movies retrieved successfully',
        movies,
      });
    } catch (error: any) {
      next(error);
    }
  }
}


export default ActorsController;
