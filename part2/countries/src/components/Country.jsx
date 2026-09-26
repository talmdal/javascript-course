export const Country = (props) => {
    const { country } = props
    console.log("Display single country", country)
    return (
      <>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          width="200"
        />
      </>
    )
}