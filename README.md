# Kamsol Website Modernization



A full-stack modernization of a website that I originally designed and developed using PHP and MySQL.



After several years, I decided to rebuild the project using a modern JavaScript-based stack, including React, Node.js, Express and MySQL.







### Live Demo



https://kamsol-modern.vercel.app/



### About the Project



Kamsol is a real-world website that I originally developed using PHP, MySQL, HTML, CSS, JavaScript and Bootstrap.



This repository contains the modernized version of that project.



Rather than creating a new website from scratch, I used my original project as the foundation and rebuilt its frontend and backend using a modern application architecture.



The goal was to rebuild the frontend using React and develop a Node.js/Express backend while preserving the original website's visual identity and content structure.



The project also provides an admin dashboard for managing website content through CRUD operations.



### Technologies



#### Frontend

\- React

\- JavaScript

\- Vite

\- HTML5

\- CSS3

\- Bootstrap



#### Backend

\- Node.js

\- Express.js

\- REST API

\- MySQL

\- mysql2



#### Development Tools

\- Git

\- GitHub

\- VS Code



#### Project Structure



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

       └── database files

```





**Features**
---



**Admin Dashboard**

The project includes an administration interface for managing website content.


Current content management includes:



* Staff management
* Services management
* Home page content
* Careers
* Contact messages
* CRUD operations
* Backend API




The frontend communicates with the Node.js/Express backend through REST API endpoints.



Examples include:

* /api/services
* /api/staff
* /api/home-sections
* /api/careers
* /api/contact
* /api/building-taxonomy




**Database**



The backend uses MySQL for storing dynamic website content.



The database includes content such as:



Services

Staff

Home page sections

Careers

Contact messages

Website Modernization
---


The modernization includes:



\- Rebuilding the frontend with React

\- Developing a REST API with Node.js and Express

\- Integrating MySQL for dynamic content

\- Creating reusable React components

\- Implementing CRUD operations

\- Developing an administration interface

\- Connecting frontend components to backend APIs

\- Preserving the original visual identity and content structure



This project modernizes the application by introducing:

Legacy PHP/MySQL

React Frontend

Node.js / Express API

MySQL Database

The modernization process focuses on improving the application's structure, component reusability, API integration and maintainability while keeping the original visual design and content direction.
This project also reflects my transition from traditional PHP-based web development toward modern JavaScript and full-stack development.


Development

Install frontend


```text
cd client

npm install

npm run dev

```

Install backend 


```text
cd server

npm install

node index.js

```

The frontend runs through Vite and the backend provides the REST API.


Future Improvements
---



* Expand the content management system
* Improve authentication and authorization
* Further separate reusable content structures
* Add additional automated testing
* Improve deployment architecture



**License**

This project is intended as a portfolio project.


