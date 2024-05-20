import React from 'react'
import { useParams } from 'react-router-dom'

function Bidder() {
    const { property_id } = useParams()
    return (
        <div>
            Bidder
            {
                `Property id ${property_id} received`
            }
        </div>
    )
}

export default Bidder