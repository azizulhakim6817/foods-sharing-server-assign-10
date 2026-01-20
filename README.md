## Node.js + Express.js----------

# Client side vercel deploy-----------------------------

2. https://foods-sharing-client-assign-10.vercel.app/

# Server side vercel deploy ----------------------------------

--- https://foods-sharing-server-assign-10.vercel.app/get-foods

### 🎬 Food Share – Community Food Sharing

Project Explanation Script

## 1️⃣ Introduction

Hello,
My name is [আপনার নাম], and today I am presenting my full-stack MERN project named PlateShare – Community Food Sharing Platform.

PlateShare is a web-based platform where people can donate their surplus food and others can request and collect it. The main goal of this project is to reduce food waste and help the community.

This project is built using the MERN Stack:

Frontend: React

Backend: Node.js & Express

Database: MongoDB

Authentication: Firebase

## 2️⃣ Project Theme

The main theme of PlateShare is:

“Share food, reduce waste, and support your community.”

Users can:

Add food for donation

Browse available foods

Request food from others

Manage their own donated food

Track their food requests

## 3️⃣ Layout Overview

This website has a main layout that includes:

A Navbar

A Footer

🔹 Navbar (Not Logged In User)

When the user is not logged in, they can see:

Website Logo & Name

Home

Available Foods

Login Button

🔹 Navbar (Logged In User)

When the user is logged in, they can see:

Website Logo & Name

Home

Available Foods

Add Food (Private Route)

Manage My Foods (Private Route)

My Food Requests (Private Route)

Profile Image Dropdown

Logout Button

🔹 Footer

The footer includes:

Website Logo & Name

Copyright

Social Media Links

## 4️⃣ Home Page Features

🔹 Banner Section

At the top, there is a banner with:

A project title

Short description

A "Search Food" or "View All Foods" button

🔹 Featured Foods Section

This section dynamically loads 6 food items from the database.

It sorts foods based on highest quantity

Each food card includes a View Details button

🔹 Show All Button

Below the featured foods, there is a Show All button that navigates to the Available Foods page.

🔹 Extra Static Sections

There are two static sections:

How It Works (Post Food, Find Food, Collect Food)

Our Mission / Community Stats

## 5️⃣ Authentication System

This project uses Firebase Authentication.

🔹 Registration Page

Users can register using:

Name

Email

Photo URL

Password

Password Rules:

Must have one uppercase letter

Must have one lowercase letter

Minimum 6 characters

Users can also login with Google.

Success and error messages are shown using toast notifications, not default alerts.

🔹 Login Page

Users can login using:

Email

Password

Google Login

After login, users are redirected to:

Their previous private route OR

The Home page

## 6️⃣ Food Management (CRUD Operations)

All food data is stored in MongoDB Database.

🔹 Add Food (Create – Private Route)

Only logged-in users can access this page.

The form includes:

Food Name

Food Image (Uploaded using imgbb)

Food Quantity

Pickup Location

Expire Date

Additional Notes

Donator info is automatically filled from Firebase user:

Name

Email

Profile Image

Default food status is set to "Available"

After submission, data is saved in MongoDB and a success toast is shown.

🔹 Available Foods (Read – Public Route)

This page shows:

All foods where status is Available

Displayed in a card grid layout

Each card includes:

Food Image

Food Name

Donator Info

Quantity

Location

Expire Date

View Details button

If a user is not logged in and clicks View Details, they are redirected to Login.

🔹 Food Details Page (Private Route)

Route:
/food/:id

This page shows:

Full food details

Donator information

Additional notes

There is a Request Food button to request the food item.

🔹 Manage My Foods (Update & Delete)

This page shows only the foods added by the logged-in user.

Users can:

Update food using a modal or update page

Delete food with a confirmation popup

## 7️⃣ Extra Features

🔹 Loading Spinner

A loader is shown while data is being fetched.

🔹 Error Page

A custom 404 page with:

Image or GIF

Back to Home button

## 8️⃣ Hosting & Deployment

Client Side hosted on: Netlify / Firebase / Surge

Server Side hosted on: Vercel

Firebase domain authorization is configured

Private routes stay logged in even after page reload
