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
    boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)'
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

  const selectIcon = (icon): React.ReactElement => {
    switch (icon) {
      case 'Recetas y prescripciones':
        return <SvgMedicine />;
      case 'Resultados de exámenes':
        return <SvgFolder />;
      default:
        return <FolderOpenOutlinedIcon htmlColor={secondaryMainColor} />;
    }
  };

  return (
    <CardActionArea>
      <Card className={classes.root} onClick={() => router.push(route)}>
        <CardContent>
          <div className={classes.alignCenter}>{selectIcon(title)}</div>
          <Typography className={classes.textCard2}>{title}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
