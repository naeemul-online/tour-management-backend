import { generateToken } from './jwt';
import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";

export const createUserTokens = (user: Partial<IUser>)=> {
     //   implementing jwt token for the login user
      const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
    
      // create access token
      const accessToken = generateToken(
        jwtPayload,
        envVars.JWT_ACCESS_SECRET,
        envVars.JWT_ACCESS_EXPIRES
      );
    
      // creating refresh token
      const refreshToken = generateToken(
        jwtPayload,
        envVars.JWT_REFRESH_SECRET,
        envVars.JWT_REFRESH_EXPIRES
      );

      return {
        accessToken, refreshToken
      }

}