import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import { userModel } from '../../models/userModel';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: '',
        clientSecret: '',
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME √ */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        try {
            let user = userModel.findByGithubId(profile.id);
        
            if (user) {
              // Existing GitHub user found, proceed to log them in
              done(null, user);
            } else {
              // No user found, create a new user with data from GitHub profile
              user = userModel.createFromGithub(profile);
              done(null, user);
            }
          } catch (error) {
            if (error instanceof Error) {
                done(error);
            } else {
                done(new Error('An unknown error occurred'));
            }
        }
    }
);


const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;

