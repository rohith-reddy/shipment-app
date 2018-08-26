import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import TrainStatus from './train-status';
import RakeAllocation from './rake-allocation';
import UpcomingTrains from './upcoming-trains';

class TransportContent extends React.Component {

	render(){
		const { classes, checkedTabIndex } = this.props;
		let table;
		switch(checkedTabIndex){
			case 0:
				table = <TrainStatus />;
				break;
			case 1:
				table = <RakeAllocation />;
				break;
			case 2: 
				table = <UpcomingTrains />;
				break;
			default:
				table = <TrainStatus />;
		}
		return(
			<div>
				<React.Fragment>
					{ table }
				</React.Fragment>
			</div>
		);
	}
}

export default TransportContent;