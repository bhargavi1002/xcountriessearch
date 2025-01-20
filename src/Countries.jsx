import React, { useEffect, useState } from "react";
import './Countries.css';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to fetch countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        data-testid="search-input"
      />

      {loading ? (
        <p>Loading countries...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="country-grid">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div className="countryCard" key={country.cca3}>
                <img
                  src={country.flags.png}
                  alt={`${country.name.common}'s flag`}
                />
                <p>{country.name.common}</p>
              </div>
            ))
          ) : (
            <p>No countries found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Countries;
