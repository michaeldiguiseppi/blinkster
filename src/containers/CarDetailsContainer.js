import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carsActions from '../actions/cars';
import CarDetails from '../components/carDetails/CarDetails';

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

export default connect(mapStateToProps, mapDispatchToProps)(CarDetails);