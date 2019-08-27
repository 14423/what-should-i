import React, {Component} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import WhatShouldI from "./WhatShouldI";
import AdSense from 'react-adsense';
import ReactTable from "react-table";
import $ from "jquery";
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class WhatShouldISearchResult extends Component {
    tags = [];
    data = [];
    tagsMap = [];
    dataMap = [];

    user_name = '';
    search_key = '';
    constructor(props) {
        super(props);
        this.state = {};

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDelete(i) {
        var filteredItems = this.tags.filter(item => item.text!==this.tags[i].text);
        this.tags = filteredItems;

        this.data = []
        var resultsTemp = [];
        var resultsArray = [];

        for(var i=0;i<this.tags.length;i++) {
            var key = this.tags[i].text;
            var tagsList = this.tagsMap[key];
            for (var j = 0; j < tagsList.length; j++) {
                if (!resultsTemp.includes(tagsList[j])) {
                    resultsTemp.push(tagsList[j]);
                    var dataObject = {};
                    dataObject["name"] = tagsList[j];
                    resultsArray.push(dataObject);
                }
            }
        }

        this.data = resultsArray;

        this.setState({state: this.state});
    }

    handleAddition(tag) {
        this.tags.push(tag);
        this.setState({state: this.state});
    }

    handleClick(tag) {
        var tag = this.tags[tag].text;

        var resultsArray = [];
        for (var t = 0; t < this.tagsMap[tag].length; t++) {
            var resultsObject = {}
            resultsObject["name"] = this.tagsMap[tag][t];
            resultsArray.push(resultsObject);
        }
        this.data = resultsArray;

        var tagsArray = [];
        var tagsObject = {};
        tagsObject["id"] = tag;
        tagsObject["text"] = tag;
        tagsArray.push(tagsObject);
        this.tags = tagsArray;
        this.setState({state: this.state});

    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: newTags});
    }


    componentDidMount() {
        var ul = document.getElementById("searchResult");
        var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            // do something with items[i], which is a <li> element
            console.log(items[i]);
        }
        console.log('in select' + this.props.selectionItem)

        var action = this.props.selectionItem.split(" ")
        this.search_key = action[action.length - 1];
        this.user_name = this.props.parentContext.user_name;
        var url = 'https://cors-anywhere.herokuapp.com/http://ec2-54-204-165-233.compute-1.amazonaws.com:8071/whatshouldi/results/' + this.user_name + '/' + this.search_key;

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            var tagsTemp = Object.keys(data);
            var resultsTemp = [];
            for(var key in data) {
                var list = data[key];
                for(var i=0;i<list.length;i++) {
                    if(!resultsTemp.includes(list[i])) {
                        resultsTemp.push(list[i]);
                      }
                }
            }
            this.tagsMap = data;
            var resultsArray = [];
            var tagsArray = [];

            for (var t = 0; t < tagsTemp.length; t++) {
                var tagsObject = {};
                tagsObject["id"] = tagsTemp[t];
                tagsObject["text"] = tagsTemp[t];
                tagsArray.push(tagsObject);
            }

            for (var t = 0; t < resultsTemp.length; t++) {
                var dataObject = {};
                dataObject["name"] = resultsTemp[t]
                resultsArray.push(dataObject);
            }

            this.data = resultsArray;
            this.tags = tagsArray;

            this.setState({state: this.state});
        });
    }

    navigateBack(event) {
        console.log(this.props.parentContext);
        console.log(this.props.parentContext.props.parentContext.props.parentContext)
        var loginmessage;
        var loginscreen = [];
        loginscreen.push(<WhatShouldI parentContext={this.props.parentContext.props.parentContext}/>);
        loginmessage = ""
        this.props.parentContext.props.parentContext.props.parentContext.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage,
            //  buttonLabel:"Login",
            isLogin: true
        })
    }


    render() {
        const divBoxStyle = {
            "background-color": 'lightgrey',
            "font-size": '20px'
        }
        const {suggestions} = this.state;
        const searchResult = this.props.selectionItem;
        const ulStyle = {
            position: 'relative',
            "list-style": 'none',
            "display": "inline-block",
            padding: ".25rem .75rem",
            "margin": "2px",
            "border-radius": "3px"

        }

        const columns = [{
            Header: this.props.selectionItem,
            accessor: 'name', // String-based value accessors!
            //show: false
        }]
        const tableStyle = {
            border: "none",
            boxShadow: "none",
            "line-height": "3.5"
        };

        return (

            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title={this.props.selectionItem}/>
                    </div>

                    <ReactTags

                        inline={true}
                        placeholder=""
                        tags={this.tags}
                        autofocus={false}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        delimiters={delimiters}
                        handleTagClick={this.handleClick}/>
                    <div id="searchResult">
                        <ReactTable id="searchResults"
                            style={tableStyle}
                            showHeader={false}
                            data={this.data}
                            columns={columns}
                            defaultPageSize={20}
                            className="-striped -highlight"
                            showPagination={false}
                            getTheadGroupProps ={() => { return { style: { display: "none" } }; }}
                           // getTrProps={onRowClick}
                            style={{
                                height: "350px" // This will force the table body to overflow and scroll, since there is not enough room

                            }}
                        />
                    </div>

                    <div align="left">

                        <img src="back.PNG" onClick={(event) => this.navigateBack(event)} height={40} width={40}/>

                    </div>
                    <AdSense.Google
                        client='ca-pub-7292810486004926'
                        slot='7806394673'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                        layoutKey='-gw-1+2a-9x+5c'
                    />
                </MuiThemeProvider>



            </div>
        );

    }


}

export default WhatShouldISearchResult;