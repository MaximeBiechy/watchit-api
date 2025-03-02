import Movie from '../entities/Movie';

interface MovieRepositoryInterface {
  getMovieDetails(movieId: string): Promise<Movie>;
}

export default MovieRepositoryInterface;
