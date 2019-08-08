import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from "material-ui/AppBar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ReactTable from 'react-table'
import "./ReactTable.css";
import SearchField from "react-search-field";
import VoiceSearch from "react-instantsearch-dom/dist/es/components/VoiceSearch";
import WhatShouldISearchResult from "./WhatShouldISearchResult";
import Toolbar from "@material-ui/core/Toolbar";
import Login from "./Login";
import Loginscreen1 from "./Loginscreen1";
import ReactDOM from 'react-dom';
import $ from "jquery";


const theme = createMuiTheme({
    overrides: {
        // Name of the component
        MuiListItem: {
            // Name of the rule
            root: {
                // Some CSS
                borderBottom: "3px solid rgb(212, 212, 212)"
            },
        },
    },
});



class WhatShouldI extends Component {
    data = [];
    user_name='';
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClick(event){
        console.log("Eevent "+event);
        var d = {name: event}
        console.log("d->"+d);
        this.data.unshift(d);
        this.setState({state: this.state});
    }

    componentDidUpdate() {
        console.log(document.getElementsByClassName('ais-VoiceSearch-status'));
    }

    componentDidMount() {

        console.log('in mount', this.props.parentContext.state);
        var searchField = document.getElementsByClassName('react-search-field-input');
        for (var j = 0; j < searchField.length; j++) {
            searchField[j].style.height = '10px';
            searchField[j].style.width = '350px';
            searchField[j].style.color = '#0000ff';
        }
        var username = this.props.parentContext.state.username;
        this.user_name = username;
        document.getElementsByTagName('h1')[0].innerText = "Welcome "+username;
        document.getElementById('welcomebar').title = "Welcome "+username;
        var url = "https://cors-anywhere.herokuapp.com/http://ec2-54-204-165-233.compute-1.amazonaws.com:8071/whatshouldi/users/" + username + "/frequency";
        fetch(url,{
            headers: {
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest"
            }
        })
            .then(response => {
                return response.json();
            }).then(result => {
            console.log("Result::"+result);
            var resultData = Object.keys(result);
            console.log("resultData::"+resultData);
            var dataArray = [];

            for(var t=0; t< resultData.length; t++ ){
                var dataObject = {}
                dataObject["name"]=resultData[t];
                dataArray.push(dataObject);
            }
            console.log("dataArray"+JSON.stringify(dataArray))
            this.data = dataArray;
            this.setState({state: this.state});

        });

    }

    logoutFunction(event) {
        console.log(this);
        console.log('in logout', this.props.parentContext.props.parentContext);
        var loginmessage;
        var loginscreen = [];
        loginscreen.push(<Loginscreen1/>);
        loginmessage = ""
        this.props.parentContext.props.parentContext.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage,
            isLogin: true
        })
    }

    render() {

        const columns = [{
            Header: 'What Should I',
            accessor: 'name', // String-based value accessors!
            //show: false
        }]


        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {

                    console.log('It was in this row:', rowInfo.original.name)
                    console.log(this.props.parentContext);
                    var loginmessage;
                    var loginscreen = [];
                    var selectionMessage = 'What Should I ' + rowInfo.original.name;
                    loginscreen.push(<WhatShouldISearchResult parentContext={this} selectionItem={selectionMessage}/>);
                    loginmessage = ""
                    this.props.parentContext.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        //  buttonLabel:"Login",
                        isLogin: true
                    })
                }
            }
        }


        return (

            <div>
                <MuiThemeProvider>
                    <div>

                        <AppBar position="static" title="Welcome" id="welcomebar">
                            <Toolbar>
                                <button><img src="logout.PNG" onClick={(event) => this.logoutFunction(event)} height={20} width={20}/>
                                </button>
                            </Toolbar>
                        </AppBar>

                        <br/>
                        <br/>

                        <ReactTable
                            data={this.data}
                            columns={columns}
                            defaultPageSize={20}
                            className="-striped -highlight"
                            showPagination={false}
                            getTrProps={onRowClick}
                            style={{
                                height: "250px" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        />

                        <br/>


                        <br/>

                        <SearchField id='searchFieldVoice'
                                     placeholder="Search..."
                                     searchText={this.state.searchData}
                                     classname="ais-SearchBox-input"
                                     onSearchClick={(event) => this.handleClick(event)}

                        />

                        <VoiceSearch
                            // Optional parameters
                            searchAsYouSpeak={true}
                            buttonTextComponent={React.Node}
                            statusComponent={React.Node}
                            translations={{
                                buttonTitle: 'Voice Search',
                                disabledButtonTitle: 'Voice Search Disabled',
                            }}


                        />
                        <br/>

                    </div>

                </MuiThemeProvider>
            </div>
        );


    }

}


export default WhatShouldI;
