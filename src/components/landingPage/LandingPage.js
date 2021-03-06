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
        this._setupHeaders = this._setupHeaders.bind(this);
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

    sortBy(method) {
        let { startSortCars } = this.props.carsActions;
        return startSortCars(method);
    }

    _setupHeaders() {
        let headers = ["year", "make", "model", "mileage", "drivetrain", "created_at"];
        return ( 
            <tr>
                { headers.map((header) => {
                    return (
                    <th 
                        className="col-header"
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Click to sort"
                        scope="col" 
                        key={ header } 
                        onClick={() => this.sortBy(header)}>
                            { header === "created_at" ? "Posted" : header } 
                    </th>)
                }) }
            </tr>
    );
    }

    render() {
        let { cars } = this.props;
        let filteredCars;
        if (cars && cars.cars && cars.cars.length) {
            filteredCars = cars.cars.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER));
        }
        
        return (
            <div>
                <SearchInput className="search-input form-control" onChange={this.searchUpdated} placeholder="Year, Make, Model, or Drivetrain..." />
                { cars.isLoading ? this._renderLoading() : 
                    <div className="table-responsive-md">
                        <table className="table table-hover overflow">
                            <thead className="text-center">
                                { this._setupHeaders() }
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