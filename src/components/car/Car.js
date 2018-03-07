import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export class Car extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let { car } = this.props;
        this.context.router.history.push(`/cars/${car.year}/${car.make}/${car.model}`);
    }

   render() {
        let { car } = this.props;
        return (
            <tr onClick={ this.handleClick }>
                <th scope="row">{ car.year }</th>
                <td>{ car.make }</td>
                <td>{ car.model }</td>
                <td>{ car.mileage }</td>
                <td className="veh-drivetrain">{ car.drivetrain ? car.drivetrain : "N/A" }</td>
                <td>{ `${moment(car.created_at).format("MMMM Do, YYYY")}` }</td>
            </tr>
        )
    }

    static contextTypes = {
        router: PropTypes.shape({
          history: PropTypes.shape({
            push: PropTypes.func.isRequired,
          }),
          staticContext: PropTypes.object
        })
      };
}

export default Car;