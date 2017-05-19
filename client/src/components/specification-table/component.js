import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cheerio from 'cheerio';
import ReactHtmlParser from 'react-html-parser';
import './styles.less';

export default class SpecificationTable extends Component {
    renderHeader() {
        const   { html } = this.props;
        let   headerInfo = html.map((item, index) => {
            const   $ = cheerio.load(item),
                imgSrc = $('meta[property="og:image"]').attr('content'),
                productName = $("#prod_title").text().trim().split('-')[0],
                specialPrice = $("#special_price_box").text(),
                currency = $("#special_currency_box").text(),
                originPrice = $("#price_box").text(),
                saveingPercent = $("#product_saving_percentage").text(),
                rating = $(".prod_header_reviews .rating");
            return (
                <th key={index}>
                    <img className="product-img" src={imgSrc} alt=""/>
                    <div className="product-info">
                        <p>{productName}</p>
                        <p>
                             <strong>{specialPrice}{currency}</strong>
                             <span className="origin-price">{originPrice}</span>
                             <span className="saving-percent">{saveingPercent}</span>
                        </p>
                        <div>{ReactHtmlParser(rating)}</div>
                    </div>
                </th>
            );
        });
        return (
            <tr>
                <th><h1>Compare</h1></th>
                {headerInfo}
            </tr>
        );
    }
    renderBody() {
        const { html } = this.props;
        let tableDatas = html.map((item, index) => {
            let datas= {};
            const $ = cheerio.load(item);
            $(".specification-table tr").each(function(i, elem) {
                let $label = $(elem).find('td:first-child');
                let $value = $(elem).find('td:last-child');
                datas[$label.text()] = $value.text();
            });
            return datas;
        });
        let rowsInfo = [];
        for(let label in tableDatas[0]) {
            if (tableDatas[0].hasOwnProperty(label)) {
                rowsInfo.push({label, value_1: tableDatas[0][label], value_2: "-"});
            }
        }
        for(let label in tableDatas[1]) {
            if (tableDatas[1].hasOwnProperty(label)) {
                const isExist = rowsInfo.find((row) => row.label === label);
                if (isExist) {
                    isExist.value_2 = tableDatas[1][label];
                } else {
                    rowsInfo.push({label, value_1: "-", value_2: tableDatas[1][label]});
                }
            }
        }
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
    html: PropTypes.array
};

