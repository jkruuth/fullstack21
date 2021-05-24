import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const LessEqThan10 = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map(country => 
        <p key={country.name}>
          {country.name} <button onClick={() => handleClick(country.name.toLowerCase())}>show</button>
        </p>)}
    </div>
  )
}


const YksiMaa = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => 
        <li key={language.name}>
          {language.name}
        </li>)}
      </ul>

      <img src={country.flag} alt='maan lippu' style={{ width: '150px', height: '100px' }} />

      <Saa country={country} />
    </div>
  )
}


const HaeInformaatio = ({ countries, handleClick }) => {
  if (countries.length === 1) return <YksiMaa country={countries[0]} />

  if (countries.length <= 10) return <LessEqThan10 countries={countries} handleClick={handleClick} />

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}


const Saa = ({ country }) => {
  const [ saa, setSaa ] = useState({})
  useEffect(() => {
    axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name.toLowerCase()}&units=m`)
        .then(response => {
          setSaa(response.data.current)
        })
  }, [country])


  console.log(saa)
  if(!saa) return <div>Try again later</div> 

  return (
    <div>
      

      <p><strong>temperature:</strong> {saa.temperature} </p>
      <img src={saa.weather_icons} alt='Saakuva' style={{width: '50px', height: '50px' }}/>
      <p><strong>wind:</strong> {saa.wind_speed} mph <strong>direction:</strong> {saa.wind_dir}</p>
    </div>
  )
}


const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ haku, setHaku] = useState('')


  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])


  const naytaTietty = (country) => {
    setHaku(country)
  }


  return (
    <div>
      <form>
      find countries <input value={haku} 
                            onChange={event => setHaku(event.target.value)}/>
      </form>
        
       <HaeInformaatio countries={countries.filter(country =>
        country.name.toLowerCase().includes(haku) || haku === '')} handleClick={naytaTietty}/>
    </div>
  );
}

export default App;
