import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../config/config.js';

const SECRET = config.jwt.SECRET;

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30,"days").unix()
    }
    return jwt.encode(payload,SECRET);
}

const decodeToken = (token) => {
    const data = jwt.decode(token, SECRET) ;
    return data;
}


export  default  {
    createToken,
    decodeToken
}  