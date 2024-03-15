import {userModel} from "../models/userModel";
import { Request } from "express";

const getUserByEmailIdAndPassword = (email: string, password: string, req: Request): any => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    } else {
      req.flash("error", "Invalid email or password.");
      return null;
    }
  }
  req.flash("error", "Couldn't find user with email: " + email);
  return null;
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
