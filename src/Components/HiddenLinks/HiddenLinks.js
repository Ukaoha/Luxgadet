import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Redux/Slice/authSlice";

const ShowOnLogin= ({children}) => {

    const isLoggedin = useSelector(selectIsLoggedIn);

    if(isLoggedin) {
        return children 
    }
    return null 
}

export const ShowOnLogOut= ({children}) => {

    const isLoggedin = useSelector(selectIsLoggedIn);

    if(!isLoggedin) {
        return children 
    }
    return null 
}


export default  ShowOnLogin; 
