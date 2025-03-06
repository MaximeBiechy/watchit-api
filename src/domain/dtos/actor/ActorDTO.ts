class ActorDTO {
  id: number;
  name: string;
  profilePath: string | null;

  constructor(
    id: number,
    name: string,
    profilePath: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.profilePath = profilePath;
  }
}

export default ActorDTO;
