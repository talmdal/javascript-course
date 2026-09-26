export const Countries = ({ countries, onSelect }) => {
  if (countries.length === 0) {
    return <div>No countries found</div>
  }
  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}&nbsp;
          <button onClick={() => onSelect(country)}>Show</button>
        </div>
      ))}
    </div>
  )
}