import { createContext, useContext, useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./fireBase";

const authContext = createContext();

export const useAuthContext = () => {
  const value = useContext(authContext);
  return value;
};

const AuthProvider = ({ children }) => {
  const signIn = async ({ email, password }) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      throw Error("Invalid credantails!");
    }
    const doc = docSnap.docs[0];
    const user = doc.data();
    if (user.password !== password) {
      throw Error("Invalid credantails!");
    }
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const signUp = async ({ email, name, password }) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const docSnap = await getDocs(q);
    if (!docSnap.empty) {
      throw Error("User Already Exist!");
    }
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      password: password,
      email: email,
    });
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser("");
  };
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  return (
    <authContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
