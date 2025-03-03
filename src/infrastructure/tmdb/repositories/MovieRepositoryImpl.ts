import { MovieRepositoryInterface } from '../../../domain/repositories/index.js';
import { injectable } from 'inversify';
import { axiosInstance } from '../axiosInstance.js';

@injectable()
class MovieRepositoryImpl implements MovieRepositoryInterface {
  async getMovieDetails(movieId: string): Promise<any> {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  }

  async getMovieCredits(movieId: string): Promise<any> {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data;
  }

  async getMovieVideos(movieId: string): Promise<any> {
    const response = await axiosInstance.get(`/movie/${movieId}/videos`);
    return response.data;
  }

  async getMovieWatchProviders(movieId: string): Promise<any> {
    const response = await axiosInstance.get(`/movie/${movieId}/watch/providers`);
    return response.data;
  }

  async getNowPlayingMovies(region: string, language: string): Promise<any> {
    const response = await axiosInstance.get('/movie/now_playing', {
      params: {
        region,
        language,
        page: 1,
      },
    });

    // @ts-ignore: Results exist in TMDB
    return response.data?.results;
  }

  async getUpcomingMovies(region: string, language: string): Promise<any> {
    const response = await axiosInstance.get('/movie/upcoming', {
      params: {
        language,
        region,
        page: 1,
      },
    });

    // @ts-ignore: Results exist in TMDB
    return response.data?.results;
  }
}

export default MovieRepositoryImpl;
