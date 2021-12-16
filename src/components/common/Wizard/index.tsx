import React, { useState, useEffect } from 'react';
/// TYPES
import { IWizardProps, IStepPanelProps, IWizardDataSourceItem } from './index.types';
/// MATERIAL-UI
import Box from '@material-ui/core/Box';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import wizardStyles from './styles.module';
/// MATERIAL-UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/globals/i18n';
/// i18n END

function getStepContent(stepIndex: number, dataSource: IWizardDataSourceItem[]) {
  return (
    <StepPanel data={dataSource[stepIndex]} index={stepIndex} totalSteps={dataSource.length} />
  );
}

function StepPanel({ data, index, totalSteps }: IStepPanelProps) {
  const { t } = useTranslation(NAMESPACE_KEY);
  const classes = wizardStyles();
  const step = index + 1;
  return (
    <div
      id={`full-width-steppanel-${index}`}
      role="steppanel"
      aria-labelledby={`full-width-step-${index}`}
    >
      <Grid container className={classes.container}>
        <Grid item xs={12} md={8} className={classes.containerForm}>
          <Box p={3}>
            <Typography className={classes.stepIndicator} variant="h5" component="h5">
              {t('description.steps_header', { step, totalSteps })}
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom>
              {data.title}
            </Typography>
            <Typography className="mb-4">{data.description}</Typography>
            {data.component}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

function Wizard({
  footer,
  onSubmit,
  onChange,
  dataSource,
  disabledButton,
  ...props
}: IWizardProps): JSX.Element {
  const { t } = useTranslation(NAMESPACE_KEY);
  const classes = wizardStyles();
  const [activeStep, setActiveStep] = useState<number>(0);

  /// HANDLERS
  const handleNext = () => {
    if (activeStep !== dataSource.length - 1) setActiveStep(prevActiveStep => prevActiveStep + 1);
    else onSubmit();
  };

  /* const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }; */
  /// HANDLERS END

  /// USE EFECTS
  useEffect(() => {
    if (onChange) onChange(activeStep);
    if (props.activeStep !== undefined) setActiveStep(props.activeStep);
  }, [activeStep, props.activeStep]);
  /// USE EFECTS END

  return (
    <section className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {dataSource.map((data, index) => (
          <Step key={index}>
            <StepLabel>{data.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep, dataSource)}
        {!footer ? (
          <div>
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleNext}
              disabled={disabledButton}
            >
              {activeStep === dataSource.length - 1
                ? `${t('button.send')}`
                : `${t('button.following')}`}
            </Button>
          </div>
        ) : (
          <div>{footer}</div>
        )}
      </div>
    </section>
  );
}

export default Wizard;
export type { IWizardDataSourceItem };
