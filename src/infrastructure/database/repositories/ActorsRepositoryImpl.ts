import { injectable } from 'inversify';
import { ActorsRepositoryInterface } from '../../../domain/repositories/index.js';
import { Promise } from 'mongoose';
import { axiosInstance } from '../../tmdb/axiosInstance.js';

@injectable()
class ActorsRepositoryImpl implements ActorsRepositoryInterface {

  async getMoviesByActor(actorId: string, language: string): Promise<any> {
    const response: any = await axiosInstance.get(`/person/${actorId}/movie_credits`, {
      params: {
        language,
      },
    });

    return response.data?.cast;
  }
}

export default ActorsRepositoryImpl;
