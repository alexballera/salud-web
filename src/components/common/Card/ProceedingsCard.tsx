import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { secondaryMainColor } from '../../../styles/js/theme';
import { CardActionArea } from '@material-ui/core';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';

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

export default function ProceedingsCard({ title }) {
  const classes = useStyles();

  return (
    <CardActionArea>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.alignCenter}>
            <FolderOpenOutlinedIcon htmlColor={secondaryMainColor} />
          </div>
          <Typography className={classes.textCard2}>{title}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
