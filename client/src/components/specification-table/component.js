import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import {
    getProductsData,
    getSpecificationTable
} from '../../actions/index';
import './styles.less';

export default class SpecificationTable extends Component {
    renderHeader() {
        const { htmls } = this.props;
        const productsData = getProductsData(htmls);
        let colData = productsData.map((product, index) => {
            return (
                <th key={index}>
                    <img className="product-img" src={product.imgSrc} alt=""/>
                    <div className="product-info">
                        <p>{product.productName}</p>
                        <p>
                            <strong>{product.specialPrice}{product.currency}</strong>
                            <span className="origin-price">{product.originPrice}</span>
                            <span className="saving-percent">{product.saveingPercent}</span>
                        </p>
                        <div>{ReactHtmlParser(product.rating)}</div>
                    </div>
                </th>
            );
        })
        return (
            <tr>
                <th><h1>Compare</h1></th>
                {colData}
            </tr>
        );
    }
    renderBody() {
        const { htmls } = this.props;
        const rowsInfo = getSpecificationTable(htmls);
        let rows = rowsInfo.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.label}</td>
                    <td>{row.value_1}</td>
                    <td>{row.value_2}</td>
                </tr>
            );
        })
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
    render() {
        return (
            <div className="specification-table-container">
                <table className="specification-table">
                    <thead>{this.renderHeader()}</thead>
                    {this.renderBody()}
                </table>
            </div>
        );
    }
}
SpecificationTable.propTypes = {
    htmls: PropTypes.array
};

