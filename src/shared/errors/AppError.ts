class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly error: any;

  constructor(message: string, statusCode = 400, error?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export default AppError;
