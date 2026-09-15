\# Kamsol Website Modernization



A modern full-stack rebuild of a legacy PHP/MySQL website using React, Node.js, Express and MySQL.



\## Live Demo



\[View the live website](https://kamsol-modern.vercel.app/)



\## About the Project



This project is a modernization of an existing website originally developed with PHP and MySQL.



The goal was to rebuild the frontend using React and develop a Node.js/Express backend while preserving the original website's visual identity and content structure.



The project also provides an admin dashboard for managing website content through CRUD operations.



\## Technologies



\### Frontend

\- React

\- JavaScript

\- Vite

\- HTML5

\- CSS3

\- Bootstrap



\### Backend

\- Node.js

\- Express.js

\- REST API

\- MySQL

\- mysql2



\### Development Tools

\- Git

\- GitHub

\- VS Code



\## Project Structure



```text

kamsol-modern/

├── client/

│   └── React frontend

│

├── server/

│   ├── Express API

│   ├── routes/

│   ├── data/

│   └── config/

│

└── database/

&#x20;   └── database files



\### Features

* Public Website
* Home page
* About page
* Services
* Real Estate Appraisal
* Building Condition Assessments
* Investment Analysis
* Professional Staff
* Careers
* Contact page



\### Admin Dashboard



The project includes an administration interface for managing website content.



Current content management includes:



Staff management

Services management

Home page content

Careers

Contact messages

CRUD operations

Backend API



The frontend communicates with the Node.js/Express backend through REST API endpoints.



Examples include:

/api/services

/api/staff

/api/home-sections

/api/careers

/api/contact

/api/building-taxonomy



\### Database



The backend uses MySQL for storing dynamic website content.



The database includes content such as:



Services

Staff

Home page sections

Careers

Contact messages

Website Modernization



The original website was developed using a traditional PHP/MySQL architecture.



This project modernizes the application by introducing:

Legacy PHP/MySQL

&#x20;       ↓

React Frontend

&#x20;       +

Node.js / Express API

&#x20;       +

MySQL Database

The modernization process focuses on improving the application's structure, component reusability, API integration and maintainability while keeping the original visual design and content direction.



Development

Install frontend



cd client

npm install

npm run dev



Install backend 



cd server

npm install

node index.js



The frontend runs through Vite and the backend provides the REST API.



\### Future Improvements

* Expand the content management system
* Improve authentication and authorization
* Further separate reusable content structures
* Add additional automated testing
* Improve deployment architecture



\### License



This project is intended as a portfolio project.

