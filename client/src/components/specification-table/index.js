import SpecificationTable from './component';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { app } = state;
    return {
        htmls: app.htmls
    };
}
export default connect(mapStateToProps)(SpecificationTable);