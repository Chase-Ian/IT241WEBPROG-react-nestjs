import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize with values from your Vercel/Local environment variables
    this.supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_KEY
    );
  }

  // 1. READ (Get all messages)
  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false }); // Newest first
    if (error) throw error;
    return data;
  }

  // 2. CREATE (Sign the guestbook)
  async create(payload: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([payload])
      .select(); // Returns the created row
    if (error) throw error;
    return data;
  }

  // 3. UPDATE (Edit an entry)
  async update(id: string, payload: { message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .update(payload)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data;
  }

  // 4. DELETE (Remove an entry)
  async delete(id: string) {
    const { error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { deleted: true };
  }
}