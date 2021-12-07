import React from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation, TFunction } from 'react-i18next';
import { NAMESPACE_KEY } from '../../../src/i18n/home/i18n';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type TLink = {
  label: string;
  url: string;
  target: '_blank' | '_self';
};

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const BeneficiaryForm = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);
  return <div></div>;
};

export default BeneficiaryForm;
