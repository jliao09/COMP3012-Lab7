interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  githubId?: string;
  role: 'user' | 'admin';
  sessionID?: string;
}

let nextId = 4;

const database: User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: 'admin',
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: 'user',
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: 'user',
  },
];

const userModel = {

  /* FIX ME (types) √ */
  findOne: (email: string): User | undefined => {
    const user = database.find((user) => user.email === email);
      return user;
  },
  /* FIX ME (types) √ */
  findById: (id: number): User | undefined => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findByGithubId: (githubId: string): User | undefined => {
    return database.find(user => user.githubId === githubId);
  },

  // Create a user with GitHub data
  createFromGithub: (profile: any): User => {
    const newUser: User = {
      id: nextId++,
      name: profile.displayName || profile.username,
      email: profile.emails && profile.emails[0].value,
      githubId: profile.id,
      role: 'user'
    };
    database.push(newUser);
    return newUser;
  },
};

export { database, userModel, User };
