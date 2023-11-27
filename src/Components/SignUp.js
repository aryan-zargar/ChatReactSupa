import React,{useEffect,useState} from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://aqglflqlpmblvuhxmrgj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZ2xmbHFscG1ibHZ1aHhtcmdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTA5ODQzMCwiZXhwIjoyMDE2Njc0NDMwfQ.1h_-lLd9gKsNI77xVEDhLJTB4L0tvkVthJxQfsVbL8c')
export default function SignUp() {
    async function signUpNewUser(e) {
        const { data, error } = await supabase.auth.signUp({
          email: e.target[0].value,
          password: e.target[1].value,
        })
      }
      const [session, setSession] = useState(null)
  
  useEffect(()=>{
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
  })
  return (
    <div className='d-flex justify-content-center mt-5'>
        <div style={{"display":session?"block":"none"}} >
            <h1 className='m-2'>signup</h1>
        <form className='mt-5' onSubmit={(e)=>{signUpNewUser(e)}} >
          <input placeholder='email' type='email' className='form-control m-2'  />
          <input placeholder='password' type='password' className='form-control m-2' />
          <p className='m-2'>already have a user ? <a href='../../login'>login</a></p>
          <button className='btn btn-success w-100 m-2' type='submit'>signup</button>
        </form>
        </div>
        <div style={{"display":session?"none":"block"}}>
            we have sent you and verification mail 
            if you just signed up now :)
        </div>
    </div>
  )
}
