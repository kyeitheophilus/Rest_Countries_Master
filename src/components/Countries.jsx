import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CountryCard from './CountryCard'

const Countries = ({ countryArr, query, filter, sort }) => {
  const [filteredCountry, setFilteredCountry] = useState(countryArr)
  const [sortingCountry, setSortingCountry] = useState(countryArr)
  const [searchCountry, setSearchCountry] = useState(countryArr)

  // filter country on region wise
  useEffect(() => {
    if (filter === 'asia') {
      let AsianCountries = countryArr.filter(country => {
        return country.region == 'Asia'
      })
      setFilteredCountry(AsianCountries)
    } else if (filter === 'america') {
      let americanCountries = countryArr.filter(country => {
        return country.region == 'Americas'
      })
      setFilteredCountry(americanCountries)
    } else if (filter === 'africa') {
      let africanCountries = countryArr.filter(country => {
        return country.region == 'Africa'
      })
      setFilteredCountry(africanCountries)
    } else if (filter === 'europe') {
      let EuropeanCountries = countryArr.filter(country => {
        return country.region == 'Europe'
      })
      setFilteredCountry(EuropeanCountries)
    } else if (filter === 'Oceania') {
      let OceanCountries = countryArr.filter(country => {
        return country.region == 'Oceania'
      })
      setFilteredCountry(OceanCountries)
    } else {
      setFilteredCountry(countryArr)
    }
  }, [countryArr, filter])

  // sort country order
  useEffect(() => {
    if (filteredCountry) {
      if (sort === 'default') setSortingCountry(filteredCountry)
      // in ascending order
      else if (sort === 'az') {
        let sortedCountry = [...filteredCountry].sort((a, b) => {
          const countryA = a.name.common.toUpperCase()
          const countryB = b.name.common.toUpperCase()
          if (countryA < countryB) return -1

          if (countryA > countryB) return 1

          return 0
        })
        setSortingCountry(sortedCountry)
      }
      // in descending order
      else if (sort === 'za') {
        let sortedCountry = [...filteredCountry].sort((a, b) => {
          const countryA = a.name.common.toUpperCase()
          const countryB = b.name.common.toUpperCase()
          if (countryA > countryB) return -1

          if (countryA < countryB) return 1

          return 0
        })
        setSortingCountry(sortedCountry)
      }
      // Population descending order
      else if (sort === 'populationDecreasing') {
        let sortedCountry = [...filteredCountry].sort((a, b) => {
          const countryA = a.population
          const countryB = b.population
          if (countryA > countryB) return -1

          if (countryA < countryB) return 1

          return 0
        })
        setSortingCountry(sortedCountry)
      }
      // Ascending order population
      else if (sort === 'populationIncreasing') {
        let sortedCountry = [...filteredCountry].sort((a, b) => {
          const countryA = a.population
          const countryB = b.population
          if (countryA > countryB) return 1

          if (countryA < countryB) return -1

          return 0
        })
        setSortingCountry(sortedCountry)
      }
    }
  }, [sort, filteredCountry, countryArr])

  // on search keyword
  useEffect(() => {
    if (sortingCountry) {
      let result = sortingCountry.filter(countryItem => {
        let { capital, name } = countryItem
        let capitalValue = capital ? capital[0].toLowerCase() : 'not available'
        let nameValue = name.common.toLowerCase()
        if (
          capitalValue.includes(query.toLowerCase()) ||
          nameValue.includes(query.toLowerCase())
        ) {
          return countryItem
        }
      })

      setSearchCountry(result)
    }
  }, [query, countryArr, sortingCountry])

  if (!sortingCountry) {
    return <div className='loader'>Loading...</div>
  }

  return (
    <div className='containner'>
      {query && searchCountry
        ? searchCountry.map((country, i) => (
            <CountryCard
              key={i}
              name={country.name.common}
              flag={country.flags.png}
              population={country.population.toLocaleString('en-US')}
              region={country.region}
              capital={country.capital ? country.capital[0] : 'no'}
            />
          ))
        : sortingCountry.map((country, i) => (
            <CountryCard
              key={i}
              name={country.name.common}
              flag={country.flags.png}
              population={country.population.toLocaleString('en-US')}
              region={country.region}
              capital={country.capital ? country.capital[0] : 'not available'}
            />
          ))}
    </div>
  )
}
Countries.propTypes = {
  countryArr: PropTypes.array,
  query: PropTypes.string,
  filter: PropTypes.string,
  sort: PropTypes.string,
}
export default Countries
