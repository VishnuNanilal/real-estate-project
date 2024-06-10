import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import PropertyAddComponent from './PropertyAddComponent'

function Seller() {
  return (
    <main>
      <Tabs>
        <Tab label="Add property"><PropertyAddComponent/></Tab>
      </Tabs>
    </main>
  )
}

export default Seller