import type { Database as DB } from '@/lib/database.types'

declare global {
    type Database = DB;
    type Password = DB['public']['Tables']['passwords']['Row'];
}
