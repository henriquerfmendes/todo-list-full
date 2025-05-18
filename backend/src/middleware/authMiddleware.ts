import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const validateToken = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  if (!/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)) {
    return null;
  }
  return token;
};

const handleTokenRefresh = async (token: string): Promise<{ user: User; newToken: string } | null> => {
  try {
    const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError || !refreshData.session) {
      return null;
    }
    return {
      user: {
        id: refreshData.user?.id || '',
        email: refreshData.user?.email
      },
      newToken: refreshData.session.access_token
    };
  } catch {
    return null;
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = validateToken(req.headers.authorization);
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: No valid token provided' });
      return;
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      if (error.message.includes('expired')) {
        const refreshResult = await handleTokenRefresh(token);
        if (!refreshResult) {
          res.status(401).json({
            error: "Your session has expired. Please log in again to continue.",
            code: "TOKEN_EXPIRED",
            requiresLogin: true,
          });
          return;
        }
        req.user = refreshResult.user;
        res.setHeader('X-New-Token', refreshResult.newToken);
        next();
        return;
      }
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
      return;
    }

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: User not found' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email
    };
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

export const getAuthInfo = (req: Request) => {
  const userId = req.user?.id as string;
  const token = req.headers.authorization?.split(' ')[1] as string;

  return { userId, token };
};