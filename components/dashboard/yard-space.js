import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  yardspacetable: {
    width: 'auto',
    height: 'auto',
    borderSpacing: 0,
  },
  yardspacetd: {
    width: '75px',
    height: '35px',
    boxSizing: 'border-box',
    border: '1px solid black',
    textAlign: 'center'
  },
});

class YardSpaceTable extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <Table className={classes.yardspacetable}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.yardspacetd} padding="checkbox">1</TableCell>
              <TableCell className={classes.yardspacetd} padding="checkbox">2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(YardSpaceTable);
