import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { registerSchema, loginSchema } from "../validations/authValidations";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const validationResult = registerSchema.safeParse({ email, password });
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: validationResult.error.errors,
        });
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
          return res.status(409).json({
            error:
              "This email is already registered. Please log in or use another email.",
            code: "USER_ALREADY_EXISTS",
          });
        }
        return res.status(400).json({ error: signUpError.message });
      }

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        return res.status(401).json({ error: signInError.message });
      }

      return res.status(201).json({
        message: "Registration successful",
        user: signInData.user,
        session: signInData.session,
      });
    } catch (error) {
      console.error("Error in register:", error);
      return res.status(500).json({ error: "Failed to register user" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const validationResult = loginSchema.safeParse({ email, password });
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: validationResult.error.errors,
        });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ error: error.message });
      }

      return res.json({
        message: "Login successful",
        user: data.user,
        session: data.session,
      });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ error: "Failed to login" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error in logout:", error);
      return res.status(500).json({ error: "Failed to logout" });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      return res.json({ user: req.user });
    } catch (error) {
      console.error("Error in getUser:", error);
      return res.status(500).json({ error: "Failed to get user data" });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ success: false, error: "Email is required" });
      }

      const redirectTo = `${process.env.FRONTEND_URL}/auth/reset-password`;

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        console.error("Supabase error:", error.message);
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.json({
        success: true,
        message: "If the email exists, a reset link was sent.",
      });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to process request" });
    }
  }

  async getSession(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        return res.status(401).json({ error: 'Invalid session' });
      }

      return res.json({ session });
    } catch (error) {
      console.error("Error getting session:", error);
      return res.status(500).json({ error: "Failed to get session" });
    }
  }
}
