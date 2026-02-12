import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  async findAll() { return (await this.supabase.from('guestbook').select('*').order('created_at', {ascending: false})).data; }
  async create(dto) { return (await this.supabase.from('guestbook').insert([dto])).data; }
  async update(id, dto) { return (await this.supabase.from('guestbook').update(dto).eq('id', id)).data; }
  async delete(id) { return (await this.supabase.from('guestbook').delete().eq('id', id)).data; }
}