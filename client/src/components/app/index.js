import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Main from '../main';
import './styles.less';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}
