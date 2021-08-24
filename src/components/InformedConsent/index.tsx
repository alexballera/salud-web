import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
// import Skeleton from '@material-ui/lab/Skeleton';
import { CircularProgress, Typography } from '@material-ui/core';
import { withAppContext } from '../../context';
import { RichTextTranslate } from '../../utils/cmsUtils';
import { INFORMED_CONSENT, IResponseInformedConsent } from '../../services/queries/InformedConsent';

function InformedConsent(): JSX.Element {
  const { loading, error, data } = useQuery<IResponseInformedConsent, unknown>(INFORMED_CONSENT);

  const Title = () => (
    <Typography data-testid="title-informed-consent" variant="h6">
      Consentimiento Informado
    </Typography>
  );

  if (loading) {
    return (
      <Fragment>
        <Title />
        <div data-testid="loading-skeleton">
          {/*
          TODO Revisar: Skeleton está presentando error se agrega spinner de manera temporal
          <Skeleton animation="wave" style={{ marginBottom: 6, marginTop: 8 }} height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} width="80%" height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={16} />
          <Skeleton animation="wave" width="80%" height={16} />
          */}
          <CircularProgress />
        </div>
      </Fragment>
    );
  }

  if (error || data.getPageInformedConsent.error) {
    return (
      <Typography data-testid="error" variant="h6" color="error">
        {error || data.getPageInformedConsent.error.message}
      </Typography>
    );
  }

  if (data) {
    const Content = RichTextTranslate(data.getPageInformedConsent.data.content);
    return (
      <Fragment>
        <Content />
      </Fragment>
    );
  }

  return <></>;
}

export default withAppContext(InformedConsent);
