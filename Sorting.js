import React, { useState } from 'react';
// import { useQuery } from 'react-query';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './Sorting.css';
import Select from 'react-select';
// import { get_moviePopular } from './../../api/index';

const options = [
  { value: 'Popularity Descending' },
  { value: 'Popularity Ascending' },
  { value: 'Rating Descending' },
  { value: 'Rating Ascending' },
  { value: 'Release Date Descending' },
  { value: 'Release Date Ascending' },
  { value: 'Title (A-Z)' },
  { value: 'Title (Z-A)' },
];

export const sorter = (type, arr) => {
  switch (type) {
    case 'Popularity Ascending':
      return arr.sort((a, b) => a.popularity - b.popularity);

    case 'Popularity Descending':
      return arr.sort((a, b) => a.popularity - b.popularity);

    case 'Rating Ascending':
      return arr.sort((a, b) => a.vote_average - b.vote_average);

    case 'Rating Descending':
      return arr.sort((a, b) => b.vote_average - a.vote_average);

    case 'Release Date Descending':
      return arr.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );

    case 'Release Date Ascending':
      return arr.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date),
      );
    case 'Title (A-Z)':
      return arr.sort((a, b) => (a.title > b.title) - (a.title < b.title));
    case 'Title (Z-A)':
      return arr.sort((a, b) => (b.title > a.title) - (b.title < a.title));

    default:
      return arr;
  }
};

const Sorting = ({ onchangeSelect, value }) => {
  const [isOpen, setOpen] = useState(true);
  const [isSorted, setIsSorted] = useState(options[0]);
  // const moviePopular = useQuery('movie/popular', () => get_moviePopular());
  //     console.log('data', moviePopular);
  //

  const toggleDropdown = () => setOpen(!isOpen);

  const handleSelect = (item) => {
    onchangeSelect(item);
    setIsSorted(item);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <h2>Sort</h2>
        <span className={`iconClosed ${isOpen && 'iconArrow'}`}>
          <ChevronRightIcon />
        </span>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        <h4>Sort Results By</h4>
        <Select
          value={isSorted}
          onChange={handleSelect}
          options={options}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.value}
          styles={{
            option: (base) => ({
              ...base,
              border: 'none',
              height: '100%',
              cursor: 'pointer',
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Sorting;
