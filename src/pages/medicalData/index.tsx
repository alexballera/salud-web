import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation, withTranslation } from 'react-i18next';

import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
import { withAppContext } from '../../context';
import MedicalStyles from './style.module';
import { MedicalDataCard } from '../../containers/MedicalData/MedicalDataCard';
import AvatarLetter from '@/src/components/common/AvatarLetter';
import { useGetGeneralDataQuery } from '@/src/services/apiBFF';

function MedicalDataPage(): JSX.Element {
  const { t } = useTranslation([i18Global, i18Forms]);
  const classes = MedicalStyles();
  const { data } = useGetGeneralDataQuery();

  return (
    <>
      {data && (
        <Box mx={4}>
          <Box className={classes.edit}>
            <EditIcon className={classes.editIcon} /> {t('label.edit')}
          </Box>
          <Grid container className={classes.container}>
            <Grid item xs={9}>
              <Typography variant="h6" color="secondary">
                {data.firstName}
              </Typography>
              <Typography variant="h6" color="secondary">
                {`${data.firstLastName} ${data.secondLastName}`}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.contentAvatar}>
              <AvatarLetter name={`${data.firstName} ${data.firstLastName}`} size="72" />
            </Grid>
          </Grid>
          <MedicalDataCard generalData={data} />
        </Box>
      )}
    </>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDataPage));
