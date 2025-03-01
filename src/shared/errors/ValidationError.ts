export class ValidationError extends Error {
  public status: number;
  public code: string;

  constructor(message = 'Validation error', code = 'ValidationError') {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.code = code;
  }
}
