import React, { useEffect, useState } from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import PropertyByStatusContainer from './PropertyByStatusContainer'
import { getAllUsers, getUserAPI } from '../api/user.api'

function Admin() {
  return (
    <div className='main-center' >
      <Tabs>
        <Tab label="Requests"><PropertyByStatusContainer /></Tab>
        <Tab label="User management"><UserManagement /></Tab>
      </Tabs>
    </div>
  )
}

function UserManagement() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      let response = await getAllUsers()
      if (response.success) {
        setUsers(response.data)
      }
      console.log(response.message)
    }
    fetchData()
  }, [])

  return (
    <>
    {
      users.map(user=><UserComp user={user} />)
    }
    </>
  )
}

function UserComp({ user }) {
  return (
        <div className='card-component'>
          <h3 className='name'>{user.name}</h3>
          {
            user.seller_id && <h4>{user.seller_id.name}</h4>
          }
          <div className='hori'>
            <div className='price'>{user.email}</div>
            <div className='area'>{user.phone_num}</div>
          </div>
        </div>
  )
}

export default Admin