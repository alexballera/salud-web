/// BASE IMPORTS
import React from 'react';
import Link from 'next/link';
/// BASE IMPORTS

/// SLICE SERVICE
import { useGetAllergiesQuery } from '../../../store/slices/allergie.slice';
/// SLICE SERVICE END

/// STYLES
import allergieStyles from './styles.module';
/// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Allergies } from '@/src/i18n/allergies/i18n';
/// i18n END

/// MATERIAL UI
import { Box, Typography, Card, Divider, Chip, Container } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
/// MATERIAL UI END

/// / TYPES
type TAllergies = {
  name: string;
  isActive: boolean;
};
type TProps = {
  allergies: TAllergies[];
};
/// / TYPES END

const Allergies = ({ allergies }: TProps): JSX.Element => {
  const classes = allergieStyles();
  const { t } = useTranslation(i18Allergies);

  const { data } = useGetAllergiesQuery();
  console.log(data);

  return (
    <Container>
      <Box>
        <Card className={classes.cardAllergie}>
          <Box mt={2} mx={2}>
            <Typography paragraph color="secondary" className={classes.typography16}>
              {t('allergies', { ns: i18Allergies })}
            </Typography>
          </Box>
          <Divider variant="fullWidth" />
          <Box mx={2}>
            {allergies
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((allergie, index) => (
                <Box key={index}>
                  <Link href={`/clinic_history/allergies/${allergie.name}`} passHref>
                    <Box component="span" className={classes.contentButton}>
                      <Typography variant="body2" color="primary" className={classes.buttonText}>
                        {allergie.name}
                      </Typography>
                      <Chip
                        label={
                          allergie.isActive
                            ? t('active', { ns: i18Allergies })
                            : t('inactive', { ns: i18Allergies })
                        }
                        className={[
                          classes.chipStatus,
                          allergie.isActive ? classes.chipActive : classes.chipInative
                        ].join(' ')}
                      />
                      <ChevronRightIcon color="secondary" />
                    </Box>
                  </Link>
                </Box>
              ))}
            {allergies.length === 0 && (
              <Box component="span" className={classes.contentButton}>
                <Typography variant="body2" color="primary" className={classes.buttonText}>
                  {t('unregistered', { ns: i18Allergies })}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

Allergies.getInitialProps = async () => {
  const allergies: TAllergies[] = [
    {
      name: 'Celiaquía',
      isActive: false
    },
    {
      name: 'Penicilina',
      isActive: true
    },
    {
      name: 'Aleve',
      isActive: true
    }
  ];

  return {
    allergies
  };
};

export default Allergies;
