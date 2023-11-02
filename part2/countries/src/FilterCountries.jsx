import React, { useState } from 'react';
import ShowSingleButton from './ShowSingleButton';

const FilterCountries = ({
  FilterCountries,
  searchValue,
  handleChangeButton,
  setSearchFilter,
}) => {
  const [button, setButton] = useState(false);
  const [extraData, setExtraData] = useState([]);

  if (searchValue !== '' && Object.keys(FilterCountries).length > 10) {
    return <div>To many matches, please specify another filter</div>;
  } else if (
    Object.keys(FilterCountries).length <= 10 &&
    Object.keys(FilterCountries).length > 1
  ) {
    return (
      <>
        {FilterCountries.map((country, index) => (
          <div key={index}>
            {country.name.common}
            <button
              value={country.name}
              onClick={() => setSearchFilter(country.name.common)}
            >
              show
            </button>
            <div></div>
          </div>
        ))}
      </>
    );
  } else if (Object.keys(FilterCountries).length == 1) {
    console.log(FilterCountries);
    return (
      <>
        {FilterCountries.map((country) => (
          <div>
            <ShowSingleButton FilterCountries={country} />
          </div>
        ))}
      </>
    );
  }
};

export default FilterCountries;
