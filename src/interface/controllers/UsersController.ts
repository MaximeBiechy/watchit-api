import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import {
  AddToWatchlistUseCase,
  GetAllUsersUseCase,
  MarkAsSeenUseCase,
  RateMediaUseCase,
  RemoveFromWatchlistUseCase,
  RemoveMediaRatingUseCase,
  RemoveSeenMediaUseCase,
  UpdateRatingMediaUseCase,
  GetUserSettingsUseCase,
} from '../../application/use-cases/index.js';
import { UserDTO } from '../../domain/dtos/index.js';

class UsersController {
  constructor(@inject(TYPES.GetAllUsersUseCase) private getAllUsersUseCase: GetAllUsersUseCase, @inject(TYPES.AddToWatchlistUseCase) private addToWatchlistUseCase: AddToWatchlistUseCase,
              @inject(TYPES.RemoveFromWatchlistUseCase) private removeFromWatchlistUseCase: RemoveFromWatchlistUseCase,
              @inject(TYPES.MarkAsSeenUseCase) private markAsSeenUseCase: MarkAsSeenUseCase,
              @inject(TYPES.RemoveSeenMediaUseCase) private removeSeenMediaUseCase: RemoveSeenMediaUseCase,
              @inject(TYPES.RateMediaUseCase) private rateMediaUseCase: RateMediaUseCase,
              @inject(TYPES.UpdateRatingMediaUseCase) private updateRatingMediaUseCase: UpdateRatingMediaUseCase,
              @inject(TYPES.RemoveMediaRatingUseCase) private removeMediaRatingUseCase: RemoveMediaRatingUseCase,
              @inject(TYPES.GetUserSettingsUseCase) private getUserSettingsUseCase: GetUserSettingsUseCase) {
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users: UserDTO[] = await this.getAllUsersUseCase.execute();
      return res.status(200).json({
        status: 'success',
        message: 'Users fetched successfully',
        users,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async getUserSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userSettings = await this.getUserSettingsUseCase.execute(userId);
      return res.status(200).json({
        status: 'success',
        message: 'User settings fetched successfully',
        userSettings,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async addToWatchlist(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId } = req.params;
      const { mediaType } = req.body;
      console.log(userId, mediaId, mediaType);
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
      const { userId, mediaId } = req.params;
      const { mediaType } = req.body;
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
      const { userId, mediaId } = req.params;
      const { mediaType } = req.body;
      await this.markAsSeenUseCase.execute(userId, mediaId, mediaType);
      res.status(200).json({
        status: 'success',
        message: 'Marked as seen successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }

  async removeSeenMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId } = req.params;
      const { mediaType } = req.body;
      await this.removeSeenMediaUseCase.execute(userId, mediaId, mediaType);
      res.status(200).json({
        status: 'success',
        message: 'Removed from seen list successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }

  async rateMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId } = req.params;
      const { mediaType, rating } = req.body;
      await this.rateMediaUseCase.execute(userId, mediaId, mediaType, rating);
      res.status(200).json({
        status: 'success',
        message: 'Rated media successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateRatingMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId } = req.params;
      const { mediaType, rating } = req.body;
      await this.updateRatingMediaUseCase.execute(userId, mediaId, mediaType, rating);
      res.status(200).json({
        status: 'success',
        message: 'Updated rating successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }

  async removeMediaRating(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, mediaId } = req.params;
      const { mediaType } = req.body;
      await this.removeMediaRatingUseCase.execute(userId, mediaId, mediaType);
      res.status(200).json({
        status: 'success',
        message: 'Removed media rating successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default UsersController;
