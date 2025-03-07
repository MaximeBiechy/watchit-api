class ActorDTO {
  id: number;
  mediaType: string = 'actor';
  name: string;
  profilePath: string | null;

  constructor(
    id: number,
    mediaType: 'actor' = 'actor',
    name: string,
    profilePath: string | null,
  ) {
    this.id = id;
    this.mediaType = mediaType;
    this.name = name;
    this.profilePath = profilePath;
  }
}

export default ActorDTO;
