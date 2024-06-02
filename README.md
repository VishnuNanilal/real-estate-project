## Real Estate Bidding Platform

### Description

This project is a comprehensive real estate bidding platform where users can list their properties for sale, mark their land on a map, and manage bids from potential buyers. Sellers can set a closing time for each property, and admins can approve new property listings and bid results.

## Features
1. Authorization and Authentication.
- Registration and Sign in, user Auth.
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
- Sign in, Register
- User
- Admin
- Home

2. Clean up front end using CSS.

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

Features to implement

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

- [ ] When time is over the payment should be made and marked land owner info should be changed to bought person

## API Endpoints

- /user/register
- /user/sign-in
- user/me 

- /seller/register
- /seller/${seller_id}
- /seller/${seller_id}/add-property
- /seller/:seller_id/remove-property/:property_id

- /property/
- /property/get-all
- /property/${property_id}
- /property/set-buyer/${property_id}
- /property/change-status/${property_id}