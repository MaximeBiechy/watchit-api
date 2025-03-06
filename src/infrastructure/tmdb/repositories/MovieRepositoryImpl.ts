import { MovieRepositoryInterface } from '../../../domain/repositories/index.js';
import { injectable } from 'inversify';
import { axiosInstance } from '../axiosInstance.js';
import { Promise } from 'mongoose';

@injectable()
class MovieRepositoryImpl implements MovieRepositoryInterface {
  async getMovieDetails(movieId: string, language: string): Promise<any> {
    const response: any = await axiosInstance.get(`/movie/${movieId}`, {
      params: {
        language,
      },
    });
    return response.data;
  }

  async getMovieCredits(movieId: string, language: string): Promise<any> {
    const response: any = await axiosInstance.get(`/movie/${movieId}/credits`, {
      params: {
        language,
      },
    });
    return response.data;
  }

  async getMovieVideos(movieId: string, language: string): Promise<any> {
    const response: any = await axiosInstance.get(`/movie/${movieId}/videos`, {
      params: {
        language,
      },
    });
    return response.data;
  }

  async getMovieWatchProviders(movieId: string): Promise<any> {
    const response: any = await axiosInstance.get(`/movie/${movieId}/watch/providers`);
    return response.data;
  }

  async getNowPlayingMovies(region: string, language: string, page: number): Promise<any> {
    const response: any = await axiosInstance.get('/movie/now_playing', {
      params: {
        region,
        language,
        page,
      },
    });

    return response.data?.results;
  }

  async getUpcomingMovies(region: string, language: string, page: number): Promise<any> {
    const response: any = await axiosInstance.get('/movie/upcoming', {
      params: {
        language,
        region,
        page,
      },
    });

    return response.data?.results;
  }

  async getPopularMovies(region: string, language: string, page: number): Promise<any> {
    const response: any = await axiosInstance.get('/movie/popular', {
      params: {
        language,
        region,
        page,
      },
    });

    return response.data?.results;
  }

  async getTopRatedMovies(region: string, language: string, page: number): Promise<any> {
    const response: any = await axiosInstance.get('/movie/top_rated', {
      params: {
        language,
        region,
        page,
      },
    });

    return response.data?.results;
  }

  async search(query: string, language: string, include_adult: boolean, page: number): Promise<any> {
    const response: any = await axiosInstance.get('/search/multi', {
      params: {
        query,
        language,
        include_adult,
        page,
      },
    });

    return response.data?.results;
  }

  async getMoviesByActor(actorId: string, language: string): Promise<any> {
    const response: any = await axiosInstance.get(`/person/${actorId}/movie_credits`, {
      params: {
        language,
      },
    });

    return response.data?.cast;
  }
}

export default MovieRepositoryImpl;
