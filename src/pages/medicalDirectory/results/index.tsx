/// MATERIAL-UI
import { makeStyles, styled } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
/// MATERIAL-UI END

/// OWN COMPONENTS
import CardDoctorResult from '../../../components/common/CardDoctorResult';
/// OWN COMPONENTS END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../i18n/medicalDirectory/i18n';
/// i18n END

/// DUMMY DATA
import { FAKE_ITEMS } from './data';
import { poppinsFontFamily, title2Color } from '@/src/styles/js/theme';
/// DUMMY DATA END

const Typography = styled(MuiTypography)({
  font: poppinsFontFamily,
  fontStyle: 'normal',
  fontWeight: 400
});

const useStyles = makeStyles({
  root: {
    padding: 25
  },
  title: {
    fontSize: 14,
    lineHeight: '157%',
    letterSpacing: '0.1px',
    color: title2Color,
    marginBottom: 16
  }
});

function MedicalDirectoryResultsPage(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          {/* TODO: Add a loading animation here to improve the user interactions */}
          <Typography variant="h1" className={classes.title}>
            {t('searchResults.title')}
          </Typography>
          {FAKE_ITEMS.map((item, idx) => {
            return (
              <CardDoctorResult {...item} redirectTo={`${item.redirectTo}/${idx}`} key={idx} />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default MedicalDirectoryResultsPage;
