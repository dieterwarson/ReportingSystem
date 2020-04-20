// IMPORT AXIOS
import axios from 'axios';

export default () => {
    return axios.create({
        url:'http://127.0.0.1:3000/'
    })
}
