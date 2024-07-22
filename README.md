## Real Estate Bidding Platform

### Description

This project is a comprehensive real estate bidding platform where users can list their properties for sale, mark their land on a map, and manage bids from potential buyers. Sellers can set a closing time for each property, and admins can approve new property listings and bid results.

## Table of Contents

1. [Project Title and Description](#project-title-and-description)
2. [Table of Contents](#table-of-contents)
3. [Installation Instructions](#installation-instructions)
4. [Language and Tools]
5. [Usage Instructions](#usage-instructions)
6. [Features](#features)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact Information](#contact-information)
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

## Languages and tools
- [React](https://react.dev/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/docs/intro)    
- [MongoDB](https://www.mongodb.com/docs/atlas/)
- [Stripe](https://docs.stripe.com/)

## API Endpoints

### User
- **/user/register**
  - Method: POST
  - Payload: `{name:"", email:"", phone_num: 0, password:""}`

- **/user/sign-in**
  - Method: POST
  - Payload: `{name:"", email:""/phone_num: 0, password:""}`

- **/user/me**
  - Method: GET

- **/user/me**
  - Method: PATCH
  - Payload: `{update data}`

- **/user/me/add-property/${property_id}**
  - Method: PATCH

- **/user/get-all**
  - Method: GET

- **/user/notification/push**
  - Method: PATCH
  - Payload: `{notification: ""}`

- **/user/notification/pop**
  - Method: PATCH
  - Payload: `{notification_id: ""}`

### Seller
- **/seller/register**
  - Method: POST
  - Payload: `{user_id: "", name: ""}`

- **/seller/${seller_id}**
  - Method: GET

- **/seller/${seller_id}**
  - Method: PATCH
  - Payload: `{update data}`

- **/seller/${seller_id}/add-property**
  - Method: PATCH
  - Payload: `{property_id:""}`

- **/seller/:seller_id/remove-property/:property_id**
  - Method: PATCH

### Property
- **/property/**
  - Method: POST
  - Payload: `{name: "", price: 0, description: "", location: "", boundary_points: [], area: "", seller_id: "", createdAt: "", updatedAt: "", minimum_increment: 1000, closing_time: 0, closing_date: Date.now()}`

- **/property/get-all**
  - Method: GET

- **/property/${property_id}**
  - Method: GET

- **/property/${property_id}**
  - Method: PATCH
  - Payload: `{update data}`

- **/property/${property_id}**
  - Method: DELETE

- **/property/set-buyer/${property_id}**
  - Method: PATCH
  - Payload: `{property_id:"", buyer_id: ""}`

- **/property/change-status/${property_id}**
  - Method: PATCH
  - Payload: `{status: ""}`

## Usage Instructions

### User Registration and Authentication

1. **Sign Up**
    - Navigate to the Sign Up page.
    - Fill in your details: name, email, phone number, and password.
    - Submit the form to create your account.

2. **Sign In**
    - Navigate to the Sign In page.
    - Enter your email/phone number and password.
    - Submit the form to log in to your account.

### User Dashboard

- Once signed in, you will be redirected to the user dashboard.
- Here, you can see an overview of your activities, such as active bids, listed properties, and recent notifications.

### Listing a Property (For Sellers)

1. **Add New Property**
    - Go to the 'Add Property' section in the seller dashboard.
    - Fill in the details of your property, such as name, price, description, location, boundary points, area, minimum increment, closing time, and closing date.
    - Submit the form to list your property for sale.

2. **Property Approval**
    - After listing, your property will be in a 'pending' status.
    - An admin will review and approve the property, changing its status to 'approved'.
    - You can then publish the property for bidding.

### Bidding on Properties (For Buyers)

1. **View Properties**
    - Browse through the listed properties on the home page or in the 'Recent Properties' section.
    - Click on a property to view its details.

2. **Place a Bid**
    - Enter your bid amount, which must be higher than the current highest bid by at least the minimum increment.
    - Submit your bid.

3. **Monitor Bids**
    - Keep track of your bids in the 'My Bids' section.
    - You will receive notifications if you are outbid.

### Admin Functions

1. **Approve Properties**
    - Navigate to the admin dashboard.
    - Review the properties listed in the 'pending' status.
    - Approve or reject properties based on your criteria.

2. **Manage Bids**
    - Approve or reject bid results once the bidding time is over.
    - Change the status of properties from 'bidPending' to 'sold'.

### Notifications

- You will receive notifications about important events such as property approvals, new bids, and bid results.
- Check the 'Notifications' section for updates.

### Account Settings

- Go to the 'Settings' section to update your account information, such as your email, phone number, and password.

### Logging Out

- Click on the 'Logout' button to securely sign out of your account.

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

## Contributing

Thank you for your interest in contributing to the Real Estate Bidding Platform! We welcome contributions from the community to help improve this project.

### How to Contribute

1. **Fork the Repository**

    - Go to the project's GitHub page.
    - Click on the 'Fork' button at the top right of the page to create a copy of the repository under your own GitHub account.

2. **Clone the Forked Repository**

    ```bash
    git clone https://github.com/VishnuNanilal/real-estate-project.git
    cd real-estate-project
    ```

3. **Create a New Branch**

    - Create a new branch for your feature or bugfix.

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Changes**

    - Implement your feature or bugfix.
    - Ensure your code follows the project's coding standards and conventions.
    - Write or update tests as necessary.

5. **Commit Your Changes**

    - Commit your changes with a clear and descriptive commit message.

    ```bash
    git add .
    git commit -m "Add detailed description of your changes"
    ```

6. **Push to Your Fork**

    - Push your changes to your forked repository.

    ```bash
    git push origin feature/your-feature-name
    ```

7. **Submit a Pull Request**

    - Go to the original repository on GitHub.
    - Click on 'Pull Requests' and then 'New Pull Request'.
    - Select your branch from the dropdown menu and create the pull request.
    - Provide a detailed description of your changes in the pull request.

### Guidelines

- **Code Style**: Please ensure your code adheres to the project's coding style.
- **Testing**: Write tests for new features and ensure existing tests pass.
- **Commits**: Write clear and concise commit messages.
- **Pull Requests**: Provide a detailed description of your changes and the problem they solve.

We appreciate your contributions and thank you for helping improve the Real Estate Bidding Platform!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact Information

This project is maintained by *VISHNU NANILAL PANICKER*

- phone number: +91 7306365503
- email: vishnunlal@gmail.com
