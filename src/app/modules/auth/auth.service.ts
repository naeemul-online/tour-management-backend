import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

// jwt note: user - login - token(email, id, role, )
// creating logic for authentication
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  // checked user data
  const isUserExists = await User.findOne({ email });

  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email dose not exist");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExists.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password");
  }

  const userTokens = createUserTokens(isUserExists);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExists.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

// creating refresh token logic
const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

// reset password function
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user!.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  user!.save();
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
