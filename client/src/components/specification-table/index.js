import SpecificationTable from './component';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    const { app } = state;
    return {
        html: app.html
    };
}

export default connect(mapStateToProps)(SpecificationTable);