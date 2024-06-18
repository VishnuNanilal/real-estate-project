import React, { useEffect, useState } from 'react'

export default function Location() {
  const [placeInput, setPlaceInput] = useState("");
  const [result, setResult] = useState([])

  function handleLocationSubmit(e) {
    e.preventDefault()
    console.log("Input sent for ", placeInput)
  }

  function handleLocationClick(e, location) {
    console.log(">>>", location.lat, location.lon)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${placeInput}`);
      const data = await response.json();
      setResult(data);
    }

    fetchData()
  }, [placeInput])

  console.log("Search result: ", result)

  return (
    <div className='location-header'>
      <form onSubmit={handleLocationSubmit}>
        <input onChange={(e) => setPlaceInput(e.target.value)} value={placeInput} />
        <button className='button-custom'>Search</button>
      </form>
      {
        result.length>0
        &&
        <div className='search-results-div'>
          {
            result.map(location => <div
              style={{ color: "black" }}
              onClick={(e) => handleLocationClick(e, location)}
            >{location.name}</div>)
          }
        </div>
      }
    </div>
  )
}