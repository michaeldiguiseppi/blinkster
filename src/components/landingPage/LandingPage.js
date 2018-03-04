import React, { Component } from 'react';
import Car from '../car/Car';

require('./css/LandingPage.css');

export class LandingPage extends Component {
    constructor(props) {
        super(props);
        this._fetchCars = this._fetchCars.bind(this);
        this._renderLoading = this._renderLoading.bind(this);
        this._setupCarsData = this._setupCarsData.bind(this);
        this._showCarDetails = this._showCarDetails.bind(this);
    }

    componentDidMount() {
        this._fetchCars();
    }

    _fetchCars() {
        let { carsActions } = this.props;
        return carsActions.fetchCars();
    }

    _setupCarsData() {
        if (this.props.cars && this.props.cars.cars && this.props.cars.cars.length > 0) {
            return this.props.cars.cars.map((car, index) => {
                return (
                    <Car 
                        car={ car } 
                        key={ index }
                        showCarDetails={ this._showCarDetails }
                    />
                )
            });
        }
    }

    _renderLoading() {
        return (
            <div>Loading...</div>
        )
    }

    _showCarDetails() {
        alert("Hello!");
    }

    render() {
        let { cars } = this.props;
        return (
            <div>
            { cars.isLoading ? this._renderLoading() : null }
                <div className="table-responsive">
                    <table className="table table-hover overflow">
                        <thead>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col">Make</th>
                                <th scope="col">Model</th>
                                <th scope="col">Mileage</th>
                                <th scope="col">Drivetrain</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this._setupCarsData() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default LandingPage;