import React, { Component } from 'react';
import Car from '../car/Car';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carsActions from '../../actions/cars';
import SearchInput, {createFilter} from 'react-search-input'
require('./css/LandingPage.css');

const KEYS_TO_FILTER = ['make', 'model', 'year', 'drivetrain']

export class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            sortDirection: 'asc',
            sortBy: 'index'
        }

        

        this._fetchCars = this._fetchCars.bind(this);
        this._renderLoading = this._renderLoading.bind(this);
        this._setupCarsData = this._setupCarsData.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this)
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        this._fetchCars();
    }

    _fetchCars() {
        let { carsActions } = this.props;
        return carsActions.fetchCars();
    }

    _setupCarsData(filteredCars) {
        if (filteredCars) {
            return filteredCars.map((car, index) => {
                return (
                    <Car 
                        car={ car } 
                        key={ index }
                        index={ index }
                    />
                )
            });
        }
    }

    _renderLoading() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Please wait, Loading...</h1>
            </div>
        )
    }

    searchUpdated(term) {
        this.setState({
            searchTerm: term
        });
    }

    sortBy(col, direction) {
        let sortBy = col;
        let sortDirection = direction;
        let { cars } = this.props.cars;
        if (sortBy === this.state.sortBy) {
            sortDirection = this.state.sortDirection === 'ASC' ? 'DESC' : 'ASC';
        } else {
            sortDirection = 'DESC';
        }
        cars.sort((a, b) => {
            let sortVal = 0;
            if (a[sortBy] > b[sortBy]) {
                sortVal = 1;
            }
            if (a[sortBy] < b[sortBy]) {
                sortVal = -1;
            }

            if (sortDirection === 'DESC') {
                sortVal = sortVal *= -1;
            }
            return sortVal;
        });

        this.setState({ sortBy, sortDirection });
    }

    render() {
        let { cars } = this.props;
        let filteredCars;
        if (cars && cars.cars && cars.cars.length) {
            filteredCars = cars.cars.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER));
        }
        
        return (
            <div>
                <SearchInput className="search-input form-control" onChange={this.searchUpdated} placeholder="Search by year, make, model, or drivetrain..." />
                { cars.isLoading ? this._renderLoading() : 
                    <div className="table-responsive">
                        <table className="table table-hover overflow">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col" onClick={() => this.sortBy('year', this.state.sortDirection)}>Year { this.state.sortBy === 'year' ? this.state.sortDirection === 'DESC' ? "↓" : "↑" : null}</th>
                                    <th scope="col" onClick={() => this.sortBy('make', this.state.sortDirection)}>Make { this.state.sortBy === 'make' ? this.state.sortDirection === 'DESC' ? "↓" : "↑" : null}</th>
                                    <th scope="col" onClick={() => this.sortBy('model', this.state.sortDirection)}>Model { this.state.sortBy === 'model' ? this.state.sortDirection === 'DESC' ? "↓" : "↑" : null}</th>
                                    <th scope="col" onClick={() => this.sortBy('mileage', this.state.sortDirection)}>Mileage { this.state.sortBy === 'mileage' ? this.state.sortDirection === 'DESC' ? "↓" : "↑" : null}</th>
                                    <th scope="col" onClick={() => this.sortBy('drivetrain', this.state.sortDirection)}>Drivetrain { this.state.sortBy === 'drivetrain' ? this.state.sortDirection === 'DESC' ? "↓" : "↑" : null}</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                { this._setupCarsData(filteredCars) }
                            </tbody>
                        </table>
                    </div>
                    }
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);