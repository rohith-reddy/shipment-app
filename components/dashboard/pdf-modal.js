import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
    return {
        top: '10%',
        left: '30%',
        margin: 'auto',
        height: 'auto',
        width: 650
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

const PDFModal = ({classes, open, handleTogglePDFModal}) => {
    return (
        <div>
            <Modal
                aria-labelledby="pdf-modal-title"
                aria-describedby="pdf-modal-description"
                open={open}
                onClose={handleTogglePDFModal}
                style={{alignItems:'center',justifyContent:'center'}}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="title" id="modal-title">
                        PDF PREVIEW - PDF NAME
                    </Typography>
                    <iframe
                        src="http://docs.google.com/gview?url=https://www.icicilombard.com/Content/ilom-en/Downloads/PolicyWording/CHI_Policy_Wordings.pdf&embedded=true"
                        style={{width:600, height:500}}
                        frameBorder="0"
                    />
                </div>
            </Modal>
        </div>
    );
}

PDFModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PDFModal);
