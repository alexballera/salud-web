import DefaultErrorPage from 'next/error';
/// MATERIAL - UI
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
/// MATERIAL - UI END

/// CUSTOMIZED COMPONENTS
import CustomTextField from '../components/common/TextField';
import TextMaskCustom from '../components/common/InputTextMask';
/// CUSTOMIZED COMPONENTS END

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
);

function ComponentsView(): JSX.Element {
  const classes = useStyles();

  if (process.env.NODE_ENV !== 'development') {
    return (
      <>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <div>
      <div className={classes.root}>
        <Typography component="h3" variant="h3">
          Buttons
        </Typography>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="secondary" disabled>
          Secondary
        </Button>

        <Button variant="outlined">Outline</Button>
        <Button variant="outlined" color="primary">
          Outline
        </Button>
        <Button variant="outlined" color="secondary">
          Outline
        </Button>
        <Button variant="outlined" color="secondary" disabled>
          Outline
        </Button>

        <Button color="primary" href="#contained-buttons">
          Link
        </Button>
        <Button color="secondary" href="#contained-buttons">
          Link
        </Button>
        <Button color="secondary" href="#contained-buttons" disabled>
          Link
        </Button>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography component="h3" variant="h3">
          Inputs Text
        </Typography>

        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" color="secondary" />

        <FormControl variant="outlined" hiddenLabel className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            key="age input"
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          id="combo-box-demo"
          options={[
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
            { title: 'The Godfather: Part II', year: 1974 },
            { title: 'The Dark Knight', year: 2008 }
          ]}
          getOptionLabel={option => option.title}
          style={{ width: 300 }}
          renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
        />

        <FormControl variant="outlined" fullWidth margin="normal" className={classes.formControl}>
          <InputLabel htmlFor="confirmPassword">Contraseña</InputLabel>
          <Input
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility">
                  <VisibilityOff />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <CustomTextField
          loading={true}
          id="firstName"
          name="firstname"
          label="Outlined"
          helperText="Campo requerido"
        />
        <CustomTextField
          loading={true}
          type="password"
          id="firstName"
          name="firstname"
          label="Outlined"
          helperText="Campo requerido"
        />

        <CustomTextField
          fullWidth
          id="documentNumber"
          name="documentNumber"
          label="Numero de identificación"
          error={true}
          loading={true}
          helperText="Campo requerido"
          inputProps={{
            // eslint-disable-next-line prettier/prettier
            mask: [
              /[1-9]/,
              /\d/,
              /\d/,
              ' ',
              '-',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              ' ',
              '-',
              ' ',
              /\d/,
              /\d/,
              /\d/
            ],
            'data-testid': 'documentNumber'
          }}
          inputComponent={TextMaskCustom as any}
        />
      </form>
    </div>
  );
}

export default ComponentsView;
