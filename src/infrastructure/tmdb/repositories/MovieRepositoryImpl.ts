import MovieRepositoryInterface from '../../../domain/repositories/MovieRepositoryInterface.js';
import Movie from '../../../domain/entities/Movie.js';
import { injectable } from 'inversify';
import { axiosInstance } from '../axiosInstance.js';

@injectable()
class MovieRepositoryImpl implements MovieRepositoryInterface {
  async getMovieDetails(movieId: string): Promise<Movie> {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    const movie: any = response.data;
    return new Movie(movie.id, movie.title, movie.overview, movie.poster_path, movie.director, new Date(movie.release_date));
  }
}

export default MovieRepositoryImpl;
