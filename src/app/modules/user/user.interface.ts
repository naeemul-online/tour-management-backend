import { Types } from "mongoose";

export enum Role {
  USER = "USER",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
export interface IAuthProviders {
  provider: "google" | "credentials";
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  age?: number;
  role: Role;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  auth: IAuthProviders[];
  booking?: Types.ObjectId[];
  guide?: Types.ObjectId[];
}
