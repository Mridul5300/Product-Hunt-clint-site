import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase.config";


export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

     const [user, setUser]= useState(null);
     const [loading,setLoading] = useState(true);

     // email and password
     const creatUser = (email, password) => {
          setLoading(true)
         return  createUserWithEmailAndPassword(auth, email, password)
     };

     // googlelogin
     const  googleLogin = () => {
          setLoading(true)
          return signInWithPopup(auth, googleProvider)
        }

     //    sign in

     const signIn = (email, password) => {
          setLoading(true)
          return signInWithEmailAndPassword(auth, email, password )
     };

     // Update Profile
const upDateUser = (name,image) => {
     return updateProfile(auth.currentUser, {
          displayName: name, photoURL: image
        })     
}

     
     // logout
     const logout = () => {
          setLoading(true);
          setUser(null)
          return  signOut(auth)
     };

     useEffect( () => {
     const unsubscribe = onAuthStateChanged(auth,currentUser => {
               setUser(currentUser);
               // console.log('currrent user', currentUser);
               setLoading(false)
          });
          return () => {
               return unsubscribe()
          }
     },[])
     const authInfo = {
          user,
          loading,
          creatUser,
          googleLogin,
          signIn,
          upDateUser,
          logout
     }
     return (
          <AuthContext.Provider value={authInfo}>
               {children}
          </AuthContext.Provider>
     );
};

AuthProvider.propTypes = {
     children: PropTypes.element
   };

export default AuthProvider;