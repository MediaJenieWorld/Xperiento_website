/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const AddressForm = ({ errors, setValue, register, isCreatingAccount, profileUpdateData }) => {

  const [country, setCountry] = useState(''); // default country
  const [state, setState] = useState(''); // default state
  const [city, setCity] = useState(''); // default city

  useEffect(() => {
    if (profileUpdateData) {
      setCountry(profileUpdateData.country)
      setState(profileUpdateData.state)
      setCity(profileUpdateData.city)
    }
  }, [])

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
          pt={{
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
                outline: "none",
                boxShadow: "none"
              }
            }
          }} placeholder="Select Country " className="country-list pr w-full" highlightOnSelect={true} />
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
        <select {...register('state', {
          required: "State is required",
        })} defaultValue={state} value={state} onChange={handleStateChange}>
          <option value="">Select State</option>
          {State.getStatesOfCountry(country).map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
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
        <select {...register('city', {
          required: "City is required",
        })} defaultValue={city} onChange={handleCityChange}>
          <option value="">Select City</option>
          {City.getCitiesOfState(country, state).map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
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