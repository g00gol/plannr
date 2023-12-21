import React, { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import { UserContext } from "./UserContext";
import { createUserData, getUserData  } from "../api/user";

export const AuthContext = React.createContext<firebase.User>(null!);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] = useState<firebase.User>(null!);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const { setUserData } = useContext(UserContext);

  const auth = getAuth();
  useEffect(() => {
    let myListener = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);      
      setLoadingUser(false);
    });
    return () => {
      if (myListener) myListener();
    };
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        try {
          const userData = await getUserData();
          setUserData(userData);
        } catch(error: any) {
          console.log(error)
          throw error;
        }
      }
    }
    const load = async () => {
      try {
        await loadUserData();
      } catch (error: any) {
        console.log(error)
        if(error.status === 404 || error.status === 403) {
          try {
            await createUserData();
            await loadUserData();
            return;
          } catch (error: any) {
            // console.log('Error creating first user data')
            console.log(error);
            return;
          }
        } 
        console.log(error.message);
        return;
      }
    }
    load();
  }, [currentUser]);

  if (loadingUser) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
