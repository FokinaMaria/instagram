import Axios from 'axios';

//получает данные с сервера для отрисовки галереи
const getUsers = () => Axios.get('/images');
//Получение данных о картике
const getImages = () => Axios.get('/images');
//проверка занный пользователя при входе
const postSignin = user => Axios.post('/user', user);
//отправка данных при регистрации
const putSignup = user => Axios.put('/user', user);
export { getUsers, getImages, postSignin, putSignup };
