import dotenv from 'dotenv'
import IORedis from 'ioredis';

dotenv.config();

if (!process.env.REDIS_PORT)
    throw new Error("No Redis PORT Configuraterd");

if (!process.env.REDIS_HOST)
    throw new Error("No Redis HOST Configuraterd");

const redisPort = +process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;

const connection = new IORedis(redisPort, redisHost);
connection.options.maxRetriesPerRequest = null;

export default connection;