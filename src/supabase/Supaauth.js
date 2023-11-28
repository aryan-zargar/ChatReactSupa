import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://aqglflqlpmblvuhxmrgj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZ2xmbHFscG1ibHZ1aHhtcmdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTA5ODQzMCwiZXhwIjoyMDE2Njc0NDMwfQ.1h_-lLd9gKsNI77xVEDhLJTB4L0tvkVthJxQfsVbL8c')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
    <div className='w-25' style={{"marginTop":"5REM"}}>
        <h1> Auth </h1>
        <Auth  supabaseClient={supabase} appearance={{theme:ThemeSupa}} providers={[]} />
    </div>
    )
  }
  else {
    return (<div>Logged in!</div>)
  }
}