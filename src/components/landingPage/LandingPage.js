import React, { Component } from 'react';
import Car from '../car/Car';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this._fetchCars = this._fetchCars.bind(this);
        this._renderLoading = this._renderLoading.bind(this);
        this._setupCarsData = this._setupCarsData.bind(this);
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

    render() {
        let { cars } = this.props;
        return (
            <div>
            { cars.isLoading ? this._renderLoading() : null }
            <table className="table table-hover">
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
            {/* <ul>{ this._setupCarsData() }</ul> */}
            {/* <ul>{ cars && cars.cars.length > 0 ? this._setupCarsData() : null}</ul> */}
            </div>
        )
    }
}