import { useMemo, useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../Api'

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = useMemo(
    () => async (inputValue) => {
      console.log('fetching')
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const apiData = await response.json();
      return {
        options: apiData.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    },
    []
  );
  

  const handleOnChange = useCallback((searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch(null);
  }, [onSearchChange]);

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;