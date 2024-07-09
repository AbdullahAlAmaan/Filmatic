import { createContext,useEffect,useState } from "react";
import { auth } from "../Services/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [isLoading,setIsLoading]=useState(true);
   function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(provider)
   }
   function logout(){
    return signOut(auth);
   }
  useEffect(() => {
    onAuthStateChanged(auth,(currentUser)=>{
      if(currentUser){
        setUser(currentUser)
      }
      else{
        setUser(null);
      }
      setIsLoading(false)
    })
  }, [])
  return <AuthContext.Provider value={{user, isLoading, signInWithGoogle, logout}}>
    {children}
  </AuthContext.Provider> 

}