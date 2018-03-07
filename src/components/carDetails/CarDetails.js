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
        // Get year/make/model from URL since we don't have an ID field in the data
        let { carsActions, match: { params } } = this.props;
        return carsActions.fetchCar(params.year, params.make, params.model);
    }

    _renderCar() {
        let { car } = this.props.cars;
        return (
            <div>   
            {/* Make sure the car object exists, otherwise render 'Car not found' */}
            { car && Object.keys(car).length !== 0 ? 
            <div>
                <div className="vehicle-info">
                    <div className="mx-auto card">
                        <h3 className="card-header text-center">{ `${car.year} ${car.make} ${car.model}` }</h3>
                        <div className="card-body" id="card-overflow-scroll">
                            <div className="w-25">
                                <img className="img-thumbnail float-left match-list-height" src={`${car.image_url}`} alt={`${car.year} ${car.make} ${car.model}`} />
                                
                            </div>
                            <ul className="no-list-style card-text list-group">
                                <li className="veh-info list-group-item">Year: { car.year }</li>
                                <li className="veh-info list-group-item">Make: { car.make }</li>
                                <li className="veh-info list-group-item">Model: { car.model }</li>
                                <li className="veh-info list-group-item">Mileage: { car.mileage.toLocaleString() }</li>
                                {/* Catch if missing drivetrain/bodytype */}
                                <li className="veh-info list-group-item">Drivetrain: { car.drivetrain ? car.drivetrain : "N/A" }</li>
                                <li className="vehicle-body-style veh-info list-group-item">Body Style: { car.bodytype ? car.bodytype : "N/A" }</li>
                            </ul>
                        </div>
                        <div className="clear-both mx-auto">
                            <span>Posted: { `${moment(car.created_at).format("MMMM Do, YYYY")}` }</span>
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