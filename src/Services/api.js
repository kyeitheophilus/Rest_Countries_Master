import axios from 'axios'

const baseUrl = `https://restcountries.com/v3.1`

// fetching all countries array of objects
export const fetchCountries = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

// fetching country details based on route id
export const fetchCountryDetails = async id => {
  const response = await axios.get(`${baseUrl}/name/${id}?fullText=true`)
  return response.data
}


// another version

// import axios from "axios";

// // Define a function to fetch country details by name
// export async function fetchCountryDetails(countryName) {
//   try {
//     // Construct the URL for the request
//     const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

//     // Make an HTTP GET request to the URL
//     const response = await axios.get(apiUrl);

//     // Return the data from the response
//     return response.data;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error("Error fetching country details:", error);
//     throw error; // You can handle errors as needed
//   }
// }



// ------If i want to start all task parallely and wait to complete by promise.all()----
// fetching border country name with help of border country name code

export const fetchBorderCountryNames = async borderCountryCodes => {
  try {
    const promises = borderCountryCodes.map(async cca2 => {
      const response = await axios.get(`${baseUrl}/alpha/${cca2}`)
      return response.data[0].name.common
    })

    const names = await Promise.all(promises)
    return names
  } catch (error) {
    console.log(`Error in fetching border countries name`, error)
  }
}


// another version
// import axios from "axios";

// // Define a function to fetch bordering country names by their country codes
// export async function fetchBorderCountryNames(borderCountryCodes) {
//   try {
//     const baseUrl = "https://restcountries.com/v3.1"; // Base URL for the API
//     const promises = borderCountryCodes.map(async (cca2) => {
//       // Construct the URL for the request
//       const apiUrl = `${baseUrl}/alpha/${cca2}`;

//       // Make an HTTP GET request to the URL
//       const response = await axios.get(apiUrl);

//       // Extract the name of the bordering country
//       const borderCountryName = response.data[0].name.common;

//       return borderCountryName;
//     });

//     // Wait for all promises to resolve and get the bordering country names
//     const borderCountryNames = await Promise.all(promises);

//     // Return the names of bordering countries
//     return borderCountryNames;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error("Error fetching border country names:", error);
//     throw error; // You can handle errors as needed
//   }
// }




// --------------------If I want to complete task sequentially then for of with await-----------
// export const fetchBorderCountryNames = async borderCountryCodes => {
//   try {
//     const names = []

//     for (const cca2 of borderCountryCodes) {
//       const response = await axios.get(`${baseUrl}/alpha/${cca2}`)
//       const countryName = response.data[0].name.common
//       names.push(countryName)
//     }

//     return names
//   } catch (error) {
//     console.log(`Error in fetching border countries name`, error)
//     throw error // Rethrow the error to handle it elsewhere if needed
//   }
// }
