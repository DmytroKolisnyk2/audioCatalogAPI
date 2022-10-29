import { ExtractJwt, Strategy } from 'passport-jwt';
import type { IPayload } from '@types';
import { userModel, profileModel } from '@models';
import { UserRepository } from '../../../repositories/user.repository';

export default new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload: IPayload, done) => {
    const User = new UserRepository(userModel, profileModel);
    try {
      const userProfile = await User.getById(payload._id);
      if (!userProfile) {
        return done(null, false);
      }
      done(null, userProfile);
    } catch (error) {
      done(error);
    }
  },
);
