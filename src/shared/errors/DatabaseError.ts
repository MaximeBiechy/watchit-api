export class DatabaseError extends Error {
  public status: number;
  public code: string;

  constructor(message = 'Database error', code = 'DatabaseError') {
    super(message);
    this.name = 'DatabaseError';
    this.status = 500;
    this.code = code;
  }
}
