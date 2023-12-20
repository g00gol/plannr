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
        const userData = await getUserData();
        setUserData(userData);
      }
    }
    const load = async () => {
      try {
        loadUserData();
      } catch (error: any) {
        if(error.status.code === 404) {
          await createUserData();
          loadUserData();
          return;
        } 
        console.log(error.message);
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
