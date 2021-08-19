import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography } from '@material-ui/core';
import { TERMS_AND_CONDITIONS } from '../../services/queries/TermsAndConditions';
import { withAppContext } from '../../context';
import { RichTextTranslate } from '../../utils/cmsUtils';

function TermsAndConditions(): JSX.Element {
  const { loading, error, data } = useQuery(TERMS_AND_CONDITIONS);

  const Title = () => (
    <Typography data-testid="title-term-and-conditions" variant="h6">
      Términos y condiciones
    </Typography>
  );

  if (loading) {
    return (
      <Fragment>
        <Title />
        <div data-testid="loading-skeleton">
          <Skeleton animation="wave" style={{ marginBottom: 6, marginTop: 8 }} height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} width="80%" height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={16} />
          <Skeleton animation="wave" style={{ marginBottom: 6 }} height={16} />
          <Skeleton animation="wave" width="80%" height={16} />
        </div>
      </Fragment>
    );
  }

  if (error || data.getPageTermsAndConditions.error) {
    return (
      <Typography data-testid="error" variant="h6" color="error">
        {error || data.getPageTermsAndConditions.error.message}
      </Typography>
    );
  }

  if (data) {
    const Content = RichTextTranslate(data.getPageTermsAndConditions.data.content);
    return (
      <Fragment>
        <Content />
      </Fragment>
    );
  }

  return <></>;
}

export default withAppContext(TermsAndConditions);
