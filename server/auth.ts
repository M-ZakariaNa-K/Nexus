import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { storage } from './storage';
import type { User } from '@shared/schema';

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'nexus-agency-secret-key';

// JWT expiration time
const JWT_EXPIRES_IN = '24h';

// Create JWT token
export const createToken = (user: User): string => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Verify JWT middleware
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  // Get token from cookies
  const token = req.cookies?.auth_token;
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Authenticate user
export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  try {
    // Find user by username
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return null;
    }
    
    // Compare passwords
    const isPasswordValid = compareSync(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Add user property to Request interface
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
