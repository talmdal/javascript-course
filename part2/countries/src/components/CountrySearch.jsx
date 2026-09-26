import { useState } from 'react'
import { getAll } from '../services/countries.js'

export const CountrySearch = (props) => {
  const { onSuccess } = props
  const [ newFilter, setFilter ] = useState('')
  const [ visible, setVisible ] = useState(false)

  const onChange = (event) => { 
    setFilter(event.target.value)
    getAll()
      .then(countries => {
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        if (filteredCountries.length > 10) {
          setVisible(true)
        } else {
          setVisible(false)
          console.log('filtered countries:', filteredCountries)
          onSuccess(filteredCountries)
        }
      })
  } 

  return (
    <div>
      <div>
        find countries: <input value={newFilter} onChange={onChange} />
      </div>
      <div style={{ color: 'red' , display: visible ? 'block' : 'none'} }>
        Too many matches, specify another filter
      </div>
    </div>
  )
}
