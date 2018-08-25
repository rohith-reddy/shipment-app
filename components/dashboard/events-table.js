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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(timestamp, event, status) {
  counter += 1;
  return { id: counter, timestamp, event, status };
}


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'time stamp', numeric: false, disablePadding: false, label: 'Time stamp' },
  { id: 'Events', numeric: false, disablePadding: false, label: 'Events' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

class EventsTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EventsTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  lastUpdated: {
      minWidth: 200,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EventsTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Ships
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : <span className="lastUpdated">Last Updated at :- 02-Jan-2018 14:00:00</span>}
      </div>
    </Toolbar>
  );
};

EventsTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EventsTableToolbar = withStyles(toolbarStyles)(EventsTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    padding: 30
  },
  table: {
    minWidth: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  progressbar: {
    position: 'relative', paddingLeft: 45, listStyle: 'none'
  },
  stepGreen: {
    backgroundColor: 'rgba(0, 147, 69, 0.6)'
  },
  stepRed: {
    backgroundColor: 'red'
  }

});

class ToBeAllocatedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'timestamp',
    selected: [],
    data: [
      {
        slug: "step-1",
        label: "Step 1",
        date: "July 1, 2018"
      },
      {
        slug: "step-2",
        label: "Step 2",
        date: "July 2, 2018"
      },
      {
        slug: "step-3",
        label: "Step 3"
      },
      {
        slug: "step-4",
        label: "Step 4"
      }
    ],
    page: 0,
    rowsPerPage: 5,
  };

  render() {
    const { classes, clickStep } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
          <ol className={classes.progressbar} data-progress-steps={data.length}>
            <div style={{display: 'inline-block', content: '""', position: 'absolute', top: 0, left: '3.5px', width: 25, borderRadius: 25, height: 'calc(100%)', backgroundColor: '#bafc9c'}} />
              {data.map(row => {
                return (
                  <li onClick={(e)=>{clickStep(row)}} style={{cursor:'pointer', paddingBottom: 15, minHeight: 55, position: 'relative', counterIncrement: 'list'}}><div>
                  {row.label} {row.date && `(${row.date})` }</div><div>
                  <div className={row.date ? classes.stepGreen : classes.stepRed} style={{borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%', borderTopLeftRadius: '50%', borderTopRightRadius: '50%', boxSizing: 'border-box', color: 'rgb(0, 147, 69)', content: '""', display: 'block', fontSize: 10, height: 18, left: '-38px', paddingTop: 2, position: 'absolute', textAlign: 'center', top: '3.5px', width: 19}} />
                  </div>
                  </li>
                );
              },this)}
          </ol>
        {/* <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        /> */}
      </Paper>
    );
  }
}

ToBeAllocatedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToBeAllocatedTable);