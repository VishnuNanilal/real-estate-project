import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import PropertyAddComponent from './PropertyAddComponent'
import { useSelector } from 'react-redux'
import PropertyComp from './PropertyComp'

function Seller() {
  return (
    <div className='main-center'>
      <h2 className='section-title'>Seller</h2>
      <Tabs>
        <Tab label="Add property"><PropertyAddComponent /></Tab>
        <Tab label="Placed Properties"><BidProps /></Tab>
        <Tab label="Notifications"><Notifications/></Tab>
      </Tabs>
    </div>
  )
}

const BidProps = () => {
  const properties = useSelector(state => state.properties)
  const user = useSelector(state => state.user)

  const own_properties = properties.filter(property => property.seller_id === user.seller_id._id)
  return (own_properties.length===0
    ?
    <div>No properties</div>
    :
    own_properties.map(property => <PropertyComp property={property} />))
}

const Notifications = () => {
  const user = useSelector(state => state.user)
  console.log("Notifications: ", user.notifications)
  return(
    <div>
      {
        user.notifications.length === 0
        ?
        <div>No notifications</div>
        :
        user.notifications.map((notification, ind)=><div key={ind} className='card-component notification-card' style={{padding: "2rem", cursor: "revert"}}>
          {ind+1}. { notification.text}
          </div>)
      }
    </div>
  )
}

export default Seller