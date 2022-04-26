// BASE IMPORTS
import React, { useState } from 'react';
// BASE IMPORTS END

// MUI
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// MUI END

// OWN COMPONENTS
import SvgDoctors from '@/src/components/common/Svg/SvgDoctors.component';
// OWN COMPONENTS END

// STYLES
import clsx from 'clsx';
import { titlePageColor } from '@/src/styles/js/theme';
import muiTheme from '@/src/styles/js/muiTheme';
import { examStyles } from '@/src/containers/ExamResult/styles.module';
// STYLES END

/// i18n
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18Global } from '@/src/i18n/globals/i18n';
import { NAMESPACE_KEY as i18Forms } from '@/src/i18n/forms/i18n';
import { NAMESPACE_KEY as i18ClinicHistory } from '@/src/i18n/clinic_history/i18n';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '@/src/i18n/medicalDirectory/i18n';
import { FAKE_SEARCH_HISTORY_LIST } from '..';
import { useRouter } from 'next/router';
/// i18n END

const SearchByDoctor = (): JSX.Element => {
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory, i18ClinicHistory]);
  const classes = examStyles();
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);
  const [data, setData] = useState(FAKE_SEARCH_HISTORY_LIST);
  const [isLoading, setIsLoading] = useState(false);

  const getDoctors = () => {
    if (data) {
      data.sort((a, b) => a.title.localeCompare(b.title));
      return data;
    }
  };

  const filteredDoctors = getDoctors()?.filter(data => {
    return data.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleClick = (item): void => {
    // router.push(`/clinic_history/vaccines/${id}`);
    console.log('id', item);
  };

  const redirectResults = () => {
    router.push({
      pathname: '/medicalDirectory/searchBy/doctorResults',
      query: {
        searchField: searchField
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
    if (e.target.value === '') {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  const ListItemDoctors = (item, i: number): JSX.Element => (
    <React.Fragment key={item.idx}>
      <ListItem button onClick={() => handleClick(item)} sx={{ pl: 1 }}>
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
              {item.title}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label={item.title} onClick={() => handleClick(item)}>
            <ChevronRightIcon color="secondary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <Box p={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <SvgDoctors width={24} heigth={24} />
          <Typography
            sx={{ fontWeight: 500, fontSize: 20, lineHeight: '160%', color: titlePageColor }}
          >
            {t('searchBySection.doctors', { ns: i18nMedicalDirectory })}
          </Typography>
        </Stack>
        <Box mt={3}>
          <TextField
            id="outlined-search"
            label="Búsqueda"
            placeholder="Buscá por doctor"
            type="search"
            color="secondary"
            fullWidth
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                redirectResults();
              }
            }}
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
            {searchShow && !filteredDoctors?.length && (
              <Typography variant="caption" className={classes.noRecords}>
                {t('doctors.no_records', { ns: i18ClinicHistory })}
              </Typography>
            )}
            {!isLoading && !searchShow && getDoctors()?.map((item, i) => ListItemDoctors(item, i))}
            {!isLoading && searchShow && filteredDoctors.map((item, i) => ListItemDoctors(item, i))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SearchByDoctor;
