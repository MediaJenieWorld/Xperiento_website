/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const AddressForm = ({ errors, setValue, register, isCreatingAccount, profileUpdateData }) => {

  const [country, setCountry] = useState(profileUpdateData?.country || ''); // default country
  const [state, setState] = useState(profileUpdateData?.state || ''); // default state
  const [city, setCity] = useState(profileUpdateData?.city || ''); // default city

  useEffect(() => {
    setValue('country', country);
    setValue('state', state);
    setValue('city', city);
  }, [country, state, city]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState("")
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("")
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const dropDownPassthrough = {
    filterContainer: { className: "pr" },
    header: { className: "pr" },
    list: { className: "pr" },
    root: {
      style: {
        backgroundColor: "transparent",
        borderRadius: "0px",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        outline: "none",
        boxShadow: "none"
      }
    }
  }

  return (
    <>
      <div data-state={isCreatingAccount} className="flex-column">
        <label>Country:</label>
        <Dropdown   {...register('country', {
          required: "Country is required",
        })}
          filterBy='name' filter
          defaultValue={country} value={country} onChange={handleCountryChange} options={Country.getAllCountries()}
          optionLabel="name"
          optionValue='isoCode'
          pt={dropDownPassthrough} placeholder="Select Country " className="country-list pr w-full" highlightOnSelect={true} />
        {errors?.country && (
          <span
            style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
          >
            {errors.country.message || "Validation Error"}
          </span>
        )}
      </div>

      <div className="flex-column">
        <label>State:</label>
        <Dropdown   {...register('state', {
          required: "State is required",
        })}
          filterBy='name' filter
          defaultValue={state} value={state} onChange={handleStateChange} options={State.getStatesOfCountry(country)}
          optionLabel="name"
          optionValue='isoCode'
          pt={dropDownPassthrough} placeholder="Select State" className="country-list pr w-full" highlightOnSelect={true} />
        {errors?.state && (
          <span
            style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
          >
            {errors.state.message || "Validation Error"}
          </span>
        )}
      </div>
      <div className="flex-column">
        <label>City:</label>
        <Dropdown   {...register('city', {
          required: "City is required",
        })}
          filterBy='name' filter
          defaultValue={city} value={city} onChange={handleCityChange} options={City.getCitiesOfState(country, state)}
          optionLabel="name"
          optionValue='name'
          pt={dropDownPassthrough} placeholder="Select City" className="country-list pr w-full" highlightOnSelect={true} />
        {errors?.city && (
          <span
            style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
          >
            {errors.city.message || "Validation Error"}
          </span>
        )}
      </div>
    </>)
};

export default AddressForm;