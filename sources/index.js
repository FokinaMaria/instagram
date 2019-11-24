import Axios from 'axios';

const getUsers = () => Axios.get('/images'); //получает данные с сервера
export { getUsers };
