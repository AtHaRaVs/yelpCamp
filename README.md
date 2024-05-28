# Yelp Camp

Welcome to the Yelp Camp repository! This project is a full-stack web application where users can view, create, and review campgrounds. The application is built with Node.js, Express, MongoDB, and Bootstrap.

![image](https://github.com/AtHaRaVs/yelpCamp/assets/99896281/c875953e-f4d1-4ea5-b19c-f808a474bd5a)

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization with Passport.js
- Full CRUD functionality for campgrounds and reviews
- Data validation using Joi
- Image upload and storage using Multer and Cloudinary
- Map integration using Mapbox
- Flash messages using connect-flash
- Session management with express-session and connect-mongo
- Data sanitization using Express Mongoose Sanitize and sanitize-html
- Enhanced security with Helmet

![image](https://github.com/AtHaRaVs/yelpCamp/assets/99896281/5f9ec130-6e08-43ab-aeb2-a609572795fd)
![image](https://github.com/AtHaRaVs/yelpCamp/assets/99896281/7be6a4c1-1e5b-4de1-b15a-c2c97fd2e113)
![image](https://github.com/AtHaRaVs/yelpCamp/assets/99896281/10fcb239-6783-44b1-95f1-9a94208ace48)
![image](https://github.com/AtHaRaVs/yelpCamp/assets/99896281/25c88300-ec74-42ce-8d16-f05bd39eebf2)

## Demo
You can check out a live demo of the application [here](https://yelpcamp-i6lq.onrender.com).

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/yelp-camp.git
    cd yelp-camp
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:
    ```
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_KEY=your_cloud_key
    CLOUDINARY_SECRET=your_cloud_secret
    MAPBOX_TOKEN=your_mapbox_token
    DATABASE_URL=mongodb://localhost:27017/yelp-camp
    ```

4. Start the application:
    ```sh
    node app.js
    ```

5. Open your browser and go to `http://localhost:3000`

## Usage
- Browse campgrounds and read reviews.
- Sign up or log in to create, edit, or delete your own campgrounds and reviews.
- Upload images for campgrounds.
- View campgrounds on an interactive map.

## Technologies Used
### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Express-session**: Session management
- **Passport**: Authentication middleware
- **Passport-local**: Local authentication strategy
- **Passport-local-mongoose**: Simplifies passport-local integration with Mongoose
- **Method-override**: HTTP method override
- **Connect-flash**: Flash messages
- **Multer**: Multipart data handling
- **Cloudinary**: Cloud image storage
- **Dotenv**: Environment variables
- **Multer-storage-cloudinary**: Multer storage engine for Cloudinary
- **Mapbox-sdk**: Mapbox services
- **Express Mongoose Sanitize**: Data sanitization
- **Sanitize-html**: HTML sanitization
- **Helmet**: Security middleware
- **Connect-mongo**: MongoDB session store
- **Morgan**: HTTP request logger
- **Custom Error Classes**: Error handling
- **Joi**: Data validation

### Frontend
- **EJS**: Embedded JavaScript templates
- **Bootstrap**: CSS framework
- **ejs-mate**: Layouts and partials for EJS
- **Starability.css**: Star rating styles
- **Mapbox GL JS**: Interactive maps
