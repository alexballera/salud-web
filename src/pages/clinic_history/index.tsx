/// BASE IMPORTS
import React from 'react';
import clsx from 'clsx';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ClinicHistory } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI COMPONENTS
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
/// MUI COMPONENTS END

/// OWN COMPONENTS
import { withAppContext } from '@/src/context';
import SvgContainer from '@/src/components/common/SvgContainer';
import SvgDiseases from '@/src/components/common/Svg/SvgDiseases.component';
import SvgAllergies from '@/src/components/common/Svg/SvgAllergies.component';
import SvgHabits from '@/src/components/common/Svg/SvgHabits.component';
import SvgVaccines from '@/src/components/common/Svg/SvgVaccines.component';
import SvgFamilyIllnesses from '@/src/components/common/Svg/SvgFamilyIllnesses.component';
/// OWN COMPONENTS END

/// STYLES
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import SvgInjuries from '@/src/components/common/Svg/SvgInjuries.component';
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
    text: {
      marginLeft: 28
    },
    hidden: {
      display: 'none'
    }
  })
);
/// STYLES END

const clinicHistory = (): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation(i18ClinicHistory);
  const items = [
    {
      name: t('items.diseases', { ns: i18ClinicHistory }),
      icon: <SvgDiseases />,
      action: '/clinic_history/diseases'
    },
    {
      name: t('items.allergies', { ns: i18ClinicHistory }),
      icon: <SvgAllergies />,
      action: '/clinic_history/allergies'
    },
    {
      name: t('items.habits', { ns: i18ClinicHistory }),
      icon: <SvgHabits />,
      action: '/clinic_history/habits'
    },
    {
      name: t('items.injuries', { ns: i18ClinicHistory }),
      icon: <SvgInjuries />,
      action: '/clinic_history/injuries'
    },
    {
      name: t('items.vaccines', { ns: i18ClinicHistory }),
      icon: <SvgVaccines />,
      action: '/clinic_history/vaccines'
    },
    {
      name: t('items.familyIllnesses', { ns: i18ClinicHistory }),
      icon: <SvgFamilyIllnesses />,
      action: '/clinic_history/familyIllnesses'
    }
  ];

  const handleClick = (path: string): void => {
    router.push(path);
  };

  return (
    <Box p={3}>
      <List className={classes.root} aria-label="clinic history folders">
        {items.map((item, i) => (
          <React.Fragment key={item.name}>
            <ListItem button onClick={() => handleClick(item.action)}>
              <SvgContainer title={item.name} width={30} height={30}>
                {item.icon}
              </SvgContainer>
              <ListItemText primary={item.name} className={classes.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label={item.name}
                  onClick={() => handleClick(item.action)}
                >
                  <ChevronRightIcon color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider
              className={clsx({
                [classes.hidden]: i === items.length - 1
              })}
            />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default withTranslation(i18ClinicHistory)(withAppContext(clinicHistory));