import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, NavLink, Navigate } from "react-router-dom";
import '../style.css';




const GoogleLogin = (props) => {

    const queryParameters = new URLSearchParams(window.location.search);
    const tokenReceived = queryParameters.get("token")

    useEffect(() => {
        props.setLoginStatus(true);
        props.setToken(tokenReceived);
        console.log(tokenReceived);

    }, [props, tokenReceived])

    return (
        <>
            {tokenReceived && <Navigate to="/" />}

        </>
    );




}


export default GoogleLogin;
