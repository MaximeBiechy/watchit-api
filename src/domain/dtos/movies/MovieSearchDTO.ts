class MovieSearchDTO {
  id: number;
  title: string;
  duration: number;
  releaseDate: Date;
  genres: string[];
  voteAverage: number;
  posterPath: string | null;

  constructor(
    id: number,
    title: string,
    duration: number,
    releaseDate: Date,
    genres: string[],
    voteAverage: number,
    posterPath: string | null,
  ) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.voteAverage = voteAverage;
    this.posterPath = posterPath;
  }
}

export default MovieSearchDTO;
