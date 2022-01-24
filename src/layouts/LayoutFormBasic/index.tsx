/// MATERIAL - UI
import { Box, Grid, Hidden } from '@material-ui/core';
/// MATERIAL - UI END

/// STYLES
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
/// STYLES END

/// LOGO
import SvgSideForm from '../../components/common/Svg/SvgSideForm.component';
/// LOGO END

import { INotificationProps } from '../../context/types';
import Notifications from '../../components/common/Notifications';
import { withAppContext } from '../../context';

type TProps = {
  header?: JSX.Element;
  form: JSX.Element;
  handleLoading?: (loading: boolean) => void;
  notificationState?: INotificationProps;
  handleNotifications?: (props: INotificationProps) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      height: '100%',
      paddingTop: 0,
      [theme.breakpoints.up('md')]: {
        // TODO: Check if we need to remove the layot padding and then add this => paddingTop: 64
      }
    },
    formContainer: {
      justifyContent: 'flex-start',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }
    },
    svgContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }
  })
);

/// FORM STATES & VALIDATIONS END
const LayoutForm = ({
  form,
  header,
  notificationState,
  handleNotifications
}: TProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.mainContainer}>
      <Hidden only={['xs', 'sm']}>
        <Grid item xs={12} sm={12} md={6} lg={5} xl={5} className={classes.svgContainer}>
          <Box>
            <SvgSideForm />
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={12} md={6} lg={5} xl={4} className={classes.formContainer}>
        {header}
        <Hidden only={['xs', 'sm']}>
          <Notifications
            {...notificationState}
            onClose={() => handleNotifications({ ...notificationState, open: false })}
          />
        </Hidden>
        {form}
      </Grid>
    </Grid>
  );
};

export default withAppContext(LayoutForm);
