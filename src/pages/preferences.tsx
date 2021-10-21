import React from 'react';

/// CONTEXT
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
    }
  })
);

export default function PreferencesPage(): JSX.Element {
  const classes = useStyles();
  return (
    <LayoutInner>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleContent title="Preferencias" />
        </Grid>
        <Grid item xs={12} md={7}>
          <FieldTextData title="Idioma" text="Editar" titleUppercase href="/preferences/language" />
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
          <Grid item xs={12}>
            <TitleContent title="Publicidad" subTitle />
            <Chip label="Email" color="secondary" />
            <Chip label="SMS" color="secondary" />
          </Grid>
          <Grid item xs={12}>
            <TitleContent title="Recordatorios" subTitle />
          </Grid>
        </Grid>
      </Grid>
    </LayoutInner>
  );
}
