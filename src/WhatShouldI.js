import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from "material-ui/AppBar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ReactTable from 'react-table'
import "./ReactTable.css";
import SearchField from "react-search-field";
import VoiceSearch from "react-instantsearch-dom/dist/es/components/VoiceSearch";
import WhatShouldISearchResult from "./WhatShouldISearchResult";
import Loginscreen1 from "./Loginscreen1";
import Login from "./Login";

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


    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

        var searchField = document.getElementsByClassName('react-search-field-input');
        for (var j = 0; j < searchField.length; j++) {
            searchField[j].style.height = '10px';
            searchField[j].style.width = '350px';
            searchField[j].style.color = '#0000ff';
        }

    }



    render() {
        const data = [{
            name: 'Eat'

        }, {
            name: 'Read'
        },
            {
                name: 'Shop'
            },
            {
                name: 'Visit'
            },
            {
                name: 'Do'
            }
        ]

        const columns = [{
            Header: 'What Should I',
            accessor: 'name' // String-based value accessors!
        }]


        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {

                    console.log('It was in this row:', rowInfo.original.name)
console.log(this.props.parentContext);
                    var loginmessage;
                    var loginscreen=[];
                    var selectionMessage='What Should I '+rowInfo.original.name;
                    loginscreen.push(<WhatShouldISearchResult parentContext={this} selectionItem={selectionMessage}/>);
                    loginmessage = ""
                    this.props.parentContext.props.parentContext.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        //  buttonLabel:"Login",
                        isLogin:true
                    })
                }
            }
        }


        return (

            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Welcome"
                        />


                        <br/>
                        <br/>
                        <ReactTable
                            data={data}
                            columns={columns}
                            defaultPageSize={5}
                            className="-striped -highlight"
                            showPagination={false}
                            getTrProps={onRowClick}
                        />

                        <br/>
                        <br/>

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
                       <SearchField
                            placeholder="Search..."
                            searchText={this.state.searchData}
                        />



                    </div>

                </MuiThemeProvider>
            </div>
        );
    }


}

export default WhatShouldI;