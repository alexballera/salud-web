import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';

import { secondaryMainColor } from '../../../styles/js/theme';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SvgMedicine from '../Svg/SvgMedicine.component';
import SvgFolder from '../Svg/SvgFolder.component';

import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nProceedings } from '../../../i18n/proceedings/i18n';

const useStyles = makeStyles({
  textCard2: {
    color: secondaryMainColor,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.4,
    marginTop: 10,
    marginBottom: -5
  },
  root: {
    minWidth: 148,
    minHeight: 116,
    borderRadius: 16,
    boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.25)'
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

type TProps = {
  title: string;
  route: string;
};

export default function ProceedingsCard({ title, route }: TProps): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation([i18nProceedings]);

  const selectIcon = (icon): React.ReactElement => {
    switch (icon) {
      case t('proceedings.prescriptions', { ns: i18nProceedings }):
        return <SvgMedicine />;
      case t('proceedings.examResults', { ns: i18nProceedings }):
        return <SvgFolder />;
      default:
        return <FolderOpenOutlinedIcon htmlColor={secondaryMainColor} />;
    }
  };

  return (
    <CardActionArea className={classes.root}>
      <Card className={classes.root} onClick={() => router.push(route)}>
        <CardContent>
          <div className={classes.alignCenter}>{selectIcon(title)}</div>
          <Typography className={classes.textCard2}>{title}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
