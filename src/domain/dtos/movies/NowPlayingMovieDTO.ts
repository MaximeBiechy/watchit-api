class NowPlayingMovieDTO {
  public id: number;
  public posterPath: string | null;

  constructor(id: number, posterPath: string | null) {
    this.id = id;
    this.posterPath = posterPath;
  }
}

export default NowPlayingMovieDTO;
