import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Queue } from 'bullmq';
import jsonQueue from './queue';

dotenv.config();

const app = express();
const port = process.env.PORT || "3001";

app.use(express.json());

app.get('/', (req: Request, resp: Response) => {
    resp.json({ ok: true });
});

app.get('/repeatable', async (req: Request, resp: Response) => {
    const jobs = await jsonQueue.getRepeatableJobs();
    resp.json(jobs);
})

app.post('/repeatable', async (req: Request, resp: Response) => {
    await addRepeatable(req.body);
    req.body.created = true;
    resp.json(req.body);
});

app.delete('/repeatable/:jobKey', async (req: Request, resp: Response) => {
    try {
        const res = await jsonQueue.removeRepeatableByKey(req.params.jobKey);
        resp.json(res)
    } catch (error) {
        throw error;
    }

})

app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});

const addRepeatable = async (body: any) => {
    await jsonQueue.add('json', body, {
        repeat: {
            every: 3 * 1000
        },
        jobId: body.jobId
    });
};