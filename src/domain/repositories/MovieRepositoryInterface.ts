interface MovieRepositoryInterface {
  getMovieDetails(movieId: string): Promise<any>;

  getMovieCredits(movieId: string): Promise<any>;

  getMovieVideos(movieId: string): Promise<any>;

  getMovieWatchProviders(movieId: string): Promise<any>;

  getNowPlayingMovies(region: string, language: string): Promise<any>;
}

export default MovieRepositoryInterface;
