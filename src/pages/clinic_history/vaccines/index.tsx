/// BASE IMPORTS
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
/// BASE IMPORTS

/// i18n
import { useTranslation, withTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18ClinicHistory } from '@/src/i18n/clinic_history/i18n';
/// i18n END

/// MUI COMPONENTS
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
/// MUI COMPONENTS END

/// OWN COMPONENTS
/// OWN COMPONENTS END

/// SERVICES
import { getVaccinesData, TVaccinesData } from '@/src/services/getExamResultsData.service';
/// SERVICES END

/// STYLES
import clsx from 'clsx';
import { examStyles } from '@/src/containers/ExamResult/styles.module';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

const Vaccines = (): JSX.Element => {
  const { t } = useTranslation(i18ClinicHistory);
  const classes = examStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vaccines, setVaccines] = useState<TVaccinesData>();

  useEffect(() => {
    setLoading(true);
    const id = 'ee957013-b02f-45b2-b837-092b490242ea';
    getVaccinesData(id)
      .then(res => {
        setVaccines(res.data);
        console.log('vacunas', res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (id: string): void => {
    router.push(`/clinic_history/vaccines/${id}`);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3}>
        <Typography variant="body1" component="div" className={classes.vaccineTitle}>
          {t('vaccines.title', { ns: i18ClinicHistory })}
        </Typography>

        <Box mt={2}>
          <TextField
            id="outlined-search"
            label="Búsqueda"
            placeholder="Busca el nombre de la vacuna"
            type="search"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>

        <Box mt={2}>
          <List className={classes.root} aria-label="clinic history folders">
            {loading && (
              <Grid
                container
                item
                xs={12}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ paddingTop: '10%' }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            )}
            {!loading &&
              vaccines?.vaccines.map((item, i) => (
                <React.Fragment key={item.vaccineId}>
                  <ListItem
                    disablePadding
                    button
                    onClick={() => handleClick(item.vaccineId)}
                    sx={{ pl: 1 }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            display: 'block',
                            color: '#455255',
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: '143%'
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            display: 'block',
                            color: '#829296',
                            fontWeight: 400,
                            fontSize: 12,
                            lineHeight: '166%'
                          }}
                          component="span"
                          variant="body2"
                        >
                          {item.regular.map(reg => `${reg.dose}, `)}
                          {item.reinforcement.map(reg => `${reg.dose}, `)}
                          {item.extra.map(reg => `${reg.dose} `)}
                          {t('vaccines.dose', { ns: i18ClinicHistory })}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label={item.name}
                        onClick={() => handleClick(item.vaccineId)}
                      >
                        <ChevronRightIcon color="secondary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider
                    className={clsx({
                      [classes.hidden]: i === vaccines.vaccines.length - 1
                    })}
                  />
                </React.Fragment>
              ))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default withTranslation(i18ClinicHistory)(Vaccines);
