import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

export default class CompareForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onBlurUrl1 = this.onBlurUrl1.bind(this);
        this.onBlurUrl2 = this.onBlurUrl2.bind(this);
    }
    checkUrl(url) {
        const urlRegex = /^((http[s]?):\/)?\/?www\.lazada\.vn\/[\-\w\.]+$/;
        return urlRegex.test(url);
    }
    handleChange() {
        const { onChangeUrl } = this.props;
        onChangeUrl();
    }
    onBlurUrl1(e) {
        const url = e.target.value;
        const { validateInputUrl1, fetchURL } = this.props;
        if ((url !== "") && (this.checkUrl(url))) {
            fetchURL(1, url);
            validateInputUrl1("pass");
        }
        if (url === "") {
            validateInputUrl1("Need an url to compare");
        }
        if ((url !== "") && (!this.checkUrl(url))) {
            validateInputUrl1("Invalid url");
        }
    }
    onBlurUrl2(e) {
        const url = e.target.value;
        const { validateInputUrl2, fetchURL } = this.props;
        if ((url !== "") && (this.checkUrl(url))) {
            fetchURL(2, url);
            validateInputUrl2("pass");
        }
        if (url === "") {
            validateInputUrl2("Need an url to compare");
        }
        if ((url !== "") && (!this.checkUrl(url))) {
            validateInputUrl2("Invalid url");
        }
    }
    onSubmitForm(e) {
        e.preventDefault();
        const   { onSubmit } = this.props;
        onSubmit();
        this.url_1.value="";
        this.url_2.value="";
    }
    render() {
        const { validateUrl1, validateUrl2, isDisable, className1, className2 } = this.props;
        return (
            <div className="compare-form">
                <form onSubmit={this.onSubmitForm}>
                    <div className="row">
                        <div className="col col-6">
                            <input
                                className={"input-text " + className1}
                                onBlur={this.onBlurUrl1}
                                onChange={this.handleChange}
                                placeholder="Input an url"
                                type="text"
                                ref={(el) => { this.url_1 = el; }} />
                            <div className={"validate-message " + className1}>{validateUrl1}</div>
                        </div>
                        <div className="col col-6">
                            <input
                                className={"input-text " + className2}
                                onBlur={this.onBlurUrl2}
                                onChange={this.handleChange}
                                placeholder="Input an url"
                                type="text"
                                ref={(el) => { this.url_2 = el; }} />
                            <div className={"validate-message " + className2}>{validateUrl2}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 align-center">
                            <button disabled={isDisable}  className="button-default" type="submit">Compare</button>
                        </div>
                    </div>
                </form>
             </div>
        );
    }
}
CompareForm.propTypes = {
    onChangeUrl: PropTypes.func,
    onSubmit: PropTypes.func,
    fetchURL: PropTypes.func,
    validateInputUrl1: PropTypes.func,
    validateInputUrl2: PropTypes.func,
    validateUrl1: PropTypes.string,
    validateUrl2: PropTypes.string,
    isDisable: PropTypes.bool
};
