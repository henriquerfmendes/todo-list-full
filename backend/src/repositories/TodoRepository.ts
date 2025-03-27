import { Todo } from "../models/Todo";
import { ITodoRepository } from "./interfaces/ITodoRepository";
import { supabase } from "../config/supabase";

export class TodoRepository implements ITodoRepository {
    
  async create(todo: Omit<Todo, "id">): Promise<Todo> {
    const { data, error } = await supabase
      .from("todos")
      .insert([todo])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating TODO: ${error.message}`);
    }

    return data;
  }

  async findAll(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(`Error fetching To-dos: ${error.message}`);
    }

    return data || [];
  }

  async findById(id: number): Promise<Todo | null> {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false)
      .maybeSingle();

    if (error) {
      throw new Error(`Error fetching To-do by ID: ${error.message}`);
    }

    return data;
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq("id", id)
      .eq("is_deleted", false)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating To-do: ${error.message}`);
    }

    return data;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("todos")
      .update({ is_deleted: true, deleted_at: new Date() })
      .eq("id", id);

    if (error) {
      throw new Error(`Error deleting To-do: ${error.message}`);
    }
  }
}
