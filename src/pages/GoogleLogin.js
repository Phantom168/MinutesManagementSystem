import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, NavLink, Navigate } from "react-router-dom";
import '../style.css';




const GoogleLogin = (props) => {

    const queryParameters = new URLSearchParams(window.location.search);
    const tokenReceived = queryParameters.get("token")

    const [token, setToken] = useState()

    useEffect(() => {
        props.setLoginStatus(true);
        setToken(tokenReceived);
        console.log(tokenReceived);

    }, [tokenReceived])

    return (
        <>
            {token && <Navigate to="/" />}

        </>
    );




}


export default GoogleLogin;
