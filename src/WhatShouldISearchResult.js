import React, {Component} from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Login from "./Login";
import WhatShouldI from "./WhatShouldI";

class WhatShouldISearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

        console.log('in select'+this.props.selectionItem)

    }

    navigateBack(event) {
        console.log(this.props.parentContext);
        console.log(this.props.parentContext.props.parentContext.props.parentContext)
        var loginmessage;
        var loginscreen=[];
        loginscreen.push(<WhatShouldI parentContext={this.props.parentContext.props.parentContext}/>);
        loginmessage = ""
        this.props.parentContext.props.parentContext.props.parentContext.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage,
            //  buttonLabel:"Login",
            isLogin:true
        })
    }


    render() {
        const searchResult=this.props.selectionItem;
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title={this.props.selectionItem}/>
                    </div>
                    <ul>
                        <li><a href="#">Buffalo Wild Wings</a>/>
                        </li>
                        <li><a href="#">Yard House</a> />
                        </li>
                    </ul>

                    <div align="left">
                        <button
                            className="button icon-left"
                            onClick={(event) => this.navigateBack(event)}>
                            Back
                        </button>
                    </div>
                </MuiThemeProvider>
            </div>
        );

    }


}

export  default WhatShouldISearchResult;