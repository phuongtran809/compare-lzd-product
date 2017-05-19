import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

export default class CompareForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    checkUrl(url) {
        const urlRegex = /^((http[s]?):\/)?\/?www\.lazada\.vn\/[\-\w\.]+$/;
        return urlRegex.test(url);
    }

    handleChange() {
        const { onChangeUrl } = this.props;
        // why do you need this check? you already defined propTypes
        if (typeof onChangeUrl==='function') {
            onChangeUrl();
        }
    }

    onSubmitForm(e) {
        e.preventDefault();
        let     url_1 = this.url_1,
                url_2 = this.url_2;
        // read value from dom element is a bad idea
        const   isValid_Url_1 = this.checkUrl(url_1.value),
                isValid_Url_2 = this.checkUrl(url_2.value);
        const   { fetchURL, onSubmit } = this.props;
        // this if doesn't work
        // it should be ||
        if ((url_1.value === "") &&  !isValid_Url_1) {
            // touching DOM elements when you use react is a very-very-very bad idea
            url_1.classList.add("has-error");
        }
        if ((url_2.value === "") &&  !isValid_Url_2) {
            url_2.classList.add("has-error");
        }
        // such style of conditions is difficult to read and error prone
        // consider this example:
        // function onSubmitForm() {
        //     // fails when url is empty or by regexp
        //     const url1err = checkUrl(this.state.url1);
        //     const url2err = checkUrl(this.state.url2);
        //     this.setState({ url1err, url2err });
        //     if (url1err || url2err) {
        //         return;
        //     }
        //     whateverYouWantToDoWithCorrectURLs();
        // }
        // but even this example is bad for react
        // right approach:
        // add listener onBlur for each input and validate there
        // and disable submit button in form if state has errors
        // then you don't need to do any checks here
        if ((url_1.value !== "") && (url_2.value !== "") && isValid_Url_1 && isValid_Url_2) {
            if (typeof fetchURL==='function') {
                fetchURL(url_1.value);
                fetchURL(url_2.value);
            }
            if (typeof onSubmit==='function') {
                onSubmit();
            }
            url_1.classList.remove("has-error");
            url_2.classList.remove("has-error");
        }
    }

    render() {
        return (
            <div className="compare-form">
                <form onSubmit={this.onSubmitForm}>
                    <div className="row">
                        <div className="col col-6">
                            <input
                                className="input-text"
                                onChange={this.handleChange}
                                placeholder="Input an url"
                                type="text"
                                ref={(el) => { this.url_1 = el; }} />
                        </div>
                        <div className="col col-6">
                            <input
                                className="input-text"
                                onChange={this.handleChange}
                                placeholder="Input an url"
                                type="text"
                                ref={(el) => { this.url_2 = el; }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 align-center">
                            <button className="button-default" type="submit">Compare</button>
                        </div>
                    </div>
                </form>
             </div>
        );
    }
}
CompareForm.propTypes = {
    onChangeUrl: PropTypes.func,
    fetchURL: PropTypes.func,
    onSubmit: PropTypes.func,
    isValid_Url_1: PropTypes.bool,
    isValid_Url_2: PropTypes.bool,
    url_1: PropTypes.element,
    url_2: PropTypes.element
};
