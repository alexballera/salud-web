import React from 'react';

/// CONTEXT
import { withAppContext } from '../context';
/// CONTEXT END

/// MATERIAL - UI
import { Chip, Divider, Grid, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import { TitleContent } from '../components/common/TitleContent';
import { FieldTextData } from '../containers/Profile/components/FieldTextData';
import LayoutInner from '../layouts/LayoutInner';
import LayoutLoggedIn from '../layouts/LayoutLoggedIn';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginBottom: 16,
      marginTop: 16,
      [theme.breakpoints.up('md')]: {
        marginTop: 24
      }
    },
    chip: {
      marginRight: 8
    },
    contentContainer: {
      marginTop: 7
    }
  })
);

function PreferencesPage(): JSX.Element {
  const classes = useStyles();
  return (
    <LayoutLoggedIn>
      <LayoutInner>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TitleContent title="Preferencias" />
          </Grid>
          <Grid item xs={12} md={7}>
            <FieldTextData
              title="Idioma"
              text="Editar"
              titleUppercase
              href="/preferences/language"
            />
            <TitleContent title="Español" subTitle />
            <Divider className={classes.divider} />
          </Grid>
          <Grid container item xs={12} md={7}>
            <Grid item xs={12}>
              <FieldTextData
                title="Notificaciones"
                text="Editar"
                titleUppercase
                href="/preferences/notifications"
              />
            </Grid>
            <Grid item xs={12} className={classes.contentContainer}>
              <TitleContent title="Publicidad" subTitle />
              <Chip label="Email" color="secondary" className={classes.chip} />
              <Chip label="SMS" color="secondary" className={classes.chip} />
            </Grid>
            <Grid item xs={12} className={classes.contentContainer}>
              <TitleContent title="Recordatorios" subTitle />
              <Chip label="Email" color="secondary" className={classes.chip} />
            </Grid>

            <Grid item xs={12} className={classes.contentContainer}>
              <Divider className={classes.divider} />
            </Grid>
          </Grid>
        </Grid>
      </LayoutInner>
    </LayoutLoggedIn>
  );
}
export default withAppContext(PreferencesPage);
