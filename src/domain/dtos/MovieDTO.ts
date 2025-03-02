class MovieDTO {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  director: string;
  releaseDate: Date;

  constructor(id: number, title: string, overview: string, posterPath: string, director: string, releaseDate: Date) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.posterPath = posterPath;
    this.director = director;
    this.releaseDate = releaseDate;
  }
}

export default MovieDTO;
