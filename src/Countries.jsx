import React, { useEffect, useState } from "react";
import './Countries.css';
import CountryCard from "./CountryCard";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchCountries = async () =>{
      try{
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      console.log(data);
      setCountries(data);
   }
   catch(err){
      console.log('error fetching countries', err)
   }
  };

  fetchCountries();
  },[]);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  return(
    <div>
         <input
        type="text"
        placeholder="Search for a country"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}

      />
        <div className="country-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard">
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      <p>{country.name.common}</p>
    </div>
          ))
        ) : (
           <div></div>
        )}
      </div>
      {/* {error && <p>{error}</p>} */}
    </div>
  );
};
export default Countries;
