import { BPYP_SUPABASE_URL, BPYP_SUPABASE_ANON_KEY } from '@env';

export const CONFIG = {
  API_URL: "http://localhost:8080",
  SUPABASE_URL: BPYP_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: BPYP_SUPABASE_ANON_KEY as string
} as any;