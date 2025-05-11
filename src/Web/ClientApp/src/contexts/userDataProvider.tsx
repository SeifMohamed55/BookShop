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
  const [userData, setUserData] = useState<UserData | null>(() => {
    const token = Cookies.get("isSignedIn");
    if (!token) return null;

    const email = localStorage.getItem("email");
    const fullName = localStorage.getItem("fullName");
    const id = localStorage.getItem("id");
    const imageUrl = localStorage.getItem("imageUrl");

    if (email && fullName && id && imageUrl) {
      return { email, fullName, id, imageUrl };
    }

    return null;
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
