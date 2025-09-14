import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config()

const supabase = createClient(process.env.DB_URL_SUPERBASE,process.env.DB_PUBLIC_KEY)
export default supabase

