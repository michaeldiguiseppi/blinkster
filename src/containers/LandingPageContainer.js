import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carsActions from '../actions/cars';
import LandingPage from '../components/landingPage/LandingPage';

function mapStateToProps(state) {
    let cars = state.cars || [];

    return {
        cars: cars,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        carsActions: bindActionCreators(carsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);