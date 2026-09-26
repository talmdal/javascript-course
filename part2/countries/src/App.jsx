import { useState } from 'react'
import { CountrySearch } from './components/CountrySearch.jsx'
import { Countries } from './components/Countries.jsx'
import { Country } from './components/Country.jsx'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ selectedCountry, setSelectedCountry] = useState(null)

  if (countries.length === 1 && !selectedCountry) {
    console.log('only 1', countries[0])
    setSelectedCountry(countries[0])
  }

  return (
    <>
     <CountrySearch onSuccess={setCountries} />

     {countries.length > 1 && <Countries countries={countries} onSelect={setSelectedCountry} />}
     {selectedCountry && <Country country={selectedCountry} />}
    </>
  )
}

export default App
