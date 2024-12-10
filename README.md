# NZPMCP1

## Description

The program emulates a mini-regisration platform which allows for a simple regisration system, viewing, and administration work.

## Setting Up

In order to use the development of NZPMCP1, simply run ```npm run dev``` for both frontend and backend. On default, the backend must be on ```localhost:3001``` and frontend will be in ```localhost:5173```. 

Both frontend and backend requires the use of ```.env``` file in their root directory. For the frontend, it requires to have ```VITE_ADMIN_ID```, and ```VITE_ADMIN_PW```, refering to the specific 'email' and 'password' that you can use in order to gain admin access into the admin page. In the case of the backend, it requires you to have ```MONGODB_URI```, refering to the password to access a mongodb database on the cloud.

## Usage

### Backend

Once you have access to the backend and frontend files, within their ```services/``` folder, you may notice that both contain ```user.services```, ```event.services```, and ```attendee.services```. 

```user.services``` specifically does the regular CRUD actions ( get all, get, update, create, delete ) for users. This also manages authentication when someone attempts to login. ```event.services``` unsurprisingly does the regular CRUD actions for events. ```attendee.services``` on the other handles operations that requires both events and users. This includes the action of a user joining an event. This also includes obtaining every event a user joined into, and every user that joined an event.

These information regarding Events and Users have been stored within mongodb  arrays for a more direct compilation of it. 

### Frontend

There are four pages for this application, the landing, admin, sign-up, and log-in page. You most likely will first see the landing page. It has been set up such that if you are to try to access an address outside of these given ones, you will be sent to the landing page.

#### Landing Page

The landing page has two phases, logged-on and logged-off. When logged off, we are greeted to NZPMC, here we can access 'Create Account' which redirects you to the ```/signup``` page or 'Log In' which redirects you to the ```/login``` page. Scrolling down shows us the upcoming events but you will not be able to join until you sign-up and log-in.

When logged in, the user can start joining events. Here, the user has the ability to log out or edit their name and email. When the user opts to edit their info, the button temporarily changes to save or cancel.

Attempting to go to ```/admin``` will lead to redirection back to landing.

#### Login and Signup Page

Both pages contains a link that transfer people to the other. After signing up, a user will be sent to the login page to login first. Then after logging in will be sent to the landing page's logged-on phase. 

#### Admin Page

The admin page resembles the logged-on phase of the landing page. Attempting to go to landing page would lead to redirection back to admin.

## Extras

#### React Context API

For this project I used react context API to keep track of data throughout the webapp. This is to minimize the server call to obtain data from the backend.

#### Mantine

I used mantine, a react component library which made it easier to make consistent and 'modern' experience to the webapp.

#### React Spring - Parallax

I used a small amount of Parallax to add a little bit more of 'modern' touch to the webapp's landing page.

#### Cookies

I used a simple implementation of cookies to store email and password to keep people logged-in through-out the session.

---
I like design mayhaps




