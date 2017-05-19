import CompareForm from './component';
import { connect } from 'react-redux';
import { fetchURL, onSubmit, onChangeUrl } from '../../actions';

function mapStateToProps(state) {
    const { app } = state;
    return {
        html: app.html,
        isShowTable: app.isShowTable
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchURL: function (url) {
            dispatch(fetchURL(url));
        },
        onSubmit: function () {
            dispatch(onSubmit());
        },
        onChangeUrl: function () {
            dispatch(onChangeUrl());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareForm);