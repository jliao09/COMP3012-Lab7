import { NextFunction, Request, Response } from "express";
import { User } from '../models/userModel';
/*
FIX ME (types) √
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const user = req.user as User;
    if (user && user.sessionID !== req.sessionID) {
      user.sessionID = req.sessionID;
    }
    return next();
  }
  res.redirect('/auth/login');
};

/*
FIX ME (types) √
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}


