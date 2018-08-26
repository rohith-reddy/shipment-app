import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import StarBorder from '@material-ui/icons/StarBorder';

import SidebarListItem from './sidebar-list';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  activetab: {
    backgroundColor: 'grey'
  }
});

class SidebarList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList = () => {
    const { options, icon, classes, checkedTabIndex, handleClick } = this.props;
    let listjsx = options.map((option, index) => {
      let listItemClass = index == checkedTabIndex ? classes.activetab : '';
      return(
        <React.Fragment>
          <ListItem className={listItemClass} button onClick={() => handleClick(index)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText inset primary={option} />
          </ListItem>
        </React.Fragment>
      )
    });
    return listjsx;
  }

  render() {
    const { options, classes, icon } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          { this.renderList() }
        </List>
      </div>
    );
  }
}

SidebarList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarList);