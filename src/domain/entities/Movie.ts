class Movie {
  constructor(
    public readonly id: number,
    public title: string,
    public overview: string,
    public posterPath: string,
    public director: string,
    public releaseDate: Date,
  ) {}
}

export default Movie;
