import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import PropertyByStatusContainer from './PropertyByStatusContainer'

function Admin() {
  return (
    <main >
      <Tabs>
        <Tab label="Requests"><PropertyByStatusContainer /></Tab>
      </Tabs>
    </main>
  )
}

export default Admin