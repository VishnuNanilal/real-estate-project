import React from 'react'
import { useSelector } from 'react-redux'

function PropertyAddComponent({formData, setFormData, handleMarkProperty, handleSaveProperty, handlePolyReset}) {
    const user = useSelector(state => state.user)

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    return (
        <div>
            {
                user.seller_id &&
                <form onSubmit={(e) => e.preventDefault()}>
                    <label for='name'>Name:
                        <input id="name" type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} required="true"/>
                    </label>
                    <label for='price'>Price:
                        <input id="price" type='number' name='price' placeholder='Price' value={formData.price} onChange={handleChange} required="true"/>
                    </label>
                    <label for='description'>Description:
                        <input id="description" type='text' name='description' placeholder='Description' value={formData.description} onChange={handleChange}/>
                    </label>
                    <label for='location'>Location:
                        <input id="location" type='text' name='location' placeholder='Location' value={formData.location} onChange={handleChange} required="true"/>
                    </label>
                    <label for='area'>Area:
                        <input id="area" type='number' name='area' placeholder='Area' value={formData.area} onChange={handleChange} required="true"/>
                    </label>
                    <label for='minimum_increment'>Minimum Increment:
                        <input id="minimum_increment" type='number' name='minimum_increment' placeholder='Minimum Increment' value={formData.minimum_increment} onChange={handleChange} required="true"/>
                    </label>
                    <label for='closing_time'>Closing Time:
                        <input id="closing_time" type='time' name='closing_time' placeholder='Closing time' value={formData.closing_time} onChange={handleChange} required="true"/>
                    </label>
                    <label for='closing_date'>Closing Date
                        <input id="closing_date" type='date' name='closing_date' placeholder='Closing date' value={formData.closing_date} onChange={handleChange} required="true"/>
                    </label>
                    <button onClick={handleMarkProperty}>MARK PROPERTY</button>
                    <button type='submit' onClick={handleSaveProperty}>SAVE PROPERTY</button>
                </form>
            }
        </div>
    )
}

export default PropertyAddComponent