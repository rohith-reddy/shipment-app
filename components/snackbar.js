import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
    },
  });
  
class SnackbarComponent extends React.Component {
    state = {
        open: true
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        const { message, classes } = this.props;
        const { open } = this.state;

        return (
            <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={10000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        )
    }
}

export default withStyles(styles)(SnackbarComponent);