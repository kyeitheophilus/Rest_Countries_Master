import { useEffect, useState } from 'react'
import { BiSolidMoon, BiMoon } from 'react-icons/bi'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    // getting user's previous choice from localstorage
    localStorage.getItem('darkMode') === 'true'
  )

  useEffect(() => {
    // add and remove dark-theme class

    isDarkMode
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme')

    // saving current preference to local storage
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  return (
    <div className='header'>
      <h1>Where in the world?</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? <BiSolidMoon /> : <BiMoon />}
        Dark Mode
      </button>
    </div>
  )
}

export default Header
