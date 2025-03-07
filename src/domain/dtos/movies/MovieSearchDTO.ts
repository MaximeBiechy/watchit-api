class MovieSearchDTO {
  id: number;
  mediaType: string = 'movie';
  title: string;
  releaseDate: Date;
  voteAverage: number;
  posterPath: string | null;
  self: string;

  constructor(
    id: number,
    mediaType: 'movie' = 'movie',
    title: string,
    releaseDate: Date,
    voteAverage: number,
    posterPath: string | null,
    self: string,
  ) {
    this.id = id;
    this.mediaType = mediaType;
    this.title = title;
    this.releaseDate = releaseDate;
    this.voteAverage = voteAverage;
    this.posterPath = posterPath;
    this.self = self;
  }
}

export default MovieSearchDTO;
