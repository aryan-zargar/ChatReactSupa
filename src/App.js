import logo from './logo.svg';
import './App.css';
import react, { useEffect,useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './Components/SignUp';
const supabase = createClient('https://aqglflqlpmblvuhxmrgj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZ2xmbHFscG1ibHZ1aHhtcmdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTA5ODQzMCwiZXhwIjoyMDE2Njc0NDMwfQ.1h_-lLd9gKsNI77xVEDhLJTB4L0tvkVthJxQfsVbL8c')
function App() {
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
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            <SignUp></SignUp>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
