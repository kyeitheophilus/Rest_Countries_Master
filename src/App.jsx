import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Country from './Pages/Country'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Country />} />
      </Routes>
    </>
  )
}

export default App
