import type { Database as DB } from '@/lib/database.types'

declare global {
    type Database = DB;
    type Vault = DB['public']['Tables']['passwords']['Row'];
}
