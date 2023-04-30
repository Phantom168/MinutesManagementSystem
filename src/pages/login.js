import React from 'react';


const Login = (setLoginStatus) => {
    const queryParameters = new URLSearchParams(window.location.search)
    const handleLogin = () => {
        if(queryParameters.get("status") === "True")
            console.log("logged in")
        else
            window.location.replace('http://127.0.0.1:8000/accounts/google/login/')
    }

        return(
            <div className="login-cont">
                <button type="button" class="login-with-google-btn" onClick={handleLogin} >
                    Sign in with Google
                </button>
            </div>
        )


}

export default Login;
