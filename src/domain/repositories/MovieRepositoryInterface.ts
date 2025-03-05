interface MovieRepositoryInterface {
  getMovieDetails(movieId: string, language: string): Promise<any>;

  getMovieCredits(movieId: string, language: string): Promise<any>;

  getMovieVideos(movieId: string, language: string): Promise<any>;

  getMovieWatchProviders(movieId: string): Promise<any>;

  getNowPlayingMovies(region: string, language: string, page: number): Promise<any>;

  getUpcomingMovies(region: string, language: string, page: number): Promise<any>;

  getPopularMovies(region: string, language: string, page: number): Promise<any>;

  getTopRatedMovies(region: string, language: string, page: number): Promise<any>;
}

export default MovieRepositoryInterface;
