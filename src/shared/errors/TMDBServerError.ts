export class TMDBServerError extends Error {
  public status: number;
  public code: string;

  constructor(message = 'Server error', code = 'ServerError') {
    super(message);
    this.name = 'ServerError';
    this.status = 500;
    this.code = code;
  }
}
