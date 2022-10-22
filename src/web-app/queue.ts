import { Queue } from "bullmq";
import connection from "../shared/redis-connection";

const jsonQueue = new Queue("json", {connection});
export default jsonQueue;