/// MATERIAL-UI
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardDoctorResult from '../../../components/common/CardDoctorResult';
/// MATERIAL-UI END

/// DUMMY DATA
import { FAKE_ITEMS } from './data';
/// DUMMY DATA END

const useStyles = makeStyles({
  root: {
    padding: 25
  }
});

function MedicalDirectoryResultsPage(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          {/* TODO: Add a loading animation here to improve the user interactions */}
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
