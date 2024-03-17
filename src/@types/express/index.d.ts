// UMA SOBRESCRITA DO REQUEST DO EXPRESS
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    }
  }
}