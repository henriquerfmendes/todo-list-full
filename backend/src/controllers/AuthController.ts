import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
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

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
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
}
