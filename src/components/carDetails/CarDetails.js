import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carsActions from '../../actions/cars';
import './css/CarDetails.css';

export class CarDetails extends Component {
    constructor(props) {
        super(props);

        this._fetchCar = this._fetchCar.bind(this);
        this._renderCar = this._renderCar.bind(this);
    }

    componentDidMount() {
        this._fetchCar();
    }

    _fetchCar() {
        let { carsActions, match: { params } } = this.props;
        return carsActions.fetchCar(params.year, params.make, params.model);
    }

    _renderCar() {
        let { car } = this.props.cars;
        return (
            <div>   
            { car && Object.keys(car).length !== 0 ? 
            <div>
                <div className="vehicle-img mx-auto d-block">
                    <img src={`${car.image_url}`} className="img-fluid rounded" alt={`${car.year} ${car.make} ${car.model}`} />
                </div>
                <div className="vehicle-info">
                    <div className="card">
                        <h3 className="card-header text-center">{ `${car.year} ${car.make} ${car.model}` }</h3>
                        <div className="card-body">
                            <ul className="no-list-style">
                                <li className="veh-info">Year: { car.year }</li>
                                <li className="veh-info">Make: { car.make }</li>
                                <li className="veh-info">Model: { car.model }</li>
                                <li className="veh-info">Mileage: { car.mileage }</li>
                                <li className="veh-info">Drivetrain: { car.drivetrain ? car.drivetrain : "N/A" }</li>
                                <li className="vehicle-body-style veh-info">Body Style: { car.bodytype }</li>
                                <li className="veh-info">Posted: { `${moment(car.created_at).format("MMMM Do, YYYY")}` }</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
            : 
            <div className="jumbotron text-center">Car not found</div>}
            </div>
        )
    }

    render() {
        return (
            <div>
                { this._renderCar() }
            </div>
        );
    }
}

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