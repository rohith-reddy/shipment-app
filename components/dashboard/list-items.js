import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = {
    open: this.props.open || false,
    checked: []
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { title, options, classes, icon } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText inset primary={title} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
          {options.map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Line item ${value + 1}`} />
            </ListItem>
          ))}
        </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

// NestedList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(NestedList);