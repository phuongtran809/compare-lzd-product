import Main from './component';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { app } = state;
    return {
        isShowTable: app.isShowTable
    };
}
export default connect(mapStateToProps)(Main);