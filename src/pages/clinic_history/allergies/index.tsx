import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from '@/src/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, Divider, Chip, Grid, styled } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { useGetAllergiesQuery } from '@/src/services/apiBFF';
import allergieStyles from './styles.module';
import { NAMESPACE_KEY as i18Allergies } from '@/src/i18n/allergies/i18n';

import api from '../../../api/api';
import { notificationClean } from '../../../store/slice/notification.slice';
import { secondaryMainColor } from '@/src/styles/js/theme';

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const Allergies = (): JSX.Element => {
  const classes = allergieStyles();
  const { t } = useTranslation(i18Allergies);
  const [idNotification, setIdNotification] = useState('');
  const [spinner, setSpinner] = useState(false);
  const { id, message } = useSelector(state => state.notification);
  const dispatch = useDispatch();

  let { data, refetch, isLoading } = useGetAllergiesQuery();

  useEffect(() => {
    if (data?.token) {
      setIdNotification(data.token);
      api.realTime(data.token);
      setSpinner(true);
    }
  }, [data]);

  useEffect(() => {
    if (id === idNotification) {
      if (message === 'FULFILLED') {
        refetch();
      } else {
        data = {
          ...data,
          allergies: []
        };
      }

      setSpinner(false);
      dispatch(notificationClean());
    }
  }, [id, message]);

  if (isLoading || spinner) {
    return (
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <Box px={3} py={3}>
            <Grid container direction="column" justify="center" alignItems="center">
              <CircularProgress color="inherit" />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      {data && (
        <Grid container>
          <Grid item xs={12}>
            <Box px={3} mt={3}>
              <Card className={classes.cardAllergie}>
                <Box mt={2} mx={2}>
                  <Typography paragraph color="secondary" className={classes.typography16}>
                    {t('allergies', { ns: i18Allergies })}
                  </Typography>
                </Box>
                <Divider variant="fullWidth" />
                <Box mx={2}>
                  {data.allergies &&
                    data.allergies.map((allergie, index) => (
                      <Box key={index}>
                        <Link href={`/clinic_history/allergies/${allergie.id}`} passHref>
                          <Box component="span" className={classes.contentButton}>
                            <Typography
                              variant="body2"
                              color="primary"
                              className={classes.buttonText}
                            >
                              {allergie.description}
                            </Typography>
                            <Chip
                              label={
                                allergie.isActive
                                  ? t('active', { ns: i18Allergies })
                                  : t('inactive', { ns: i18Allergies })
                              }
                              className={[
                                classes.chipStatus,
                                allergie.isActive ? classes.chipActive : classes.chipInative
                              ].join(' ')}
                            />
                            <ChevronRightIcon color="secondary" />
                          </Box>
                        </Link>
                      </Box>
                    ))}
                  {data.allergies && data.allergies.length === 0 && (
                    <Box component="span" className={classes.contentButton}>
                      <Typography variant="body2" color="primary" className={classes.buttonText}>
                        {t('unregistered', { ns: i18Allergies })}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Allergies;
