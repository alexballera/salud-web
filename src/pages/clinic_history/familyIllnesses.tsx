/// BASE IMPORTS
import React from 'react';
/// BASE IMPORTS END

/// OWN COMPONENTS
import CardCollapse from '../../components/common/Card/CardCollapse';
/// OWN COMPONENTS END

/// STYLES
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';
import {
  background2Color,
  title2Color,
  title3Color,
  titlePageColor,
  secondaryMainColor
} from '../../styles/js/theme';
/// STYLES END

/// MATERIAL UI
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
/// MATERIAL UI END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nClinicHistory } from '../../i18n/clinic_history/i18n';
import { NAMESPACE_KEY as i18nGlobal } from '../../i18n/globals/i18n';
/// i18n END

/// TYPES
/// / TYPES END

/// SERVICES
import { useGetFamiliarDiseasesQuery } from '@/src/services/apiBFF';
import { TFamiliarDiseasesResponse } from '@/src/types/services/familiarDiseases.types';
/// SERVICES END

const CircularProgress = styled(MuiCircularProgress)({
  color: secondaryMainColor
});

const useStyles = makeStyles(() =>
  createStyles({
    mainGrid: {
      backgroundColor: background2Color,
      height: '100%'
    },
    title: {
      lineHeight: '150%',
      letterSpacing: '0.15px',
      fontSize: 16,
      marginBottom: 16,
      color: titlePageColor
    },
    boxSpacing: {
      marginBottom: 24
    },
    footerCard: {
      borderRadius: 8,
      boxShadow: 'none'
    },
    footerCardTitle: {
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: title3Color
    },
    footerCardDescription: {
      fontSize: 14,
      lineHeight: '143%',
      letterSpacing: '0.15px',
      color: title2Color,
      marginTop: 8
    }
  })
);

function FamilyIllnessesPage(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation([i18nGlobal, i18nClinicHistory]);
  const { data, isLoading } = useGetFamiliarDiseasesQuery();

  const getSubTitleCard = (disease: string[]) => {
    if (disease?.length === 0) {
      return t('familyIllnesses.noRegistration', { ns: i18nClinicHistory });
    } else {
      if (disease.find(text => text === 'NO')) {
        return t('familyIllnesses.noOne', { ns: i18nClinicHistory });
      } else {
        return t('familyIllnesses.yes', { ns: i18nClinicHistory });
      }
    }
  };

  const disabledCollapse = (disease: string[]) => {
    if (disease?.length === 0) {
      return true;
    } else {
      if (disease.find(text => text.toUpperCase() === 'NO')) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getFamilyName = value => {
    switch (value) {
      case 'uncles':
        return t('familyIllnesses.uncles', { ns: i18nClinicHistory });
      case 'otherFamily':
        return t('familyIllnesses.otherFamily', { ns: i18nClinicHistory });
      case 'father':
        return t('familyIllnesses.father', { ns: i18nClinicHistory });
      case 'mother':
        return t('familyIllnesses.mother', { ns: i18nClinicHistory });
      case 'paternalGrandparents':
        return t('familyIllnesses.paternalGrandparents', { ns: i18nClinicHistory });
      case 'maternalGrandparents':
        return t('familyIllnesses.maternalGrandparents', { ns: i18nClinicHistory });
      case 'siblings':
        return t('familyIllnesses.siblings', { ns: i18nClinicHistory });
      case 'nephew/niece':
        return t('familyIllnesses.nephew_niece', { ns: i18nClinicHistory });
      case 'child':
        return t('familyIllnesses.child', { ns: i18nClinicHistory });
      case 'carer':
        return t('familyIllnesses.carer', { ns: i18nClinicHistory });
      default:
        break;
    }
  };

  const getItems = (data: TFamiliarDiseasesResponse) => {
    return [
      {
        title: t('familyIllnesses.diabetes', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.diabetes),
        items: data.diseases.diabetes.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.diabetes)
      },
      {
        title: t('familyIllnesses.highPressure', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.highPressure),
        items: data.diseases.highPressure.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.highPressure)
      },
      {
        title: t('familyIllnesses.cancer', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.cancer),
        items: data.diseases.cancer.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.cancer)
      },
      {
        title: t('familyIllnesses.heartDisease', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.heartDisease),
        items: data.diseases.heartDisease.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.heartDisease)
      },
      {
        title: t('familyIllnesses.mentalDiseases', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.mentalDiseases),
        items: data.diseases.mentalDiseases.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.mentalDiseases)
      },
      {
        title: t('familyIllnesses.alzheimer', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.alzheimer),
        items: data.diseases.alzheimer.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.alzheimer)
      },
      {
        title: t('familyIllnesses.depression', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.depression),
        items: data.diseases.depression.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.depression)
      },
      {
        title: t('familyIllnesses.anxiety', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.anxiety),
        items: data.diseases.anxiety.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.anxiety)
      },
      {
        title: t('familyIllnesses.personalityProblems', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.personalityProblems),
        items: data.diseases.personalityProblems.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.personalityProblems)
      },
      {
        title: t('familyIllnesses.stroke', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.stroke),
        items: data.diseases.stroke.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.stroke)
      },
      {
        title: t('familyIllnesses.epilepsy', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.epilepsy),
        items: data.diseases.epilepsy.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.epilepsy)
      },
      {
        title: t('familyIllnesses.tuberculosis', { ns: i18nClinicHistory }),
        subtitle: getSubTitleCard(data.diseases.tuberculosis),
        items: data.diseases.tuberculosis.map(item => {
          return { value: getFamilyName(item) };
        }),
        disabledCollapse: disabledCollapse(data.diseases.tuberculosis)
      }
    ];
  };

  if (isLoading) {
    return (
      <Grid container className={classes.mainGrid}>
        <Grid item xs={12}>
          <Box px={3} py={3}>
            <Grid container direction="column" justify="center" alignItems="center">
              <CircularProgress color="inherit" />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.mainGrid}>
      <Grid item xs={12}>
        <Box px={3} py={3}>
          {data &&
            getItems(data).map(item => (
              <React.Fragment key={item.title}>
                <Box className={classes.boxSpacing}>
                  <CardCollapse
                    title={item.title}
                    subTitle={item.subtitle}
                    items={item.items}
                    itemClick={() => null}
                    disabled={item.disabledCollapse}
                  />
                </Box>
              </React.Fragment>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default FamilyIllnessesPage;
