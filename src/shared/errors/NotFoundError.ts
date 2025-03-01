export class NotFoundError extends Error {
  public status: number;
  public code: string;

  constructor(message = 'Not found', code = 'NotFoundError') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
    this.code = code;
  }
}
