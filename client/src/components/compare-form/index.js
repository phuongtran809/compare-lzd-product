import CompareForm from './component';
import { connect } from 'react-redux';
import {
    onChangeUrl,
    validateInputUrl1,
    validateInputUrl2,
    fetchURL,
    onSubmit,
} from '../../actions';

function mapStateToProps(state) {
    const { app } = state;
    return {
        isShowTable: app.isShowTable,
        validateUrl1: app.validateUrl1,
        validateUrl2: app.validateUrl2,
        isDisable: ((app.validateUrl1 === "pass") && (app.validateUrl2 === "pass")) ? false : true,
        className1: ((app.validateUrl1 === "") || (app.validateUrl1 === "pass")) ? "" : "has-error",
        className2: ((app.validateUrl2 === "") || (app.validateUrl2 === "pass")) ? "" : "has-error",

    };
}
const mapDispatchToProps = {
    onChangeUrl,
    validateInputUrl1,
    validateInputUrl2,
    fetchURL,
    onSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(CompareForm);