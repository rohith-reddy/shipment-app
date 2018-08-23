import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MainListItems from '../components/dashboard/list-items';
import SimpleLineChart from '../components/dashboard/simple-line-chart';
import SimpleTable from '../components/dashboard/simple-table';

import PortOperationsContent from '../components/dashboard/port-operations-content';
import MapOperations from '../components/dashboard/map-operations';
import Snackbar from '../components/snackbar';


import TruckIcon from '@material-ui/icons/LocalShipping';
import CraneIcon from '@material-ui/icons/Subway';
import ContainerIcon from '@material-ui/icons/Store';
import VesselIcon from '@material-ui/icons/Waves';
import RailIcon from '@material-ui/icons/DirectionsRailway';

import { setInterval } from 'timers';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  selectedTab: {
    background: '#fff',
    color: '#800080',
    '&:hover': {
      color: '#800080',
      background: '#fff',
    }
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    selectedTab: 'container_information_system',
    notifications: [1]
  };

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     notifications: [...this.state.notifications, this.state.notifications[this.state.notifications.length - 1] + 1]
    //   });
    // }, 7500);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { notifications, selectedTab } = this.state;

    let content;

    switch(selectedTab) {
      case 'container_information_system':
        content = <ContainerInfoSystemContent classes={classes}/>;
        break;
      case 'map_operations':
        content = <MapOperations />;
        break;
      case 'port_operations':
        content = <PortOperationsContent />;
        break;    
      case 'transport':
        content = <PortOperationsContent />;
        break;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Dashboard
              </Typography>
              <Button
                color="inherit"
                className={
                  classNames(
                    selectedTab === 'container_information_system' && classes.selectedTab || ''
                  )
                }
                onClick={() => this.setState({selectedTab: 'container_information_system'})}
              >
                CONTAINER INFORMATION SYSTEM
              </Button>
              <Button
                color="inherit"
                className={
                  selectedTab === 'map_operations' && classes.selectedTab || ''
                }
                onClick={() => this.setState({selectedTab: 'map_operations'})}
              >
                MAP OPERATIONS
              </Button>
              <Button
                color="inherit"
                className={
                  selectedTab === 'port_operations' && classes.selectedTab || ''
                }
                onClick={() => this.setState({selectedTab: 'port_operations'})}
              >
                PORT OPERATIONS
              </Button>
              <Button
                color="inherit"
                className={
                  selectedTab === 'transport' && classes.selectedTab || ''
                }
                onClick={() => this.setState({selectedTab: 'transport'})}
              >
                TRANSPORT
              </Button>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{<MainListItems icon={<TruckIcon />} title="TRUCKS" options={[1,2]} open={true}/>}</List>
            <Divider />
            <List>{<MainListItems icon={<CraneIcon />} title="CRANES" options={[3,4]}/>}</List>
            <Divider />
            <List>{<MainListItems icon={<ContainerIcon />} title="CONTAINER" options={[5,6]}/>}</List>
            <Divider />
            <List>{<MainListItems icon={<VesselIcon />} title="VESSEL" options={[7,8]}/>}</List>
            <Divider />
            <List>{<MainListItems icon={<RailIcon />} title="RAIL" options={[9,10]}/>}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {content}
          </main>
        </div>
        {
          notifications.map(
            (notification) => (
              <Snackbar
                message={notification}
              />
            )
          )
        }
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ContainerInfoSystemContent = ({classes}) => (
  <React.Fragment>
    <Typography variant="display1" gutterBottom>
      Orders
    </Typography>
    <Typography component="div" className={classes.chartContainer}>
      <SimpleLineChart />
    </Typography>
    <Typography variant="display1" gutterBottom>
      Products
    </Typography>
    <div className={classes.tableContainer}>
      <SimpleTable />
    </div>
  </React.Fragment>
)

// const transportContent = () => ();

export default withStyles(styles)(Dashboard);
