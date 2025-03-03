class HomePageMovieDTO {
  public id: number;
  public title: string;
  public posterPath: string | null;

  constructor(id: number, title: string, posterPath: string | null) {
    this.id = id;
    this.title = title;
    this.posterPath = posterPath;
  }
}

export default HomePageMovieDTO;
