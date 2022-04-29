// BASE IMPORTS
import React, { useState } from 'react';
// BASE IMPORTS END

// MUI
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
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
import SearchIcon from '@mui/icons-material/Search';
// MUI END

// OWN COMPONENTS
import SvgSpecialty from '@/src/components/common/Svg/SvgSpecialty.component';
// OWN COMPONENTS END

// STYLES
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
import { useRouter } from 'next/router';
import SearchWithGeolocation from '@/src/containers/SearchWithGeolocation';
/// i18n END

const FAKE_LIST_DOCTORS = [
  {
    idx: '1',
    title: 'Psicología'
  },
  {
    idx: '2',
    title: 'Fisioterapia/Terapia física'
  },
  {
    idx: '3',
    title: 'Ginecología'
  },
  {
    idx: '4',
    title: 'Medicina General'
  },
  {
    idx: '5',
    title: 'Nutrición'
  },
  {
    idx: '6',
    title: 'Odontología'
  },
  {
    idx: '7',
    title: 'Dermatología'
  },
  {
    idx: '8',
    title: 'Pediatría'
  }
];

const SearchBySpecialty = (): JSX.Element => {
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory, i18ClinicHistory]);
  const classes = examStyles();
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);
  const [data, setData] = useState(FAKE_LIST_DOCTORS);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState({});

  const getSpecialtys = () => {
    if (data) {
      data.sort((a, b) => a.title.localeCompare(b.title));
      return data;
    }
  };

  const filteredSpecialtys = getSpecialtys()?.filter(data => {
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

  const ListItemSpecialties = (item, i: number): JSX.Element => (
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
          <SvgSpecialty width={24} heigth={24} />
          <Typography
            sx={{ fontWeight: 500, fontSize: 20, lineHeight: '160%', color: titlePageColor }}
          >
            {t('searchBySection.specialty', { ns: i18nMedicalDirectory })}
          </Typography>
        </Stack>
        <Box mt={2}>
          <SearchWithGeolocation
            searchObject={setSearch}
            labelText={t('items.labelSearch', { ns: i18nMedicalDirectory })}
            placeHolderText={t('items.placeholderSearchSpecialty', { ns: i18nMedicalDirectory })}
            path="/medicalDirectory/searchResults/bySpecialty"
          />
        </Box>

        <Box mt={1}>
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
            {searchShow && !filteredSpecialtys?.length && (
              <Typography variant="caption" className={classes.noRecords}>
                {t('specialty.no_records', { ns: i18ClinicHistory })}
              </Typography>
            )}
            {!isLoading &&
              !searchShow &&
              getSpecialtys()?.map((item, i) => ListItemSpecialties(item, i))}
            {!isLoading &&
              searchShow &&
              filteredSpecialtys.map((item, i) => ListItemSpecialties(item, i))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SearchBySpecialty;
