import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';
import { userModel, User } from "../../models/userModel";
import { Request } from "express";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const user = getUserByEmailIdAndPassword(email, password, req);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
);


/*
FIX ME (types) 😭
*/
passport.serializeUser(function (
  user: Express.User, 
  done: (err: any, id?: number) => void
) {
  done(null, user.id);
});

/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (
  id: number, 
  done: (err: any, user?: Express.User | false | null) => void
  ) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
