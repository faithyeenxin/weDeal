import React, { useState, useMemo, useEffect, Dispatch } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { ICategory } from '../Interface';

const containsText = (text: any, searchText: any) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const CategoryField = ({
  setCategoryId,
}: {
  setCategoryId: Dispatch<string>;
}) => {
  // const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState('');
  const [allOptions, setAllOptions] = useState<ICategory[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option.name, searchText)),
    [searchText, allOptions]
  );

  useEffect(() => {
    axios
      .get(`/api/category`)
      .then((res) => {
        setAllOptions([{ name: '-' }, ...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <FormControl size='small' fullWidth>
      <InputLabel id='search-select-label'>Category</InputLabel>
      <Select
        // Disables auto focus on MenuItems and allows TextField to be in focus
        MenuProps={{ autoFocus: false }}
        labelId='search-select-label'
        id='search-select'
        value={selectedOption}
        label='Options'
        onChange={(e, child: any) => {
          if (e.target.value === '-') {
            setSelectedOption('');
            setCategoryId('');
          } else {
            let obj = allOptions.find((option) => option.id === e.target.value);
            setSelectedOption(e.target.value);
            setCategoryId(child?.props.id);
          }
        }}
        onClose={() => setSearchText('')}
        // This prevents rendering empty string in Select's value
        // if search text would exclude currently selected option.
        renderValue={() => selectedOption}
        sx={{
          backgroundColor: '#F8F7F7',
          '& fieldset': { border: 'none' },
          borderRadius: 2,
        }}
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
          <MenuItem key={i} id={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryField;
