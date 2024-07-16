const dotenv = require("dotenv");
const file = './.env'

dotenv.config({ path: file })

const PORT = process.env.PORT;
const FINHUB_API_KEY = process.env.FINHUB_API_KEY;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

const checkConfig = () => {
    if (!PORT) {
        console.error("PORT is not defined in the .env file")
        process.exit(1)
    }
    if (!FINHUB_API_KEY) {
        console.error("FINHUB_API_KEY is not defined in the .env file")
        process.exit(1)
    }
    if (!CLIENT_ID) {
        console.error("CLIENT_ID is not defined in the .env file")
        process.exit(1)
    }
    if (!CLIENT_SECRET) {
        console.error("CLIENT_SECRET is not defined in the .env file")
        process.exit(1)
    }
    if (!CALLBACK_URL) {
        console.error("CALLBACK_URL is not defined in the .env file")
        process.exit(1)
    }
    if (!SESSION_SECRET) {
        console.error("SESSION_SECRET is not defined in the .env file")
        process.exit(1)
    }
    if (!FRONTEND_URL) {
        console.error("FRONTEND_URL is not defined in the .env file")
        process.exit(1)
    }
    if (!DB_HOST) {
        console.error("DB_HOST is not defined in the .env file")
        process.exit(1)
    }
    if (!DB_USER) {
        console.error("DB_USER is not defined in the .env file")
        process.exit(1)
    }
    if (!DB_PASSWORD) {
        console.error("DB_PASSWORD is not defined in the .env file")
        process.exit(1)
    }
    if (!DB_NAME) {
        console.error("DB_NAME is not defined in the .env file")
        process.exit(1)
    }
    if (!DB_PORT) {
        console.error("DB_PORT is not defined in the .env file")
        process.exit(1)
    }
    if (!BEARER_TOKEN) {
        console.error("BEARER_TOKEN is not defined in the .env file")
        process.exit(1)
    }
}

module.exports = {
    PORT: PORT,
    FINHUB_API_KEY: FINHUB_API_KEY,
    CLIENT_ID: CLIENT_ID,
    CLIENT_SECRET: CLIENT_SECRET,
    CALLBACK_URL: CALLBACK_URL,
    SESSION_SECRET: SESSION_SECRET,
    FRONTEND_URL: FRONTEND_URL,
    DB_HOST: DB_HOST,
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD,
    DB_NAME: DB_NAME,
    DB_PORT: DB_PORT,
    BEARER_TOKEN: BEARER_TOKEN,
    checkConfig
}