import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import WhatShouldI from './WhatShouldI';
import Register from "./Register";
import $ from "jquery";


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            isloggedOn:false
        }
    }

    handleClick(event){

console.log(this.props.parentContext);
        this.props.parentContext.state.isLogin=true;
        this.props.parentContext.setState(state => ({
           isLogin:true
        }));

        let body = {
            "userName" : this.state.username,
            "password" : this.state.password
        }

        $.ajax({
            type: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/http://ec2-54-204-165-233.compute-1.amazonaws.com:8071/whatshouldi/login',
            data: JSON.stringify(body),
            contentType: 'application/json',
            // header: {'Access-Control-Allow-Origin':'*',
            //  'Access-Control-Allow-Methods':'GER,PUT,POST,DELETE', 
            //  'Access-Control-Allow-Headers':'Content-Type'},
            success:function(data){
                if(data === true){
                    var loginmessage;
                    var loginscreen=[];
                    loginscreen.push(<WhatShouldI parentContext={this}/>);
                    loginmessage = ""
                    this.props.parentContext.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        isLogin:true
                    })
                }
            }.bind(this),
            error:function(){
                console.log("error");
                this.setState({emailError:'email doesn\'t exist',
                    passwordError:'incorrect password'});
            }.bind(this)
        });

    }

    handleRegisterClick(event){
        // console.log("event",event);
        var loginmessage;
        if(this.props.parentContext.state.isLogin){
            var loginscreen=[];
            loginscreen.push(<WhatShouldI parentContext={this}/>);
            loginmessage = "";
            this.props.parentContext.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Login",
                isLogin:true
            })
        }
        else{
            var loginscreen=[];
            loginscreen.push(<Register parentContext={this}/>);
            loginmessage = "Not Registered yet.Go to registration";
            this.props.parentContext.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Register",
                isLogin:false
            })
        }
    }

    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                        //    hintText="Enter your Username"
                            hintText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                         //   hintText="Enter your Password"
                            hintText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>

                <div>
                    {this.props.parentContext.state.loginmessage}
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={this.props.parentContext.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleRegisterClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>

        );


    }

    componentWillMount() {
        if(this.state.isloggedOn===true)
        {
            console.log('logged in');
        }
    }
}



const style = {
    margin: 15,
};



export default Login;