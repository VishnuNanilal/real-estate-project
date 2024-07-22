## Real Estate Bidding Platform

### Description

This project is a comprehensive real estate bidding platform where users can list their properties for sale, mark their land on a map, and manage bids from potential buyers. Sellers can set a closing time for each property, and admins can approve new property listings and bid results.

## Features
1. Authorization and Authentication.
- Registration and Sign in.
- User and Admin authentication.

2. Map display
- Marking and viewing properties
- Differently colors and shades based on property status.

3. Bidding - platform for bidding

4. Admin privileges - Admin authorizes properties before and after bid.

5. Recent Feed - Recently accepted properties displayed on recent feed.
---

## Future Features
1. Different components for:
- Payment option using Sprite which only finalizes when the bidding is done.
- Payment to the platform for flying the bid from both seller and buyer.

## Table of Contents

1. [Project Title and Description](#project-title-and-description)
2. [Table of Contents](#table-of-contents)
3. [Installation Instructions](#installation-instructions)
4. [Usage Instructions](#usage-instructions)
5. [Features](#features)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact Information](#contact-information)

---

## Installation Instructions

### Prerequisites

- Node.js (v12.x or later)
- MongoDB (v4.x or later)
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/VishnuNanilal/real-estate-project.git
   cd real-estate-project

2. Install server and client dependencies

    ```
    cd server
    npm install
    ```
    ```bash
    cd ../client
    npm install

3. Environment variables

    Create a .env file in server directory and add environment variable in the same strucuture as defined in .env.example

4. Run server and client

    ```bash
    cd server
    nodemon index.js
    ```
    ```bash
    cd client
    npm run start


## API Endpoints

### User
- /user/register :
    method : post
    payload: {name:"", email:"", phone_num: 0, password:""}

- /user/sign-in :
    method : post
    payload: {name:"", email:""/phone_num: 0, password:""}

- /user/me :
    method: get

- /user/me :
    method: patch
    payload: update data

- /user/me/add-property/${property_id}`
    method: patch

- /user/get-all
    method: get

- /user/notification/push
    method: patch
    payload: {notification: ""}

- /user/notification/pop
    method: patch
    payload: {notification_id: ""}

### Seller
- /seller/register :
    method: post,
    payload: {user_id: "", name: ""}

- /seller/${seller_id} :
    method: get

- /seller/${seller_id} :
    method: patch
    payload: update data

- /seller/${seller_id}/add-property :
    method: patch,
    payload: {property_id:""}

- /seller/:seller_id/remove-property/:property_id
    method: patch

### Property
- /property/
    method: post
    payload: {
        name: "",
        price: 0,
        description: "",
        location: "",
        boundary_points: [],
        area: "",
        seller_id: "",
        createdAt: "",
        updatedAt: "",
        minimum_increment: 1000,
        closing_time: 0,
        closing_date: Date.now()
    }

- /property/get-all
    method: get

- /property/${property_id}
    method: get

- /property/${property_id}
    method: patch
    payload: update data

- /property/${property_id}
    method: delete

- /property/set-buyer/${property_id}
    method: patch
    payload:  {property_id:"", buyer_id: ""}

- /property/change-status/${property_id}
    method: patch
    payload: {status: ""}

## Features to implement
//BACK END
- [x] seller should be able to create property. Default status: "pending"
- [x] All pending property should be visible by admin for approval. status: pending->approved
- [x] All approved property should be publishable by seller as bid. 
- [x] Once bid time is over, status: approved->bidPending.
- [x] All bidPending property should be approvable by admin: status: bidPending->sold
 
- [x] Include bidder's info in the property. (user_id)
- [x] Include ways to update buyer_id and new price in property,
- [x] components to buy a property
- [x] Dislay the time left in front end
- [x] Implement a time after which bid closes
- [x] Implement admin who can authorize the ownership of a newly added property.
- [x] Implement a client side newly marked property sales.(Recent properties)

- [ ] When time is over the payment should be made and marked land owner info should be changed to bought person. Relevant payments should be carried out.

//FRONT END
- [x] Sign In and Register Modal
- [x] Home page should have :
        left half tabs
        Right hald map
- [x] Left half tabs should have: Recent properties, Add new property, 
- [x] User Dashboard: Displays user-specific information such as active bids, listed properties, etc.
- [x] Seller Dashboard: Specialized dashboard for sellers to manage their properties and see bidding statuses.
- [x] Admin Dashboard: Specialized dashboard for admins to approve new properties, bids, and perform other admin tasks. 
- [x] Notifications: Displays user notifications about bids, property approvals, etc.
- [ ] Settings: Allows users to change account settings.


### Buyer Menu Options
- [x] Dashboard: Overview of user activities, including active bids and won properties.
- [x] My Bids: List of properties the user has placed bids on.

### Status of each bid.
- [ ] Notifications: Alerts and updates about bid statuses and other activities.
- [ ] Profile: View and edit personal information.
- [ ] Settings:Account settings and preferences.
- [x] Logout:Sign out of the account.

### Seller Menu Options
- [x] Dashboard:Overview of seller activities, including listed properties and ongoing bids.
- [x] My Properties:List of properties the seller has listed.
- [x] Add Property:Form to create and submit a new property listing.
- [ ] Notifications:Alerts about bids and property approvals.
- [ ] Profile:View and edit personal information.
- [ ] Settings:Account settings and preferences.
- [ ] Logout:Sign out of the account.

### Admin Menu Options
- [x] Admin Dashboard:Overview of platform activities, pending approvals, and user statistics.
- [x] Options to approve or reject new property listings.
- [x] Approve Bids:List of bid results awaiting approval.Options to approve or reject bid results.
- [x] Manage Users:View and manage user accounts.Options to deactivate or delete users.
- [ ] Reports/Analytics:Access to various reports and analytics about platform usage.
- [ ] Settings:Admin-specific settings and preferences.
- [x] Logout:Sign out of the admin account.

### Additional Menu Options
- [x] Support/Help:FAQs and contact options for customer support.
- [x] About Us:Information about the platform and the team.
- [x] Terms of Service:Legal information and terms of use.
- [x] Privacy Policy:Information about data privacy and user rights.
