import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase.config";


export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
     const [reload, setReload]=useState(false)
     const [user, setUser]= useState(null);
     const [loading,setLoading] = useState(true);
     // const axiosPublic = AxiosPublic();

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
     const logout = async () => {
          setLoading(true);
          setUser(null)
          await signOut(auth)
     };
     
     

     useEffect( () => {
     const unsubscribe = onAuthStateChanged(auth,currentUser => {
               
               if (currentUser) {
                    setUser(currentUser);
                    // console.log(currentUser);
                    
                    
                    }
               setLoading(false);
               // if(currentUser){
               //      // // get token and store clint 
               //      const userInfo = { email: currentUser.email};
               //      axiosPublic.post('/jwt', userInfo )
               //      .then( res => {
               //           if(res.data.token){
               //                localStorage.setItem('access-token', res.data.token);
                         
               //           }
               //      })
                    
               // }
               // else{
               //      // do something
               //      localStorage.removeItem("access-token")
                    
               // }
          
               
          });
          return () => {
               return unsubscribe()
          }
     },[reload,user])
     const authInfo = {
          user,
          loading,
          creatUser,
          googleLogin,
          signIn,
          upDateUser,
          logout,
          setReload
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