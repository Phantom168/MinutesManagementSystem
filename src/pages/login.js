import React, {Component} from 'react';


class Login extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="login-cont">
                <button type="button" class="login-with-google-btn" >
                    Sign in with Google
                </button>
            </div>
        )
    }
}

export default Login;