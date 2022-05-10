import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
  ThemeProvider,
  Typography
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import { useGetDoctorsQuery } from '@/src/services/apiBFF';
import { DoctorSearchMode, DoctorSearchOrder, DoctorSearchType } from '@/src/services/doctors.type';
import { searchClean } from '@/src/store/slice/search.slice';
/// i18n END

const SearchBySpecialty = (): JSX.Element => {
  const { t } = useTranslation([i18Global, i18Forms, i18nMedicalDirectory, i18ClinicHistory]);
  const dispatch = useDispatch();
  const classes = examStyles();
  const router = useRouter();
  const [searchField] = useState('');
  const [searchShow] = useState(false);
  const { data, isLoading } = useGetDoctorsQuery({
    latitude: '0',
    longitude: '0',
    type: DoctorSearchType.speciality,
    order: DoctorSearchOrder.distance,
    mode: DoctorSearchMode.presential
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState({});
  const getSpecialtys = () => {
    const result = data?.doctors?.reduce((acc, item, i) => {
      if (!acc.includes(item.speciality)) {
        acc.push({ idx: i + 1, title: item.speciality });
      }
      return acc;
    }, []);
    if (result) {
      result.sort((a, b) => a.title.localeCompare(b.title));
      return result;
    }
  };

  useEffect(
    () => () => {
      dispatch(searchClean());
    },
    []
  );

  const filteredSpecialtys = getSpecialtys()?.filter(data => {
    return data.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleClick = (item): void => {
    router.push({
      pathname: '/medicalDirectory/searchBy/specialtyResults',
      query: {
        searchField: item.title
      }
    });
  };

  const ListItemSpecialties = (item): JSX.Element => (
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
          <SvgSpecialty />
          <Typography
            sx={{ fontWeight: 500, fontSize: 20, lineHeight: '160%', color: titlePageColor }}
          >
            {t('searchBySection.specialty', { ns: i18nMedicalDirectory })}
          </Typography>
        </Stack>
        <Box mt={2}>
          <SearchWithGeolocation
            labelText={t('items.labelSearch', { ns: i18nMedicalDirectory })}
            placeHolderText={t('items.placeholderSearchSpecialty', { ns: i18nMedicalDirectory })}
            path="/medicalDirectory/searchBy/specialtyResults"
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
            {!isLoading && !searchShow && getSpecialtys()?.map(item => ListItemSpecialties(item))}
            {!isLoading && searchShow && filteredSpecialtys.map(item => ListItemSpecialties(item))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SearchBySpecialty;
