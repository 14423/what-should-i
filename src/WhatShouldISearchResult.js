import React, {Component} from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import WhatShouldI from "./WhatShouldI";
import AdSense from 'react-adsense';
import ReactTable from "react-table";
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class WhatShouldISearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const {tags} = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({tags: [...state.tags, tag]}));
    }

    handleClick(tag) {
        console.log('in tag click');
        console.log(tag);

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

        if (this.props.selectionItem === 'What Should I Eat') {
            this.setState({
                tags: [
                    {id: "recently visited", text: "recently visited"},
                    {id: "Popular", text: "Popular"},
                    {id: 'Mexican cuisine', text: 'Mexican cuisine'},
                    {id: 'Indian cuisine', text: 'Indian cuisine'},
                    {id: 'Newly opened', text: 'Trending'},
                    {id: 'Occasion', text: 'Costa Rica'},
                    {id: 'Buffet', text: 'Buffet'},

                ],
                suggestions: [
                    {id: 'Mediterranean', text: 'Mediterranean'}
                ]
            });
        } else if (this.props.selectionItem === 'What Should I Read') {
            this.setState({
                tags: [
                    {id: "Technical", text: "Technical"},
                    {id: "Documentary", text: "Documentary"},
                    {id: 'Comics', text: 'Comics'},
                    {id: 'Recently visited', text: 'Recently visited'},
                    {id: 'Health', text: 'Health'},

                ],
                suggestions: [
                    {id: 'Yoga', text: 'Yoga'}
                ]
            });
        }
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
        const {tags, suggestions} = this.state;
        const searchResult = this.props.selectionItem;
        const ulStyle = {
            position: 'relative',
            "list-style": 'none',
            "display": "inline-block",
            padding: ".25rem .75rem",
            "margin": "2px",
            "border-radius": "3px"

        }

        const data = [{
            name: 'Buffalo Wild Wings'

        }, {
            name: 'Yead House'
        }

        ]

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
                        tags={tags}
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
                            data={data}
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