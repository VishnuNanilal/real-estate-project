import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLocation } from '../redux/mapLocation.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'
export default function Location() {
  const [placeInput, setPlaceInput] = useState("");
  const [result, setResult] = useState([])
  const dispatch = useDispatch()

  const getLocationFromInput = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${placeInput}`);
    return await response.json();
  }

  useEffect(() => {
    async function fetchData() {
      const locations = await getLocationFromInput()
      setResult(locations);
    }

    fetchData()
  }, [placeInput])

  async function handleLocationSubmit(e) {
    e.preventDefault()
  
    const locations = await getLocationFromInput()
    const coords = { lat: locations[0].lat, lon: locations[0].lon }
    dispatch(setLocation(coords));
  }

  function handleLocationClick(e, location) {
    console.log("New location coordinates: ", location.lat, location.lon)
    const coords = { lat: location.lat, lon: location.lon }
    dispatch(setLocation(coords));
  }

  // console.log("Search result: ", result)

  return (
    <div className='location-header'>
      <form onSubmit={handleLocationSubmit}>
        <div className='location-header-input-cont'>
          <input onChange={(e) => setPlaceInput(e.target.value)} value={placeInput} />
          {
            result.length > 0 && <FontAwesomeIcon className='close-icon' icon={faX} onClick={()=>setPlaceInput("")}/>
          }
        </div>
        <button className='button-custom' disabled={result.length===0}>Search</button>
        {
          result.length > 0
          &&
          <div className='search-results-div'>
            {
              result.map(location => <div
                style={{ color: "black", cursor: "pointer" }}
                onClick={(e) => handleLocationClick(e, location)}
              >{location.name}</div>)
            }
          </div>
        }
      </form>
    </div>
  )
}