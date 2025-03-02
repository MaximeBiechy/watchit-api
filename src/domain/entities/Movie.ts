import Actor from './Actor';

class Movie {
  constructor(
    public readonly id: number,
    public title: string,
    public genres: string[],
    public duration: number,
    public overview: string,
    public posterPath: string | null,
    public director: string,
    public releaseDate: Date,
    public trailer: string | null,
    public actors: Actor[],
    public streamingProviders: string[],
  ) {}
}

export default Movie;
