import React, { useState } from 'react'

export default function Location() {
const [placeInput, setPlaceInput] = useState("");

function handleInput(e){
  setPlaceInput(e.target.value)
}

function handleLocationChange(e){
  e.preventDefault()
  console.log("Input sent for ",placeInput)
}

  return (
    <div className='location-header'>
        <form onSubmit={handleLocationChange}>
            <input onChange={handleInput} value={placeInput}/>
            <button className='button-custom'>Search</button>
        </form>
    </div>
  )
}