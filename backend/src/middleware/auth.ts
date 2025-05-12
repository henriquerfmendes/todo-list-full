import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; //supabase usa UID para userId (alfanumérico)
        email?: string;
        role?: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      
      if (error.message.includes('expired')) {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError || !refreshData.session) {
          return res.status(401).json({ 
            error: 'Sua sessão expirou. Por favor, faça login novamente para continuar.',
            code: 'TOKEN_EXPIRED',
            requiresLogin: true  // Flag para o frontend identificar que precisa mostrar tela de login
          });
        }
        
        req.user = {
          id: refreshData.user?.id || '',
          email: refreshData.user?.email || '',
          role: refreshData.user?.role || ''
        };
        
        res.setHeader('X-New-Token', refreshData.session?.access_token || '');
        
        next();
        return;
      }
      
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    req.user = {
      id: user?.id || '',
      email: user?.email || '',
      role: user?.role || ''
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

export const getAuthInfo = (req: Request) => {
  const userId = req.user?.id as string;
  const token = req.headers.authorization?.split(' ')[1] as string;
  
  return { userId, token };
};