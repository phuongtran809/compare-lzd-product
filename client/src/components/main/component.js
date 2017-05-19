import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompareForm from '../compare-form';
import SpecificationTable from '../specification-table';
import './styles.less';

export default class Main extends Component {
    render() {
        const { isShowTable } = this.props;
        return (
            <div id="main">
                <CompareForm/>
                {isShowTable ?
                    <div className="compare-block">
                        <SpecificationTable/>
                    </div> : ""}
            </div>
        );
    }
}
Main.propTypes = {
    isShowTable: PropTypes.bool
};
