import { supabase } from "../config/supabase";
import { Todo } from "../models/Todo";
import { ITodoRepository } from "./interfaces/ITodoRepository";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export class TodoRepository implements ITodoRepository {
  private getAuthClient(token: string) {
    return createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_KEY || "", 
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
  }

  async create(
    todo: Omit<Todo, "id">,
    userId: string,
    token: string
  ): Promise<Todo> {
    console.log("Criando todo com userId:", userId);
    console.log("Token:", token ? "Presente" : "Ausente");
    console.log("Tipo do userId:", typeof userId);
    console.log("Valor do userId:", userId);

    const supabaseAuth = this.getAuthClient(token);

    const todoWithUserId = {
      ...todo,
      user_id: userId,
    };

    const { data, error } = await supabaseAuth
      .from("todos")
      .insert([todoWithUserId])
      .select()
      .single();

    if (error) {
      console.error("Error creating To-do:", error);
      throw new Error(`Error creating To-do: ${error.message}`);
    }

    return data as Todo;
  }

  async findAll(userId: string, token: string): Promise<Todo[]> {
    const supabaseAuth = this.getAuthClient(token);

    const { data, error } = await supabaseAuth
      .from("todos")
      .select("*")
      .eq("is_deleted", false)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching To-dos:", error);
      throw new Error(`Error fetching To-dos: ${error.message}`);
    }

    return data || [];
  }

  async findById(
    id: number,
    userId: string,
    token: string
  ): Promise<Todo | null> {
    const supabaseAuth = this.getAuthClient(token);

    const { data, error } = await supabaseAuth
      .from("todos")
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching To-do by ID:", error);
      throw new Error(`Error fetching To-do by ID: ${error.message}`);
    }

    return data;
  }

  async delete(id: number, userId: string, token: string): Promise<void> {
    const supabaseAuth = this.getAuthClient(token);

    const { error } = await supabaseAuth
      .from("todos")
      .update({ is_deleted: true, deleted_at: new Date() })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting To-do:", error);
      throw new Error(`Error deleting To-do: ${error.message}`);
    }
  }

  async update(
    id: number,
    todo: Partial<Todo>,
    userId: string,
    token: string
  ): Promise<Todo | null> {
    const supabaseAuth = this.getAuthClient(token);

    const updateData = {
      ...todo,
      updated_at: new Date(),
    };

    const { data, error } = await supabaseAuth
      .from("todos")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating To-do:", error);
      throw new Error(`Error updating To-do: ${error.message}`);
    }

    return data;
  }

  async countTasksByUserId(userId: string, token: string): Promise<number> {
    const supabaseAuth = this.getAuthClient(token);

    const { count, error } = await supabaseAuth
      .from("todos")
      .select("*", { count: "exact", head: true })
      .eq("is_deleted", false)
      .eq("user_id", userId);

    if (error) {
      console.error("Error counting tasks:", error);
      throw new Error(`Error counting tasks: ${error.message}`);
    }

    return count || 0;
  }
}
