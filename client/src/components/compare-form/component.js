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
        if (typeof onChangeUrl==='function') {
            onChangeUrl();
        }
    }

    onSubmitForm(e) {
        e.preventDefault();
        let     url_1 = this.url_1,
                url_2 = this.url_2;
        const   isValid_Url_1 = this.checkUrl(url_1.value),
                isValid_Url_2 = this.checkUrl(url_2.value);
        const   { fetchURL, onSubmit } = this.props; 
        if ((url_1.value === "") &&  !isValid_Url_1) {
            url_1.classList.add("has-error");  
        }
        if ((url_2.value === "") &&  !isValid_Url_2) {
            url_2.classList.add("has-error");  
        }                
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
