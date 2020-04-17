import axios from 'axios';
axios.defaults.baseURL = "https://localhost:8080";

const instance = axios.create();