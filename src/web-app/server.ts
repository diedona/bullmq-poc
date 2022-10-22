import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || "3001";

app.get('/', (req: Request, resp: Response) => {
    resp.json({ ok: true });
});

app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});