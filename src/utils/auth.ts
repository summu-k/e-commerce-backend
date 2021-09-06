import jwt from 'jsonwebtoken';
import { userProps } from '../utils/interface';
import { Request, Response, NextFunction } from 'express';

const signToken = (user: userProps) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    },
    'supersecret',
    {
      expiresIn: '1d',
    }
  );
};

const isAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decode: any) => {
        if (err) {
          res.status(401).send({ message: 'Token is not valid' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};
const isAdmin = async (
  req: { user: { isAdmin: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: string }): void; new (): any };
    };
  },
  next: () => void
) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'User is not admin' });
  }
};

export { signToken, isAuth, isAdmin };
