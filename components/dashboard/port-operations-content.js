import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import Divider from '@material-ui/core/Divider';

import CssBaseline from '@material-ui/core/CssBaseline';

import AllocatedTable from './allocated-table';
import ToBeAllocatedTable from './to-be-allocated-table';
import YardSpaceTable from './yard-space';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    position: 'relative',
    minHeight: '90%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});

class PortOperationsContent extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });

    const mapFiltersToValue = {
      0: 'container_and_space_management',
      1: 'berth_allocation',
      2: 'logistics',
      3: 'maintenance',
    };

    this.props.handleSidebarFilterChange(mapFiltersToValue[value]);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, checkedFilters, handleSidebarFilterToggle } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
      {
        index: 0,
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        index: 1,
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
      },
      {
        index: 2,
        color: 'inherit',
        className: classNames(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
      },
      {
        index: 3,
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        index: 4,
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
      },
    ];

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="CONTAINER YARD SPACE MANAGEMENT" />
            <Tab label="BERTH ALLOCATION" />
            <Tab label="LOGISTICS" />
            <Tab label="MAINTENANCE" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          
          <TabContainer dir={theme.direction}>
            <React.Fragment>
              <YardSpaceTable 
                checkedFilters={checkedFilters} 
                handleSidebarFilterToggle={handleSidebarFilterToggle} />
            </React.Fragment>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <React.Fragment>
              {checkedFilters.indexOf('Trucks') !== -1 && <AllocatedTable />}
              <CssBaseline />
              <Divider />
              {checkedFilters.indexOf('Cranes') !== -1 && <ToBeAllocatedTable />}
              {/* {checkedFilters.indexOf('Allocated') !== -1 && <AllocatedTable />} */}
              <AllocatedTable />
              <CssBaseline />
              <Divider />
              {/* {checkedFilters.indexOf('To be allocated') !== -1 && <ToBeAllocatedTable />} */}
              <ToBeAllocatedTable />
            </React.Fragment>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <React.Fragment>
              {checkedFilters.indexOf('Trucks') !== -1 && <AllocatedTable />}
              <CssBaseline />
              <Divider />
              {checkedFilters.indexOf('Cranes') !== -1 && <ToBeAllocatedTable />}
            </React.Fragment>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <React.Fragment>
              {checkedFilters.indexOf('Logistic1') !== -1 && <AllocatedTable />}
              <CssBaseline />
              <Divider />
              {checkedFilters.indexOf('Logistic2') !== -1 && <ToBeAllocatedTable />}
            </React.Fragment>
          </TabContainer>
        </SwipeableViews>
        {/* {fabs.map((fab, index) => (
          <Zoom
            key={fab.index}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Button variant="fab" className={fab.className} color={fab.color}>
              {fab.icon}
            </Button>
          </Zoom>
        ))} */}
      </div>
    );
  }
}

PortOperationsContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleSidebarFilterChange: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(PortOperationsContent);
