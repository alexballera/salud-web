/// BASE IMPORTS
import React, { useState } from 'react';
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

/// SERVICES & TYPES
import { useGetVaccinesQuery } from '@/src/services/apiBFF';
import { TVaccines } from '@/src/services/getExamResultsData.service';
/// SERVICES & TYPES END

/// STYLES
import clsx from 'clsx';
import { examStyles } from '@/src/containers/ExamResult/styles.module';
import muiTheme from '@/src/styles/js/muiTheme';
/// STYLES END

const Vaccines = (): JSX.Element => {
  const { t } = useTranslation(i18ClinicHistory);
  const classes = examStyles();
  const router = useRouter();
  const userId = 'ee957013-b02f-45b2-b837-092b490242ea';
  const { data, isLoading } = useGetVaccinesQuery(userId);
  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);

  const handleClick = (id: string): void => {
    router.push(`/clinic_history/vaccines/${id}`);
  };

  const getVaccines = (): TVaccines[] => {
    if (data) {
      const covid = data.vaccines.filter(vaccine => vaccine.name === 'Covid-19');
      const vaccines = data.vaccines.filter(vaccine => vaccine.name !== 'Covid-19');
      vaccines.sort((a, b) => a.name.localeCompare(b.name));
      vaccines.unshift(...covid);
      return vaccines;
    }
  };

  const filteredVaccines = getVaccines()?.filter(vaccine => {
    return vaccine.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
    if (e.target.value === '') {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const showDose = (regular: number, reinforcement: number, extra: number) => {
    const dose = regular + reinforcement + extra;
    const totalDose = {
      1: 'I',
      2: 'I, II',
      3: 'I, II, III',
      4: 'IV',
      5: 'V',
      6: 'VI'
    };
    return totalDose[dose];
  };

  const ListItemVaccines = (item: TVaccines, i: number): JSX.Element => (
    <React.Fragment key={item.vaccineId}>
      <ListItem disablePadding button onClick={() => handleClick(item.vaccineId)} sx={{ pl: 1 }}>
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
              {showDose(item.regular?.length, item.reinforcement?.length, item.extra?.length)}{' '}
              {t('vaccines.dose', { ns: i18ClinicHistory })}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label={item.name} onClick={() => handleClick(item.vaccineId)}>
            <ChevronRightIcon color="secondary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider
        className={clsx({
          [classes.hidden]: i === data.vaccines.length - 1
        })}
      />
    </React.Fragment>
  );

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
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Box>

        <Box mt={2}>
          <List className={classes.root} aria-label="clinic history folders">
            {isLoading && (
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
            {searchShow && filteredVaccines.map((item, i) => ListItemVaccines(item, i))}
            {!searchShow && getVaccines()?.map((item, i) => ListItemVaccines(item, i))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default withTranslation(i18ClinicHistory)(Vaccines);
