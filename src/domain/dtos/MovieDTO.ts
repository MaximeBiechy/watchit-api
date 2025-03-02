import Actor from '../entities/Actor';

class MovieDTO {
  id: number;
  title: string;
  genres: string[];
  duration: number;
  overview: string;
  posterPath: string | null;
  director: string;
  releaseDate: Date;
  actors: Actor[];
  streamingProviders: string[];

  constructor(
    id: number,
    title: string,
    genres: string[],
    duration: number,
    overview: string,
    posterPath: string | null,
    director: string,
    releaseDate: Date,
    actors: Actor[],
    streamingProviders: string[],
  ) {
    this.id = id;
    this.title = title;
    this.genres = genres;
    this.duration = duration;
    this.overview = overview;
    this.posterPath = posterPath;
    this.director = director;
    this.releaseDate = releaseDate;
    this.actors = actors;
    this.streamingProviders = streamingProviders;
  }
}

export default MovieDTO;
