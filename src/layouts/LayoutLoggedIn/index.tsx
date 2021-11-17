import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Redirect from '../../components/common/Redirect';
import { withAppContext } from '../../context';

type AppStates = {
  loggedIn: boolean;
  children: React.ReactNode;
};

function LayoutLoggedIn({ loggedIn, children }: AppStates): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.replace('/login');
    }
  }, [loggedIn]);
  return <>{loggedIn ? children : <Redirect />}</>;
}

export default withAppContext(LayoutLoggedIn);
