import axios from 'axios';

const instance = axios.create({
    baseURL:"https://burger-7fcc5.firebaseio.com/"
})

export default instance;