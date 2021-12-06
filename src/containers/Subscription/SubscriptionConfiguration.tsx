import React from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation, TFunction } from 'react-i18next';
import { NAMESPACE_KEY } from '../../i18n/subscriptions/i18n';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type TLink = {
  label: string;
  url: string;
  target: '_blank' | '_self';
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: '425px'
    },
    link: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'rgba(0, 0, 0, 0.87)',
      marginTop: '32px',
      fontSize: '16px',
      fontWeight: 'normal',
      textDecoration: 'none',
      height: '24px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: 'Poppins-Regular',
      width: '100%',
      '&:hover': {
        color: theme.palette.action.hover,
        '& svg': {
          color: theme.palette.action.hover
        }
      }
    },
    divider: {
      height: '1px',
      width: '100%',
      background: 'rgba(0, 0, 0, 0.12)',
      marginTop: '24px',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    cancelSubscription: {
      marginTop: '24px',
      [theme.breakpoints.up('md')]: {
        marginTop: '49px'
      },
      '& a': {
        color: theme.palette.secondary.main,
        textDecoration: 'none',
        fontSize: '14px',
        lineHeight: '24px',
        letterSpacing: '0.3px',
        fontFamily: 'Poppins-Medium',
        '&:hover': {
          color: theme.palette.secondary.light
        }
      }
    }
  })
);

const buildLinks = (t: TFunction<'subscriptions', undefined>): TLink[] => {
  return [
    {
      label: t('conf_change_plan_link'),
      url: '/plan-change',
      target: '_self'
    },
    {
      label: t('conf_beneficiaries_link'),
      url: '/subscriptions/beneficiaries',
      target: '_self'
    },
    {
      label: t('conf_payment_info_link'),
      url: '/payment-information',
      target: '_self'
    },
    {
      label: t('conf_billing_info_link'),
      url: '/billing-information',
      target: '_self'
    }
  ];
};

const SubscriptionConfiguration = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(NAMESPACE_KEY);
  const links = buildLinks(t);
  return (
    <div>
      <div className={classes.wrapper}>
        {links.map(({ label, url, target }: TLink, idx) => (
          <Link key={idx} href={url}>
            <a className={classes.link} target={target}>
              {label}
              <ArrowForwardIosIcon aria-label="Go" color="secondary" />
            </a>
          </Link>
        ))}
        <div className={classes.divider} />
        <div className={classes.cancelSubscription}>
          <Link href="/cancel-subscription">
            <a>{t('conf_cancel_subs_link')}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionConfiguration;
