import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import WhatShouldI from './WhatShouldI';
import Register from "./Register";
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

        if(this.props.parentContext.state.isLogin){
            var loginmessage;
            var loginscreen=[];
            loginscreen.push(<WhatShouldI parentContext={this}/>);
            loginmessage = ""
            this.props.parentContext.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
              //  buttonLabel:"Login",
                isLogin:true
            })
        }


        /*var apiBaseUrl = "http://localhost:4000/api/";
        var self = this;
        var payload={
            "email":this.state.username,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+'login', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    console.log("Login successfull");
                    var uploadScreen=[];
                    /!*uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
                    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})*!/
                }
                else if(response.data.code == 204){
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });*/















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
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                         //   hintText="Enter your Password"
                            floatingLabelText="Password"
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