# NZPMCP1

## Description

The program emulates a mini-regisration and examination platform which allows for a simple regisration system, viewing, and administration work.

## Setting Up

Before we start, note that the application requires the use of ```.env``` file in their root directory. More specifically, it requires to have the following environment variables: ```FRONTEND_URL```, ```VITE_BACKEND_URL```, ```JWT_ALGORITHM```, ```JWT_EXPIRATION```, ```JWT_SECRET_KEY```, ```MONGODB_DATABASE```, and ```MONGODB_URI```.

In order to use the application locally, you must first go to frontend and run ```npm install``` and ```npm run build``` then, simply run ```./gradlew bootRun``` for the backend. On default, the application must be on ```localhost:8080```.

## Usage

### Backend

The backend now uses Spring Boot.

It uses JWT tokens for authentication. 


### Frontend

Uses Mantine 

#### Landing Page

The landing page has two phases, logged-on and logged-off. When logged off, we are greeted to NZPMC, here we can access 'Create Account' which redirects you to the ```/signup``` page or 'Log In' which redirects you to the ```/login``` page. Scrolling down shows us the upcoming events but you will not be able to join until you sign-up and log-in.

Attempting to go to ```/admin``` will lead to redirection back to landing.

#### Login and Signup Page

Both pages contains a link that transfer people to the other. After signing up, a user will be sent to the login page to login first. Then after logging in will be sent to the landing page's logged-on phase. 

#### Logged In Pages

Accessible pages differ based on the user's role.

Admin psges includes the builder page for creating competitions, competition and questions list pages, and reports page. Users list page is also accessible this way.

For all other users, for now, only events list page and settings page are available.

## Live Competition Page

From the events list, joined events and should be active ones can lead you to this page. This is where the competition is accessed. In the event that the user disconnects, if not submitted and event is still active, the user may continue their attempt.

## Extras

The application uses Mantine and Parallax for its design.





