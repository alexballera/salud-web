import React, { useEffect, useState } from 'react';

/// CONTEXT
import { withAppContext } from '../../../context';
/// CONTEXT END

/// MATERIAL - UI
import { Button, Grid, Typography, Box, Collapse, Divider } from '@material-ui/core';
/// MATERIAL - UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nGlobals } from '../../../i18n/globals/i18n';
/// i18n END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import SvgContainer from '../SvgContainer';
import { TitleContent } from '../TitleContent';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { forwardEmailStyles as useStyle } from './styles.module';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

export type IProps = {
  title: JSX.Element;
  description: JSX.Element;
  image: JSX.Element;
  duration?: number;
  timerTitle: JSX.Element;
  timerLabel: JSX.Element;
  buttonText?: JSX.Element;
  handleClickForwardEmail: () => void;
};

function ForwardEmailComponent({
  title,
  description,
  image,
  duration,
  timerTitle,
  timerLabel,
  buttonText,
  handleClickForwardEmail
}: IProps): JSX.Element {
  const { t } = useTranslation(i18nGlobals);
  const classes = useStyle();
  const time = duration;
  const [showButton, setShowButton] = useState(false);
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    timerFunction();
  }, []);

  const timerFunction = () => {
    setShowButton(false);
    let count = 0;

    const timer = setInterval(() => {
      count++;
      setSeconds(seconds - count);
    }, 1000);

    setTimeout(() => {
      setShowButton(true);
      setSeconds(time);
      clearInterval(timer);
    }, time * 1000);
  };

  const handleClick = () => {
    timerFunction();
    handleClickForwardEmail();
  };

  return (
    <Box p={3}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.imgContainer}>
          <SvgContainer title="Banner Svg" width={173} height={137}>
            {image}
          </SvgContainer>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2} mt={2}>
            <TitleContent titleWithSubtitle title={title} />
            <TitleContent paragraph title={description} />
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.contentContainer}>
        <Box p={3}>
          <Grid container>
            <Box mb={2} className={classes.timerContainer}>
              <Grid container item xs={12}>
                <Grid item xs={7}>
                  <Typography className={classes.timerTitle}>{timerTitle}</Typography>
                </Grid>
                {!showButton && (
                  <Grid item xs={5} className={classes.timerLabel}>
                    <span>
                      {timerLabel}
                      {seconds === 60 ? ' 1:00 min' : ` ${seconds}s`}
                    </span>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Grid item xs={12}>
              <Collapse in={showButton}>
                <Button
                  fullWidth
                  onClick={() => handleClick()}
                  color="primary"
                  variant="contained"
                  size="large"
                >
                  {buttonText || t('forward_email.messages.resend_email', { ns: i18nGlobals })}
                </Button>
              </Collapse>
            </Grid>
          </Grid>
          <Box mt={2} mb={2}>
            <Divider />
          </Box>
          <Grid item xs={12}>
            <Typography align="center" className={classes.contactTitle}>
              {t('contact.title', { ns: i18nGlobals })}
            </Typography>
            <Typography
              align="center"
              className={`${classes.contactTitle}  ${classes.contactLabel}`}
            >
              {t('contact.label', { ns: i18nGlobals })}
            </Typography>
            <Typography
              align="center"
              className={`${classes.contactTitle}  ${classes.contactLabel}`}
            >
              {t('contact.ospi_center', { ns: i18nGlobals, telephone: '2222-2222' })}
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

/// DEFAULT PROPS
ForwardEmailComponent.defaultProps = {
  duration: 60
};
/// DEFAULT PROPS END

export default withAppContext(ForwardEmailComponent);
