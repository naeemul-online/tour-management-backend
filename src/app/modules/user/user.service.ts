import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IAuthProviders, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  // checked user duplication
  // const isUserExists = await User.findOne({ email });

  // if (isUserExists) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  // }

  // hashing password
  const hashPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  // checking auth provider
  const authProvider: IAuthProviders = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashPassword,
    auth: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async (query: Record<string, string>) => {
   const queryBuilder = new QueryBuilder(User.find(), query);
  
    const users = await queryBuilder
      .search(userSearchableFields)
      .filter()
      .sort()
      .fields()
      .paginate();
  
    const [data, meta] = await Promise.all([
      users.build(),
      queryBuilder.getMeta(),
    ]);
  
    return { data, meta };
  // const users = await User.find({});
  // const totalUsers = await User.countDocuments();
  // return {
  //   data: users,
  //   meta: {
  //     total: totalUsers,
  //   },
  // };
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

// update user
/* 
Think: 
1. email - can not update,
2. name, phone, password, address
3. password = rehashing
4. only admin, super admin , role, isDeleted
todo:
1. create update user function and take parameter (userId, payload, decodedToken)

*/

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  /**
   * email - can not update
   * name, phone, password address
   * password - re hashing
   *  only admin superadmin - role, isDeleted...
   *
   * promoting to superadmin - superadmin
   */

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
