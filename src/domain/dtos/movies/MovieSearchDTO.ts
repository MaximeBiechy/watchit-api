class MovieSearchDTO {
  id: number;
  title: string;
  releaseDate: Date;
  voteAverage: number;
  posterPath: string | null;
  self: string;

  constructor(
    id: number,
    title: string,
    releaseDate: Date,
    voteAverage: number,
    posterPath: string | null,
    self: string,
  ) {
    this.id = id;
    this.title = title;
    this.releaseDate = releaseDate;
    this.voteAverage = voteAverage;
    this.posterPath = posterPath;
    this.self = detailsLink;
  }
}

export default MovieSearchDTO;
