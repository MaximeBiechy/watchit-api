class HomePageMovieDTO {
  public id: number;
  public title: string;
  public posterPath: string | null;
  public self: string;

  constructor(id: number, title: string, posterPath: string | null, self: string) {
    this.id = id;
    this.title = title;
    this.posterPath = posterPath;
    this.self = self;
  }
}

export default HomePageMovieDTO;
