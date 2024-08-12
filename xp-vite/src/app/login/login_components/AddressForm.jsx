/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';

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
        <select {...register('country', {
          required: "Country is required",
        })} defaultValue={country} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {Country.getAllCountries().map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
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
        })} defaultValue={state} onChange={handleStateChange}>
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