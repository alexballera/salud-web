import React from 'react';

/// CONTEXT
import { withAppContext } from '../context';
/// CONTEXT END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutInner from '../layouts/LayoutInner';
import LayoutLoggedIn from '../layouts/LayoutLoggedIn';
/// OWN COMPONENTS END

/// STYLES & TYPES
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

function MainPage(): JSX.Element {
  return (
    <LayoutLoggedIn>
      <LayoutInner>
        <h1>Inicio</h1>
      </LayoutInner>
    </LayoutLoggedIn>
  );
}
export default withAppContext(MainPage);
