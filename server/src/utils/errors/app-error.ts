class AppError extends Error {
  public statusCode: number;
  public explanation: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.explanation = message;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
