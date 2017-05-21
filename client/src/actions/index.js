import cheerio from 'cheerio';
import {
    REQUEST_URL,
    RECEIVE_URL,
    FAILURE_URL,
    ON_CHANGE_URL,
    VALIDATE_URL1,
    VALIDATE_URL2,
    ON_SUBMIT
} from '../constants';

function requestURL() {
    return {
        type: REQUEST_URL
    };
}
function receiveURL(id, content) {
    return {
        type: RECEIVE_URL,
        content,
        id
    };
}
function failureURL(error) {
    return {
        type: FAILURE_URL,
        error
    };
}
export function fetchURL(id, url) {
    return (dispatch) => {
        dispatch(requestURL());
        fetch(`/api?url=${encodeURI(url)}`)
            .then(response => response.text())
            .then(function(html) {
                dispatch(receiveURL(id, html));
            })
            .catch((err) => {
                dispatch(failureURL(err));
            })
    };
}
export function getProductsData(htmls) {
    let productData = htmls.map((item, index) => {
        const $ = cheerio.load(item.content),
            $imgSrc = $('meta[property="og:image"]').attr('content'),
            $productName = $("#prod_title").text().trim().split('-')[0],
            $specialPrice = $("#special_price_box").text(),
            $currency = $("#special_currency_box").text(),
            $originPrice = $("#price_box").text(),
            $saveingPercent = $("#product_saving_percentage").text(),
            $rating = $(".prod_header_reviews .rating");
        const datas = {
            imgSrc: $imgSrc,
            productName: $productName,
            specialPrice: $specialPrice,
            currency: $currency,
            originPrice: $originPrice,
            saveingPercent: $saveingPercent,
            rating: $rating
        }
        return datas;
    });
    return productData;
}
export function getSpecificationTable(htmls) {
    let tableDatas = htmls.map((item, index) => {
        let datas= {};
        const $ = cheerio.load(item.content);
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
    return rowsInfo;
}
export function onChangeUrl() {
    return {
        type: ON_CHANGE_URL
    };
}
export function validateInputUrl1(validateUrl1) {
    return {
        type: VALIDATE_URL1,
        validateUrl1
    };
}
export function validateInputUrl2(validateUrl2) {
    return {
        type: VALIDATE_URL2,
        validateUrl2
    };
}

export function onSubmit() {
    return {
        type: ON_SUBMIT
    };
}

