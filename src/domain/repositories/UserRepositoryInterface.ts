interface UserRepositoryInterface {
  addToWatchList(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;
  removeFromWatchList(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;
  markAsSeen(userId: string, mediaId: string, type: 'movie' | 'tv', rating?: number): Promise<void>;
}

export default UserRepositoryInterface;
