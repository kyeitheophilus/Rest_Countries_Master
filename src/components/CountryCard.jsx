import '../index.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CountryCard = ({ name, flag, population, region, capital }) => {
  return (
    <div className='countryCard'>
      <Link to={name}>
        {' '}
        <img src={flag} alt='' />{' '}
      </Link>
      <div className='details'>
        <h2> {name}</h2>
        <p>
          {' '}
          <span>Population:</span>
          {population}
        </p>
        <p>
          {' '}
          <span>Continent:</span> {region}
        </p>
        <p>
          {' '}
          <span>Capital:</span> {capital}
        </p>
      </div>
    </div>
  )
}
CountryCard.propTypes = {
  name: PropTypes.string.isRequired,
  flag: PropTypes.string,
  population: PropTypes.string,
  region: PropTypes.string,
  capital: PropTypes.string,
}
export default CountryCard
