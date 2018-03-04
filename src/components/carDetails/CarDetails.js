import React, { Component } from 'react';
import moment from 'moment';
import './css/CarDetails.css';

export default class CarDetails extends Component {
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
        return carsActions.fetchCar(params.index);
    }

    _renderCar() {
        let { car } = this.props.cars;
        return (
            <div>   
            { car ? 
            <div>
                {/* <h1 className="text-center">{`${car.year} ${car.make} ${car.model}`}</h1> */}
                <div className="vehicle-img mx-auto d-block">
                    <img src={`${car.image_url}`} className="img-fluid rounded" alt={`${car.year} ${car.make} ${car.model}`} />
                </div>
                <div className="vehicle-info">
                    <div className="card">
                        <h3 className="card-header text-center">{ `${car.year} ${car.make} ${car.model}` }</h3>
                        <div className="card-body">
                            <ul className="no-list-style">
                                <li>Year: { car.year }</li>
                                <li>Make: { car.make }</li>
                                <li>Model: { car.model }</li>
                                <li>Mileage: { car.mileage }</li>
                                <li>Drivetrain: { car.drivetrain ? car.drivetrain : "N/A" }</li>
                                <li className="vehicle-body-style">Body Style: { car.bodytype }</li>
                                <li>Posted: { `${moment(car.created_at).format("MMMM Do, YYYY")}` }</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
            : 
            <div>Car not found</div>}
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