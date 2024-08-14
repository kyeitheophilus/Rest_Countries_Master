import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './country.css'
import { fetchCountryDetails, fetchBorderCountryNames } from '../Services/api'

function CountryDetails() {
  const [data, setData] = useState()
  const [borderCountry, setBorderCountry] = useState()

  const { id } = useParams()

  // fetching country details and updating 'data' useState
  useEffect(() => {
    async function fetchData() {
      try {
        const CountryDetails = await fetchCountryDetails(id)
        setData(CountryDetails[0])
      } catch (error) {
        console.error(`Error fetching country details`, error)
      }
    }
    fetchData()
  }, [id])

  // fetching border country of current country
  useEffect(() => {
    async function fetchData() {
      if (data && data.borders) {
        try {
          const borderCountryNames = await fetchBorderCountryNames(data.borders)
          setBorderCountry(borderCountryNames)
        } catch (error) {
          console.log('Error in fetching border countries name', error)
        }
      }
    }
    fetchData()
  }, [data])

  if (!data) {
    return <div className='loader'>Loading...</div>
  }

  return (
    <>
      <section>
        <Link className="back-btn" to={"/"}>
          Back
        </Link>
        <div className="container-d">
          <img src={data.flags.png} alt={data.flags.alt} />
          <div className="country-info">
            <h1>{data.name.common}</h1>
            <div className="ul-box">
              <ul>
                <li>
                  {" "}
                  <span>Native Name: </span> {data.name.official}
                </li>
                <li>
                  <span>Population:</span>{" "}
                  {data.population.toLocaleString("en-US")}
                </li>
                <li>
                  <span>Continent:</span> {data.region}
                </li>
                <li>
                  <span>Sub Continent:</span> {data.subregion}
                </li>
                <li>
                  <span>Capital:</span>{" "}
                  {data.capital ? data.capital[0] : "not available"}
                </li>
              </ul>
              <ul>
                <li>
                  <span>Top Level Domain:</span> {data.tld && data.tld[0]}
                </li>
                <li>
                  <span>Currencies:</span> Ruppee
                </li>
                <li>
                  <span>Languages:</span>{" "}
                  {Object.values(data.languages).join(", ")}
                </li>
              </ul>
            </div>
            {/* Border countries box */}

            {borderCountry && (
              <div className="country-border">
                <h2>Border Countries:</h2>

                {borderCountry.map((name, id) => (
                  <Link to={`/${name}`} key={id} className="border-country">
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CountryDetails
