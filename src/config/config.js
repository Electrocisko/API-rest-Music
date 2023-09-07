import dotenv from 'dotenv';

dotenv.config();

export default {
    app: {
        PORT: process.env.PORT
    },
    database: {
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD
    },
    jwt: {
        SECRET: process.env.SECRET
    }

}


