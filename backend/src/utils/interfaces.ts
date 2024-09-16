export class CustomError extends Error {
  name: string;
  message: string;
  status?: number;

  constructor(status = 500, msg: any) {
    super();
    this.name = 'CustomError';
    this.message = msg;
    this.status = status;
  }
}