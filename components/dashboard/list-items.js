import React from 'react';
import PropTypes from 'prop-types';
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
  constructor(props) {
    super(props);

    this.state = {
      open: props.open || false,
    }
  }

  // componentWillReceiveProps = (nextProps) => {
  //   console.log('props', nextProps.checkAllFilters)
  //   console.log('props', this.props.options[0])
  //   if (nextProps.checkAllFilters && nextProps.options[0] !== this.props.options[0]) {
  //     console.log('came')
  //     this.setState({
  //       checked: nextProps.options
  //     })
  //   }
  // }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { title, options, classes, icon, checkedFilters } = this.props;

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
              onClick={this.props.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={checkedFilters.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
                {/* <Radio
                  checked={checkedFilters.indexOf(value) !== -1}
                /> */}
              <ListItemText primary={value} />
            </ListItem>
          ))}
        </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);