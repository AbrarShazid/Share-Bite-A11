import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { Toaster } from "react-hot-toast";

const AuthProvider = ({ children }) => {

  const provider = new GoogleAuthProvider()
  const [loading, setLoading] = useState(true)

  // email pass register 
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // email pass login 
  const login=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)


  }

  // google log in 
  const signGoogle = () => {
    return signInWithPopup(auth, provider)
  }



  const authInfo = {
    loading,
    createUser,
    login,
    signGoogle


  };
  return <AuthContext value={authInfo}>


    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>

    {children}


  </AuthContext>;
};

export default AuthProvider;
