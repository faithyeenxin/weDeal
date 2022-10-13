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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Container } from "@mui/system";
import { useEffect, useState, useMemo } from "react";
import CategoryField from "../components/CategoryField";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ICategory } from "../Interface";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import format from "date-fns/format";
import { DetailsRounded } from "@mui/icons-material";

const containsText = (text: any, searchText: any) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const AddDealPage = () => {
  const [retailPrice, setRetailPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [savingsDisplay, setSavingsDisplay] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [allOptions, setAllOptions] = useState<ICategory[]>([]);
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option.name, searchText)),
    [searchText, allOptions]
  );

  useEffect(() => {
    axios
      .get(`/api/category`)
      .then((res) => {
        setAllOptions([{ name: "-" }, ...res.data]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    if (retailPrice === 0 || discountedPrice === 0) {
      setSavingsDisplay("");
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
      name: "",
      uploadedImages: [],
      retailPrice: "",
      discountedPrice: "",
      dealExpiry: "",
      location: "",
      categoryName: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name of deal required"),
      uploadedImages: Yup.mixed()
        .required("A file is required")
        .test(
          "numOfFiles",
          "Maximum upload of 3 images",
          (value: any) => value.length <= 3
        ),
      retailPrice: Yup.number().required("Required"),
      discountedPrice: Yup.number().required("Required"),
      dealExpiry: Yup.date()
        .min(
          new Date(),
          `Date should be equal or later than ${new Date().toLocaleDateString()}`
        )
        .required("Required"),
      location: Yup.string().required("Required"),
      categoryName: Yup.string().required("Required"),
    }),

    onSubmit: (values: any) => {
      console.log(values);
      alert("please wait as we add deal!");
      const categoryItem = allOptions.filter((option, index) => {
        return option.name === values.categoryName;
      });

      const imgConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      console.log(typeof values.uploadedImages);
      const formData = new FormData();
      for (let i = 0; i < values.uploadedImages.length; i++) {
        formData.append("uploadedFiles", values.uploadedImages[i]);
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
            dealExpiry: new Date(values.dealExpiry),
            categoryId: categoryItem[0].id,
            uploadedImages: res.data.imageLinks,
          };
          console.log(body.uploadedImages);
          return axios.post(`/api/deal`, body);
        })
        .then((res) => {
          console.log(res.data);
          navigate(`/${id}/home`);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <Container>
        <Box sx={{ mt: 4.5, mb: 2 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: "2rem", fontWeight: 600, color: "#fbb001" }}
          >
            Add A Deal
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={2} rowSpacing={2.5}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                NAME OF ITEM
              </Typography>

              <TextField
                required
                size="small"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                sx={{ width: "100%" }}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                UPLOAD IMAGES
              </Typography>
              <TextField
                size="small"
                id="uploadedImages"
                name="uploadedImages"
                inputProps={{
                  multiple: true,
                }}
                type="file"
                onChange={(event: any) => {
                  console.log(event.currentTarget.files);
                  formik.setFieldValue(
                    "uploadedImages",
                    event.currentTarget.files
                  );
                }}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
                hidden
              />
              {formik.touched.uploadedImages && formik.errors.uploadedImages ? (
                <div>{formik.errors.uploadedImages}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                RETAIL PRICE
              </Typography>

              <TextField
                required
                size="small"
                id="retailPrice"
                name="retailPrice"
                type="number"
                onChange={(e: any) => {
                  formik.handleChange(e);
                  setRetailPrice(e.target.value);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.retailPrice}
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              {formik.touched.retailPrice && formik.errors.retailPrice ? (
                <div>{formik.errors.retailPrice}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                DISCOUNTED PRICE
              </Typography>

              <TextField
                required
                size="small"
                id="discountedPrice"
                name="discountedPrice"
                type="number"
                onChange={(e: any) => {
                  formik.handleChange(e);
                  setDiscountedPrice(e.target.value);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.discountedPrice}
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              {formik.touched.discountedPrice &&
              formik.errors.discountedPrice ? (
                <div>{formik.errors.discountedPrice}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                SAVINGS
              </Typography>

              <TextField
                required
                disabled={true}
                size="small"
                id="savings"
                name="savings"
                value={savingsDisplay}
                sx={{
                  width: "100%",
                  backgroundColor:
                    savings >= 0
                      ? "rgba(187,207,134, 0.2)"
                      : "rgba(249,63,35, 0.2)",
                  borderRadius: "5%",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                ESTIMATED END OF DEAL
              </Typography>

              <TextField
                required
                size="small"
                type="date"
                id="dealExpiry"
                name="dealExpiry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dealExpiry}
                sx={{
                  width: "100%",
                }}
              />
              {formik.touched.dealExpiry && formik.errors.dealExpiry ? (
                <div>{formik.errors.dealExpiry}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                DEAL'S LOCATION
              </Typography>

              <TextField
                required
                size="small"
                id="location"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                sx={{
                  width: "100%",
                }}
              />
              {formik.touched.location && formik.errors.location ? (
                <div>{formik.errors.location}</div>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography
                variant="body2"
                sx={{ mb: "0.5rem", color: "#444444" }}
              >
                CATEGORY
              </Typography>
              <FormControl size="small" fullWidth>
                <Select
                  MenuProps={{ autoFocus: false }}
                  id="categoryName"
                  name="categoryName"
                  value={selectedOption}
                  // label="Options"
                  onChange={(e) => {
                    formik.handleChange(e);
                    if (e.target.value === "-") {
                      setSelectedOption("");
                    } else {
                      setSelectedOption(e.target.value);
                    }
                  }}
                  onClose={() => setSearchText("")}
                  // This prevents rendering empty string in Select's value
                  // if search text would exclude currently selected option.
                  renderValue={() => selectedOption}
                >
                  {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                  <ListSubheader>
                    <TextField
                      size="small"
                      // Autofocus on textfield
                      autoFocus
                      placeholder="Type to search..."
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
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
                <div>{formik.errors.categoryName}</div>
              ) : null}
            </Grid>
          </Grid>
          <Grid item md={12} sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#fbb002",
                color: "#f2f2f2",
                letterSpacing: "0.2rem",
                mt: "2rem",
                pl: "6rem",
                pr: "6rem",
                "&:hover": {
                  backgroundColor: "#a1c060",
                },
              }}
            >
              Add Deal
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddDealPage;
