import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

/// CONTEXT
import { withAppContext } from '../context';
/// CONTEXT END

/// MATERIAL - UI
/// MATERIAL - UI END

/// SERVICES
/// SERVICES END

/// OWN COMPONENTS
import LayoutInner from '../layouts/LayoutInner';
import Redirect from '../components/common/Redirect';
/// OWN COMPONENTS END

/// STYLES & TYPES
import { AppStates } from '../context/types';
/// STYLES & TYPES END

/// FORM STATES & VALIDATIONS
/// FORM STATES & VALIDATIONS END

function HelpPage({ user, loggedIn }: AppStates): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (!(user || loggedIn)) {
      router.replace('/login');
    }
  }, [user, loggedIn]);
  return (
    <>
      {user ? (
        <LayoutInner>
          <h1>Ayuda</h1>
        </LayoutInner>
      ) : (
        <Redirect />
      )}
    </>
  );
}
export default withAppContext(HelpPage);
