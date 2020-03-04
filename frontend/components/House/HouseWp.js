import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';

const defaultProps = {};

export default class HouseWp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <React.Fragment />;
	}
}

HouseWp.propTypes = propTypes;
HouseWp.defaultProps = defaultProps;
