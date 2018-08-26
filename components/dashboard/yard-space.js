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
    float: 'left',
    marginRight: '25px'
  },
  yardspacetd: {
    width: '75px',
    height: '35px',
    boxSizing: 'border-box',
    border: '1px solid black',
    textAlign: 'center',
  },
  yardspacetdactive: {
    width: '75px',
    height: '35px',
    boxSizing: 'border-box',
    border: '1px solid black',
    textAlign: 'center',
    backgroundColor: 'yellow',
    cursor: 'pointer'
  },
  yardspacedropdown: {
    marginBottom: '20px',
    height: '35px',
    width: '230px'
  },
  containernumber: {
    height: '35px',
    margin: '0 0 20px 70px',
    width: '250px'
  },
  yardspacebtn: {
    height: '25px',
    margin: '0 0 20px 45px',
    width: '85px'
  }
});

class YardSpaceTable extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      level: 1,
      containerNumberToShow: 0
    }
  }

  componentWillReceiveProps(nextProps){
    const levelFiltersArray = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
    const { checkedFilters } = nextProps;
    let checkedLevel = 1;
    levelFiltersArray.forEach(level => {
      if(checkedFilters.indexOf(level) !== -1){
        checkedLevel = +level.split(" ")[1];
      }
    });
    if(checkedLevel != this.state.level){
      this.setState({
        level: checkedLevel
      });
    }
  }

  handleButtonClick(){
    let containerNumberToShow = +document.getElementById('containernumber').value;
    let levelToShow = Math.ceil(containerNumberToShow/100);
    let levelFilter = `Level ${levelToShow}`;
    this.setState({ level: levelToShow, containerNumberToShow });
    this.props.handleSidebarFilterToggle(levelFilter)();
  }

  renderTableColumns(numAr){
    const { classes } = this.props;
    let columnjsx = numAr.map(number => {
      let tdClass = number === this.state.containerNumberToShow ? classes.yardspacetdactive : classes.yardspacetd;
      return(
        <TableCell className={tdClass} padding="checkbox">{number}</TableCell>
      )
    });
    return columnjsx;
  }

  renderTableRows(num){
    let number = num - 19;
    let numberArray = Array.from(new Array(10), (x, i) => i*2 + number);
    let rowsjsx = numberArray.map(number => {
      return(
        <TableRow>
          { this.renderTableColumns([number, number+1]) }
        </TableRow>
      )
    });
    return rowsjsx;
  }

  renderTable(){
    const { classes } = this.props;
    const tableNumbers = [1, 2, 3, 4, 5];
    let tablesjsx = tableNumbers.map(tableNum => {
      return(
        <React.Fragment>
          <Table className={classes.yardspacetable}>
            <TableBody>
              { this.renderTableRows((this.state.level-1)*100 + (tableNum*20)) }
            </TableBody>
          </Table>
        </React.Fragment> 
      )
    });
    return tablesjsx;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <select className={classes.yardspacedropdown}>
          <option value="A">Filter A</option>
          <option value="B">Filter B</option>
          <option value="C">Filter C</option>
        </select>
        <input 
          type="text" 
          name="containernumber" 
          placeholder="Enter the container number"
          id="containernumber"
          className={classes.containernumber} 
        />
        <button 
          type="button"
          className={classes.yardspacebtn} 
          onClick={this.handleButtonClick.bind(this)}
        >Check</button>
        <div>
          { this.renderTable() }
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(YardSpaceTable);
