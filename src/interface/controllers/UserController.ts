import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import {
  AddToWatchlistUseCase,
  RemoveFromWatchlistUseCase,
  MarkAsSeenUseCase,
} from '../../application/use-cases/index.js';

class UserController {
  constructor(@inject(TYPES.AddToWatchlistUseCase) private addToWatchlistUseCase: AddToWatchlistUseCase,
              @inject(TYPES.RemoveFromWatchlistUseCase) private removeFromWatchlistUseCase: RemoveFromWatchlistUseCase,
              @inject(TYPES.MarkAsSeenUseCase) private markAsSeenUseCase: MarkAsSeenUseCase) {
  }

  async addToWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId, mediaType } = req.body;
      await this.addToWatchlistUseCase.execute(userId, mediaId, mediaType);
      res.status(201).json({
        status: 'success',
        message: 'Added to watchlist successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }

  async removeFromWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId, mediaType } = req.body;
      await this.removeFromWatchlistUseCase.execute(userId, mediaId, mediaType);
      res.status(200).json({
        status: 'success',
        message: 'Removed from watchlist successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }

  async markAsSeen(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId, mediaType } = req.body;
      await this.markAsSeenUseCase.execute(userId, mediaId, mediaType);
      res.status(200).json({
        status: 'success',
        message: 'Marked as seen successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default UserController;
