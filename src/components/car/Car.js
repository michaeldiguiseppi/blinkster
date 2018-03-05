import React, { Component } from 'react';
import moment from 'moment';

export class Car extends Component {

   render() {
        let { car } = this.props;
        return (
            <tr>
                <th scope="row">{ car.year }</th>
                <td>{ car.make }</td>
                <td>{ car.model }</td>
                <td>{ car.mileage }</td>
                <td className="veh-drivetrain">{ car.drivetrain ? car.drivetrain : "N/A" }</td>
                <td>{ `${moment(car.created_at).format("MMMM Do, YYYY")}` }</td>
                <td><a href={`/cars/${car.year}/${car.make}/${car.model}`}><button type="button" className="btn btn-outline-info">Details</button></a></td>
            </tr>
        )
    }
}

export default Car;