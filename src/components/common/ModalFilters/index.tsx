import { Box, Button, styled, Grid, IconButton, Modal, Typography } from '@mui/material';
import MuiArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { NAMESPACE_KEY as i18nMedicalDirectory } from '../../../i18n/medicalDirectory/i18n';
import { NAMESPACE_KEY as i18nGlobals } from '../../../i18n/globals/i18n';
import { titlePageColor } from '@/src/styles/js/theme';
import EditIcon from '@material-ui/icons/Edit';

import modalFiltersStyles from './style.module';
import { DoctorSearchMode, DoctorSearchOrder } from '@/src/services/doctors.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { searchOnFilter } from '@/src/store/slice/search.slice';
import SliderPrice from '../sliderPrice';

import { useSelector } from '@/src/store';
import ModalAppointmentAvailability from '../ModalAppointmentAvailability';
import { formatMoney, i18nDateFormat } from '@/src/utils/helpers';
import ChipFilters from '../ChipFilters';

const ArrowBackIcon = styled(MuiArrowBackIcon)({
  color: titlePageColor
});

type Tprops = {
  openModal: boolean;
  closeModal;
};

const ModalFilters = ({ openModal, closeModal }: Tprops): JSX.Element => {
  const { appointmentAvailability } = useSelector(state => state.search);
  const classes = modalFiltersStyles();
  const { t } = useTranslation([i18nMedicalDirectory, i18nGlobals]);
  const router = useRouter();
  const dispatch = useDispatch();

  const orderOptionsArray = [
    {
      label: t('filters.optionsOrder.closeness', { ns: i18nMedicalDirectory }),
      id: 1,
      isActive: false,
      type: DoctorSearchOrder.distance
    },
    {
      label: t('filters.optionsOrder.highLowPrice', { ns: i18nMedicalDirectory }),
      id: 2,
      isActive: false,
      type: DoctorSearchOrder.priceHighLow
    },
    {
      label: t('filters.optionsOrder.lowHighPrice', { ns: i18nMedicalDirectory }),
      id: 3,
      isActive: false,
      type: DoctorSearchOrder.priceLowHigh
    },
    {
      label: t('filters.optionsOrder.availability', { ns: i18nMedicalDirectory }),
      id: 4,
      isActive: false,
      type: DoctorSearchOrder.available
    },
    {
      label: t('filters.optionsOrder.alphabetically', { ns: i18nMedicalDirectory }),
      id: 5,
      isActive: false,
      type: DoctorSearchOrder.alphabetically
    }
  ];

  const rangeOptionsArray = [
    {
      label: 'A 1km',
      id: 1,
      isActive: false,
      value: 1000
    },
    {
      label: 'A 5km',
      id: 2,
      isActive: false,
      value: 5000
    },
    {
      label: 'A 10km',
      id: 3,
      isActive: false,
      value: 10000
    }
  ];

  const [appointmentAvailabilityModal, setAppointmentAvailabilityModal] = useState(false);
  const appointmentAvailabilityOptionsArray = [
    {
      label: t('filters.appointmentAvailability.nearestAppointment', { ns: i18nMedicalDirectory }),
      id: 1,
      isActive: false,
      value: 1,
      icon: false
    },
    {
      label: t('filters.appointmentAvailability.onWeekend', { ns: i18nMedicalDirectory }),
      id: 2,
      isActive: false,
      value: 2,
      icon: false
    },
    {
      label: t('filters.appointmentAvailability.weekdayMorningAppointment', {
        ns: i18nMedicalDirectory
      }),
      id: 3,
      isActive: false,
      value: 3,
      icon: false
    },
    {
      label: t('filters.appointmentAvailability.weekdayAfternoonAppointment', {
        ns: i18nMedicalDirectory
      }),
      id: 4,
      isActive: false,
      value: 4,
      icon: false
    },
    {
      label: t('filters.appointmentAvailability.addSpecificDate', { ns: i18nMedicalDirectory }),
      id: 5,
      isActive: false,
      value: 5,
      icon: true
    }
  ];

  const modeOptionsArray = [
    {
      label: t('filters.optionsOrder.modalityTelemedicine', { ns: i18nMedicalDirectory }),
      isActive: false,
      id: 1,
      value: DoctorSearchMode.virtual
    },
    {
      label: t('filters.optionsOrder.modalityFaceToFace', { ns: i18nMedicalDirectory }),
      isActive: false,
      id: 2,
      value: DoctorSearchMode.presential
    }
  ];

  const [orderOptions, setOrderOptions] = useState(orderOptionsArray);
  const { order, range, mode, priceRange, priceMax } = useSelector(state => state.search);

  // filtro de distancia
  const [rangeOptions, setRangeOptions] = useState(rangeOptionsArray);
  const [appointmentAvailabilityOptions, setAppointmentAvailabilityOptions] = useState(
    appointmentAvailabilityOptionsArray
  );

  // modality filter
  const [modeOptions, setModeOptions] = useState(modeOptionsArray);

  const handleSelectOrderOption = i => {
    const newValue = orderOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setOrderOptions(newValue);
    dispatch(
      searchOnFilter({
        order: {
          name: orderOptions.find(item => item.id === i + 1).label,
          value: orderOptions.find(item => item.id === i + 1).type
        }
      })
    );
  };

  const handleSelectRangeOption = i => {
    const newValue = rangeOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setRangeOptions(newValue);
    dispatch(
      searchOnFilter({
        range: {
          name: rangeOptions.find(item => item.id === i + 1).label,
          value: rangeOptions.find(item => item.id === i + 1).value
        }
      })
    );
  };

  const handleSelectAppointmentOption = i => {
    const newValue = appointmentAvailabilityOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setAppointmentAvailabilityOptions(newValue);
    if (i === 4) {
      setAppointmentAvailabilityModal(true);
    }
  };

  const handleSelectModeOption = (i: number) => {
    const newValue = modeOptions.map((item, idx) => {
      item.isActive = idx === i;
      return item;
    });
    setModeOptions(newValue);
    dispatch(
      searchOnFilter({
        mode: {
          name: modeOptions.find(item => item.id === i + 1).label,
          value: modeOptions.find(item => item.id === i + 1).value
        }
      })
    );
  };

  const redirecSearch = () => {
    const filters = [];
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        ...(priceRange && { priceRange: `${priceRange.value[0]}-${priceRange.value[1]}` }),
        ...(order && { order: order.value }),
        ...(range && { range: range.value }),
        ...(mode && { mode: mode.value })
      }
    });

    if (order?.name) filters.push(order.name);
    if (range?.name) filters.push(range.name);
    if (mode?.name) filters.push(mode.name);

    if (priceRange) {
      filters.push(
        `${formatMoney(priceRange.value[0], ',', '₡')} - ${formatMoney(
          priceRange.value[1],
          ',',
          '₡'
        )}`
      );
    }
    // suma valores elegidos del filtro al array filters para mostrar los chips
    if (filters.length) {
      dispatch(
        searchOnFilter({
          filters
        })
      );
    }
    closeModal(false);
  };

  useEffect(() => {
    if (!order) {
      setOrderOptions(orderOptionsArray);
      delete router.query.order;
    }
    if (!range) {
      setRangeOptions(rangeOptionsArray);
      delete router.query.range;
    }
    if (!mode) {
      setModeOptions(modeOptionsArray);
      delete router.query.mode;
    }
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query
      }
    });
  }, [order, range, mode]);

  return (
    <Modal
      open={openModal}
      onClose={() => closeModal(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      disableEnforceFocus
    >
      <Box className={classes.main}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.navBar}
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item mr={3}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="arrow-back"
                  onClick={() => closeModal(false)}
                >
                  <ArrowBackIcon width={16} height={16} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.titleFilter}>
                  {t('filters.title', { ns: i18nMedicalDirectory })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="inherit" />
              <Typography ml={1} variant="body2" className={classes.eraseText}>
                {t('filters.actionEraseAll', { ns: i18nMedicalDirectory })}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>

        {/* TODO: Add the filter component here */}
        <Grid container mx={3}>
          <Grid item xs={12} mt={10}>
            <Typography variant="subtitle2" className={classes.titleFilter}>
              {t('filters.subTitle', { ns: i18nMedicalDirectory })}
            </Typography>
          </Grid>

          <Grid item xs={12} mt={3}>
            <Box sx={{ marginRight: 8 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.sortBy', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              {orderOptions.map((tag, idx) => {
                return (
                  <ChipFilters
                    key={idx}
                    isActive={tag.isActive}
                    label={tag.label}
                    idx={idx}
                    handleSelect={handleSelectOrderOption}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.distance', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              {rangeOptions.map((tag, idx) => {
                return (
                  <ChipFilters
                    key={idx}
                    isActive={tag.isActive}
                    label={tag.label}
                    idx={idx}
                    handleSelect={handleSelectRangeOption}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.price', { ns: i18nMedicalDirectory })}
              </Typography>
              <Box mt={2}>
                <SliderPrice
                  min={0}
                  max={priceMax}
                  step={1000}
                  currency="₡"
                  priceRange={priceRange?.value}
                  setRangePrice={searchOnFilter}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.appointmentAvailability', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              {appointmentAvailabilityOptions.map((tag, idx) => {
                return appointmentAvailability && idx === 4 ? (
                  ''
                ) : (
                  <ChipFilters
                    key={idx}
                    isActive={tag.isActive}
                    label={tag.label}
                    idx={idx}
                    handleSelect={handleSelectAppointmentOption}
                    icon={tag.icon}
                  />
                );
              })}
              <Box>
                {appointmentAvailability && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ChipFilters
                      isActive={true}
                      label={
                        i18nDateFormat(appointmentAvailability.date, "d 'de' MMMM ") +
                        '- ' +
                        appointmentAvailability.time
                      }
                    />
                    <Box mt={2}>
                      <Button size="small" onClick={() => handleSelectAppointmentOption(4)}>
                        <Typography variant="body2" className={classes.editText}>
                          {t('label.edit', { ns: i18nGlobals })}
                        </Typography>
                        <EditIcon className={classes.editIcon} />
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Box sx={{ height: 250, marginRight: 8 }}>
              <Typography variant="caption" className={classes.titleFilter}>
                {t('filters.name.modality', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              <Typography variant="caption" className={classes.modalityCaption}>
                {t('filters.modalityCaption', { ns: i18nMedicalDirectory })}
              </Typography>
              <br />
              {modeOptions.map((tag, idx) => {
                return (
                  <ChipFilters
                    key={idx}
                    isActive={tag.isActive}
                    label={tag.label}
                    idx={idx}
                    handleSelect={handleSelectModeOption}
                  />
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/** Section float */}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          px={3}
          className={classes.fixedSection}
        >
          <Grid item>
            <Typography variant="body2" className={classes.titleFilter}>
              {t('filters.results', { ns: i18nMedicalDirectory })}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.buttonFilter}
              sx={{ textTransform: 'inherit' }}
              onClick={() => redirecSearch()}
            >
              {t('filters.actionApplyFilters', { ns: i18nMedicalDirectory })}
            </Button>
          </Grid>
        </Grid>
        <ModalAppointmentAvailability
          isOpen={appointmentAvailabilityModal}
          isClose={setAppointmentAvailabilityModal}
        />
      </Box>
    </Modal>
  );
};

export default ModalFilters;
