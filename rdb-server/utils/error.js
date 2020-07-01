export class BadRequestError extends Error {
  constructor(error) {
    if (error) super(error.message);
    else error = new Error("Bad Request not enough info");
    this.data = { error };
    this.statusCode = 400;
  }
}
