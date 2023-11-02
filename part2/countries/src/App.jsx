import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterCountries from './FilterCountries';

const App = () => {
  const [country, setCountry] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then((response) => {
        setCountry(response.data);
      });
  }, []);

  const filteredCountries = country.filter((country) =>
    country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
  );

  const handleCountrySelect = (name) => {
    setSearchedCountry(name);
  };

  const setSearchFilter = (name) => {
    setSearchedCountry(name);
  };

  return (
    <>
      find countries:{' '}
      <input
        value={searchedCountry}
        onChange={(e) => setSearchedCountry(e.target.value)}
      />
      <FilterCountries
        FilterCountries={filteredCountries}
        searchValue={searchedCountry}
        setSearchFilter={setSearchFilter}
        handleChangeButton={handleCountrySelect}
      />
    </>
  );
};

export default App;
