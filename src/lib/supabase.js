import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL="ozeizskxlrdecudqulcu.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96ZWl6c2t4bHJkZWN1ZHF1bGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTM0NTcsImV4cCI6MjA2MzY4OTQ1N30.xZOTFdIo0sOhMpGOCM-fv16io2YjDW-jLkrqCFfnjN4"

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

const { data, error } = await supabase.from('your_table').select('*')
console.log(data) // Handle error if needed
if (error) {
  console.error('Error fetching data:', error)
}