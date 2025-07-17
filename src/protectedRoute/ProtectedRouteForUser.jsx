/* eslint-disable react/prop-types */
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router"

export const ProtectedRouteForUser = ({children}) => {
  const auth = getAuth();
    const user = auth.currentUser;
   
    // const user = JSON.parse(localStorage.getItem('users'))
    // if (user?.role === "user") {
     if (user !== "" && user !== null) {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}