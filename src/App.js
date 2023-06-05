import './App.css';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from './firebase';
import { useState } from 'react';


function App() {

  const [user, setUser] = useState(null)

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const SIGN_IN_WITH_GOOGLE = () => {

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const user = result.user;
    console.log("user >>>", user)
    setUser(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    alert(errorCode)
  });

  }

  return (
    <div className="main">
      <div className='App'>
      <input type={"email"} placeholder="please enter your email"/>
      <input type={"password"} placeholder="please enter password"/>

      <button>Sign in</button>
      <p>or</p>

      <button onClick={SIGN_IN_WITH_GOOGLE} className='google' >
        Sign in with Google
         <FcGoogle size={22} className='icon'/>
       </button>

       {
          user && <div className='profile' >
            <h1>{user.displayName}</h1>
            <img src={user.photoURL} alt="user" />
          </div>
       }
      </div>
    </div>
  );
}

export default App;
