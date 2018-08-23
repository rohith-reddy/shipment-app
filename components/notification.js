import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";


import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles = {
 popper: {
   right: 0
 }
};

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Badge
          buttonRef={node => {
            this.anchorEl = node;
          }}
          badgeContent={4}
          color="secondary"
          onClick={this.handleToggle}
        >
          <NotificationsIcon />
        </Badge>
        <Poppers
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className={classes.popper}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "left start" : "left start"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                    >
                      1
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                    >
                      2
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                    >
                      3
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                    >
                      Another Notification
                      </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                    >
                      Another One
                      </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderLinks);