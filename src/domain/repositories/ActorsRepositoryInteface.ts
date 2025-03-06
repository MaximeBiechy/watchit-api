interface ActorsRepositoryInterface {
  getMoviesByActor(actorId: string, language: string): Promise<any>;
}

export default ActorsRepositoryInterface;
