import React, { useState, useMemo, useEffect, Dispatch } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ICategory } from "../Interface";

const containsText = (text: any, searchText: any) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const CategoryField = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: Dispatch<string>;
}) => {
  // const [selectedOption, setSelectedOption] = useState("");
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
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="search-select-label">Category</InputLabel>
      <Select
        // Disables auto focus on MenuItems and allows TextField to be in focus
        MenuProps={{ autoFocus: false }}
        labelId="search-select-label"
        id="search-select"
        value={selectedOption}
        label="Options"
        onChange={(e) => {
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
  );
};

export default CategoryField;
