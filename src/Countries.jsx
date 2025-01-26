// import React, { useEffect, useState } from "react";
// import './Countries.css';

// const Countries = () => {
//   const [countries, setCountries] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await fetch("https://restcountries.com/v3.1/all");
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         setCountries(data);
//       } catch (err) {
//         console.error('Error fetching countries:', err);
//         setError('Failed to fetch countries. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const filteredCountries = countries.filter((country) =>
//     country.name.common.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for a country"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//       />

//       {loading ? (
//         <p>Loading countries...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <div className="country-grid">
//           {filteredCountries.length > 0 ? (
//             filteredCountries.map((country) => (
//               <div className="countryCard" key={country.cca3}>
//                 <img
//                   src={country.flags.png}
//                   alt={`${country.name.common}'s flag`}
//                 />
//                 <h2>{country.name.common}</h2>
//               </div>
//             ))
//           ) : (
//             <p>No countries found matching your search.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Countries;
import React, { useEffect, useState } from "react";

const CountrySearchApp = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetching country data from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          " https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); // Initialize with all countries
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Filtering countries based on search term
    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.name}
              className="countryCard"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                width: "150px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={country.png}
                alt={`${country.common} flag`}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>{country.common}</p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "18px", color: "#888" }}>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default CountrySearchApp;

