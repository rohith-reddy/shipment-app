import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepImgCont : {
    marginBottom: 10, textAlign: 'center', backgroundColor: '#BDD7EE', padding: 15, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  stepImg : {
    display: 'inline-block', cursor: 'pointer', position: 'relative', width: 120, height: 100, margin: '0px 20px'
  },
  stepImgSpan: {
    lineHeight: 2
  },
  stepImgArw : {
    display: 'inline-block'
  }
});

function getSteps() {
  return ['Pre-arrival of vessel', 'Vessel berthing', 'Vessel berthing', 'Vessel berthing'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Pre-arrival of vessel';
    case 1:
      return 'Step 2: Vessel berthing';
    case 2:
      return 'Step 3: Vessel berthing';
    case 2:
      return 'Step 4: Vessel berthing';
    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
  };

  totalSteps = () => {
    return getSteps().length;
  };

  isStepOptional = step => {
    return step === 1;
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed,
    });

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
    });
  };

  skippedSteps() {
    return this.state.skipped.size;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.stepImgCont}>
          <div className={classes.stepImg} >
            <span className={classes.stepImgSpan}>PreBerthing</span>
            <img src="/static/images/PreBerthingIcon.png" width={80} height={80} />
          </div>
          <div className={classes.stepImgArw}><img src="/static/images/ArrowIcon.svg" width={80} height={80} /></div>
          <div className={classes.stepImg} >
            <span className={classes.stepImgSpan}>Berthing</span>
            <img src="/static/images/BerthingIcon.png" width={80} height={80} />
          </div>
          <div className={classes.stepImgArw}><img src="/static/images/ArrowIcon.svg" width={80} height={80} /></div>
          <div className={classes.stepImg} >
            <span className={classes.stepImgSpan}>Container Yard</span>
            <img src="/static/images/ContainerYardIcon.png" width={80} height={80} />
            </div>
          <div className={classes.stepImgArw}><img src="/static/images/ArrowIcon.svg" width={80} height={80} /></div>
          <div className={classes.stepImg} >
            <span className={classes.stepImgSpan}>Port Out</span>
            <img src="/static/images/PortOutIcon.svg" width={80} height={80} />
          </div>
        </div>
        <div>
          {/* {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
                {this.isStepOptional(activeStep) &&
                  !this.state.completed.has(this.state.activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}
                {activeStep !== steps.length &&
                  (this.state.completed.has(this.state.activeStep) ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  }
}

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);