import React, { createContext, useState } from "react";
import { UserData } from "../dataObjects/UserData";

interface UserContextType {
  userData: UserData;
  setUserData: (user: UserData) => void;
}

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [userData, setUserData] = useState<UserData>(null!);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};