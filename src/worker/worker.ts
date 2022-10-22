import { Worker, Job } from 'bullmq';
import connection from '../shared/redis-connection';

const worker = new Worker('json', async (job: Job) => {
    console.log(`hey i woke up... (${job.id})`);
    console.log(`ok returning to slumber `);
    console.log();
}, { connection: connection });

console.log('Worker listening...\n');