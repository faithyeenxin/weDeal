import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Container } from '@mui/system';
import { useEffect, useState, useMemo } from 'react';
import CategoryField from '../components/CategoryField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { ICategory } from '../Interface';

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { DetailsRounded } from '@mui/icons-material';
import parseJwt from '../UIUX/parseJwt';
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../../public/loading-spinner.svg';

const containsText = (text: any, searchText: any) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const AddDealPage = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const token: any = sessionStorage.getItem('token');
  const payload = parseJwt(token);
  const id = payload.id;
  const [retailPrice, setRetailPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [savingsDisplay, setSavingsDisplay] = useState('');
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [allOptions, setAllOptions] = useState<ICategory[]>([]);
  const [locationStatus, setLocationStatus] = useState('');
  const [locationDetail, setLocationDetails] = useState<any>();

  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option.name, searchText)),
    [searchText, allOptions]
  );

  useEffect(() => {
    axios
      .get(`/api/category`)
      .then((res) => {
        setAllOptions([{ name: '-' }, ...res.data]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    if (retailPrice === 0 || discountedPrice === 0) {
      setSavingsDisplay('');
    } else {
      const calculatedSavings = retailPrice - discountedPrice;
      const percentageSavings = (calculatedSavings / retailPrice) * 100;
      setSavings(calculatedSavings);
      setSavingsDisplay(
        `$${String(calculatedSavings.toFixed(2))} (${percentageSavings.toFixed(
          2
        )}%)`
      );
    }
  }, [retailPrice, discountedPrice]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      uploadedImages: [],
      retailPrice: '',
      discountedPrice: '',
      dealExpiry: '',
      location: '',
      categoryName: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name of deal required'),
      uploadedImages: Yup.mixed()
        .required('A file is required')
        .test(
          'numOfFiles',
          'Maximum upload of 3 images',
          (value: any) => value.length <= 3
        ),
      retailPrice: Yup.number().required('Required'),
      discountedPrice: Yup.number().required('Required'),
      dealExpiry: Yup.date()
        .min(
          new Date(),
          `Date should be equal or later than ${new Date().toLocaleDateString()}`
        )
        .required('Required'),
      location: Yup.string()
        .required('Required')
        .test(
          'location-exist',
          'Location does not exist',
          (location: any): boolean => {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBh_veIl8kLIgp2gCyglYDvnl-d0EK9CU&address=${location}`
              )
              .then((res) => {
                setLocationStatus(res.data.status);
                console.log(res.data);
                setLocationDetails(res.data);
              })
              .catch((err) => console.log(err));
            return locationStatus === 'OK' ? true : false;
          }
        ),
      categoryName: Yup.string().required('Required'),
    }),

    onSubmit: (values: any) => {
      setIsLoading(true);

      const categoryItem = allOptions.filter((option, index) => {
        return option.name === values.categoryName;
      });

      const imgConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      for (let i = 0; i < values.uploadedImages.length; i++) {
        formData.append('uploadedFiles', values.uploadedImages[i]);
      }

      axios
        .post(`/api/upload-images`, formData, imgConfig)
        .then((res) => {
          const body = {
            userId: id,
            name: values.name,
            retailPrice: values.retailPrice,
            discountedPrice: values.discountedPrice,
            location: values.location,
            locationAddress: locationDetail.results[0].formatted_address,
            locationLat: locationDetail.results[0].geometry.location.lat,
            locationLong: locationDetail.results[0].geometry.location.lng,
            dealExpiry: new Date(values.dealExpiry),
            categoryId: categoryItem[0].id,
            uploadedImages: res.data.imageLinks,
          };
          return axios.post(`/api/deal`, body);
        })
        .then((res) => {
          setIsLoading(false);
          navigate(`/home`);
        })
        .catch((err) => {
          alert('Error adding deal, please try again!');
          formik.resetForm();
        });
    },
  });

  return (
    <Box sx={{ marginTop: 8 }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant='h3'
            color={theme.palette.weDeal?.secondary?.lighter}
          >
            We're adding your deal now!!
          </Typography>
          <img src={LoadingSpinner} alt='SVG Image' />
        </Box>
      ) : (
        <Container>
          <Box sx={{ mt: 4.5, mb: 2 }}>
            <Typography
              variant='h3'
              sx={{
                background:
                  'linear-gradient(90deg, #FE400E 0%, #FF5935 47.4%, #FFAD1D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                TextFillColor: 'transparent',
              }}
            >
              Add a Deal!
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={2} rowSpacing={2.5}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  NAME OF ITEM
                </Typography>

                <TextField
                  required
                  size='small'
                  id='name'
                  name='name'
                  autoComplete='off'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  sx={{ width: '100%' }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.name}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  UPLOAD IMAGES
                </Typography>
                <TextField
                  size='small'
                  id='uploadedImages'
                  name='uploadedImages'
                  inputProps={{
                    multiple: true,
                  }}
                  type='file'
                  onChange={(event: any) => {
                    console.log(event.currentTarget.files);
                    formik.setFieldValue(
                      'uploadedImages',
                      event.currentTarget.files
                    );
                  }}
                  onBlur={formik.handleBlur}
                  sx={{ width: '100%' }}
                  hidden
                />
                {formik.touched.uploadedImages &&
                formik.errors.uploadedImages ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.uploadedImages}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  RETAIL PRICE
                </Typography>

                <TextField
                  required
                  size='small'
                  id='retailPrice'
                  name='retailPrice'
                  autoComplete='off'
                  type='number'
                  onChange={(e: any) => {
                    formik.handleChange(e);
                    setRetailPrice(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.retailPrice}
                  sx={{ width: '100%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>$</InputAdornment>
                    ),
                  }}
                />
                {formik.touched.retailPrice && formik.errors.retailPrice ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.retailPrice}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  DISCOUNTED PRICE
                </Typography>

                <TextField
                  required
                  size='small'
                  id='discountedPrice'
                  name='discountedPrice'
                  autoComplete='off'
                  type='number'
                  onChange={(e: any) => {
                    formik.handleChange(e);
                    setDiscountedPrice(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.discountedPrice}
                  sx={{ width: '100%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>$</InputAdornment>
                    ),
                  }}
                />
                {formik.touched.discountedPrice &&
                formik.errors.discountedPrice ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.discountedPrice}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  SAVINGS
                </Typography>

                <TextField
                  required
                  disabled={true}
                  size='small'
                  id='savings'
                  name='savings'
                  value={savingsDisplay}
                  sx={{
                    width: '100%',
                    backgroundColor:
                      savings >= 0
                        ? 'rgba(187,207,134, 0.2)'
                        : 'rgba(249,63,35, 0.2)',
                    borderRadius: '5%',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  ESTIMATED END OF DEAL
                </Typography>

                <TextField
                  required
                  size='small'
                  type='date'
                  id='dealExpiry'
                  autoComplete='off'
                  name='dealExpiry'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dealExpiry}
                  sx={{
                    width: '100%',
                  }}
                />
                {formik.touched.dealExpiry && formik.errors.dealExpiry ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.dealExpiry}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  DEAL'S LOCATION
                </Typography>

                <TextField
                  required
                  size='small'
                  id='location'
                  autoComplete='off'
                  name='location'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                  sx={{
                    width: '100%',
                  }}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.location}
                  </div>
                ) : null}
                {locationStatus === 'OK' ? (
                  <Typography variant='body2' sx={{ p: 0.7 }}>
                    {JSON.stringify(
                      locationDetail.results[0].formatted_address
                    ).replace(/['"]+/g, '')}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography
                  variant='body2'
                  sx={{ mb: '0.5rem', color: '#444444' }}
                >
                  CATEGORY
                </Typography>
                <FormControl size='small' fullWidth>
                  <Select
                    MenuProps={{ autoFocus: false }}
                    id='categoryName'
                    name='categoryName'
                    value={selectedOption}
                    // label="Options"
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (e.target.value === '-') {
                        setSelectedOption('');
                      } else {
                        setSelectedOption(e.target.value);
                      }
                    }}
                    onClose={() => setSearchText('')}
                    // This prevents rendering empty string in Select's value
                    // if search text would exclude currently selected option.
                    renderValue={() => selectedOption}
                  >
                    {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                    <ListSubheader>
                      <TextField
                        size='small'
                        // Autofocus on textfield
                        autoFocus
                        placeholder='Type to search...'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key !== 'Escape') {
                            // Prevents autoselecting item while typing (default Select behaviour)
                            e.stopPropagation();
                          }
                        }}
                      />
                    </ListSubheader>
                    {displayedOptions.map((option, i) => (
                      <MenuItem key={i} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <div style={{ color: theme.palette.weDeal?.error?.default }}>
                    {formik.errors.categoryName}
                  </div>
                ) : null}
              </Grid>
            </Grid>
            <Grid item md={12} sx={{ textAlign: 'center', mt: 5 }}>
              <CustomButton label='Add Deal' />
            </Grid>
          </form>
        </Container>
      )}
    </Box>
  );
};

export default AddDealPage;
