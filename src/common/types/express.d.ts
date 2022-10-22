declare namespace Express {
  export interface Request {
    user?: {
      _id?: Types.ObjectId;
      username: string;
      password: string;
      followers?: Types.ObjectId[];
      likedAudios?: Types.ObjectId[];
      createdAudios?: Types.ObjectId[];
      profile?: Types.ObjectId;
      playlist?: Types.ObjectId[];
      role?: string;
      history?: Types.ObjectId[];
    };
  }
}
