import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { UserData } from "../types/interfaces/UserData";

// Define the shape of the user data

// Define the context value shape
interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

// Create the context with proper typing
export const UserContext = createContext<UserContextType | null>(null);

export default function UserDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = Cookies.get("isSignedIn");

    if (token) {
      setUserData({
        email: localStorage.getItem("email") || "",
        fullName: localStorage.getItem("fullName") || "",
        id: localStorage.getItem("id") || "",
        imageUrl: localStorage.getItem("imageUrl") || "",
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
