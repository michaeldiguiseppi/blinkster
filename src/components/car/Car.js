import React, { Component } from 'react';

export default class Car extends Component {
  constructor(props) {
    super(props);

    this._showDetails = this._showDetails.bind(this);
  }

  _showDetails() {
    let { car } = this.props;
    alert(`${car.year} ${car.make} ${car.model} Mileage: ${car.mileage}`);
  }

   render() {
        let { car } = this.props;
        return (
            <tr onClick={ this._showDetails }>
                <th scope="row">{ car.year }</th>
                <td>{ car.make }</td>
                <td>{ car.model }</td>
                <td>{ car.mileage }</td>
                <td>{ car.drivetrain ? car.drivetrain : "N/A" }</td>
            </tr>
        )
    }
}