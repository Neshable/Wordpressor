import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS
require("./css/homepage.css");

// Import the router
import router from './routes'


ReactDOM.render(router, document.getElementById('app'));