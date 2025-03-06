import { injectable } from 'inversify';
import { ActorRepositoryInterface } from '../../../domain/repositories/index.js';
import { Promise } from 'mongoose';
import { axiosInstance } from '../../tmdb/axiosInstance.js';

@injectable()
class ActorsRepositoryImpl implements ActorRepositoryInterface {

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
