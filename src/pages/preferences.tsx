import { Grid } from '@material-ui/core';
import React from 'react';
import { TitleContent } from '../components/common/TitleContent';
import { FieldTextData } from '../containers/Profile/components/FieldTextData';
import { SectionTitle } from '../containers/Profile/components/SectionTitle';

/// CONTEXT
/// CONTEXT END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutInner from '../layouts/LayoutInner';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

export default function PreferencesPage(): JSX.Element {
  return (
    <LayoutInner>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleContent title="Preferencias" />
        </Grid>
        <Grid item xs={12} md={7} lg={5}>
          <FieldTextData title="Fecha de nacimiento" data="23/07/1992" />
        </Grid>
      </Grid>
    </LayoutInner>
  );
}
