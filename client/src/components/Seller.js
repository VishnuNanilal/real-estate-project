import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import PropertyAddComponent from './PropertyAddComponent'
import { useSelector } from 'react-redux'
import PropertyComp from './PropertyComp'

function Seller() {
  return (
    <main>
      <Tabs>
        <Tab label="Add property"><PropertyAddComponent/></Tab>
        <Tab label="Placed Properties"><BidProps /></Tab>
      </Tabs>
    </main>
  )
  }
  
  const BidProps = ()=>{
    const properties = useSelector(state=>state.properties)
    const user = useSelector(state=>state.user)

  return (properties.filter(property=>property.seller_id===user.seller_id._id).map(property=><PropertyComp property={property} />))
}

export default Seller