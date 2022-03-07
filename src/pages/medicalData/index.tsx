/// BASE IMPORTS
import React, { useState } from 'react';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '../../i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '../../i18n/forms/i18n';
/// i18n END

/// OWN COMPONENTS
import { withAppContext } from '../../context';
/// OWN COMPONENTS END

/// MATERIAL UI
import { Avatar, Grid, Typography, Box } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import MedicalStyles from './style.module';
/// MATERIAL UI END

/// LAYOUT
import { MedicalDataCard } from '../../containers/MedicalData/MedicalDataCard';
/// LAYOUT END

/// SERVICES
import { IMedicalData, mockData } from '../../services/getMedicalData.service';
/// SERVICES END

function MedicalDataPage(): JSX.Element {
  const { t } = useTranslation([i18Global, i18Forms]);
  const classes = MedicalStyles();
  const [medicalData, setMedicalData] = useState<IMedicalData>(mockData);

  return (
    <Box mx={4}>
      <Box className={classes.edit}>
        <EditIcon className={classes.editIcon} /> {t('label.edit')}
      </Box>
      <Grid container className={classes.container}>
        <Grid item xs={9}>
          <Typography variant="h6" color="secondary">
            {medicalData.firstName}
          </Typography>
          <Typography variant="h6" color="secondary">
            {`${medicalData.firstLastName} ${medicalData.secondLastName}`}
          </Typography>
        </Grid>
        <Grid item xs={3} className={classes.contentAvatar}>
          <Avatar className={classes.avatar}>
            <PersonIcon fontSize="large" />
          </Avatar>
        </Grid>
      </Grid>
      <MedicalDataCard generalData={medicalData} />
    </Box>
  );
}

export default withTranslation([i18Global, i18Forms])(withAppContext(MedicalDataPage));
