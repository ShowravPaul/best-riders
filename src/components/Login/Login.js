import firebase from 'firebase';
import React, { useContext, useState } from 'react';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css'

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(true);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }


  const handleBlur = (event) => {
    // event.target.name eita hoilo input ta ki er ekta naam
    // event.target.value eita value ja ami input e likhchi
    let fieldValid = true;
    if (event.target.name === 'email') {
      fieldValid = /\S+@\S+\.\S+/.test(event.target.value); // value ta test korlam mail kina
    }
    if (event.target.name === 'password') {
      fieldValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value); // 6 re beshi char kina ar min ekta digit kina
    }
    if (fieldValid) {
      const newUserInfo = { ...user }; //object copy
      newUserInfo[event.target.name] = event.target.value; //email or password lekha property ta te value ta assign hobe
      setUser(newUserInfo);
    }
  }


  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {//firebase authentication password
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(user.name);
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user }; // add error message to the object as a property
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          const logger = {
            name: res.user.displayName,
            email: res.user.email
          }
          setLoggedInUser(logger);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user }; // add error message to the object as a property
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    event.preventDefault(); // submit korlei page reload hoy default vabe seta off korlam
  }


  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('user name updated successfully')
    }).catch(function (error) {
      console.log(error);
    });
  }
  

  return (
    <div className="form-body">
      <br />
      <div className="login-query">
        <button htmlFor="newUser" type="submit">Already have an account?
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        </button>
      </div>
      <h1> {newUser ? 'Sign up' : 'Sign In'}</h1>

      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name.." required />
        }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} id="" placeholder="password" required />
        <br />
        <input type="submit" value={newUser ? 'Register' : 'Log In'} />
      </form>

      <button type="submit" onClick={handleGoogleSignIn}>Continue with google</button>
    </div>
  );
}

export default Login;