import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gwaukpfiarxnrgyoahaj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3YXVrcGZpYXJ4bnJneW9haGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2OTU5OTcsImV4cCI6MjAxMjI3MTk5N30.3fnX6nSNdsjXsbfcF6eynCAGDck2fB1-Ct3HDpiVCSg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
