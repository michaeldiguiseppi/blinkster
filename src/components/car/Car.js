import React, { Component } from 'react';

export default class Car extends Component {

   render() {
        let { car, index } = this.props;
        return (
            <tr>
                <th scope="row">{ car.year }</th>
                <td>{ car.make }</td>
                <td>{ car.model }</td>
                <td>{ car.mileage }</td>
                <td>{ car.drivetrain ? car.drivetrain : "N/A" }</td>
                <td><a href={`/cars/${index}`}><button type="button" className="btn btn-outline-info">Details</button></a></td>
            </tr>
        )
    }
}