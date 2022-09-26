import express from 'express';
import router from './db/routes/index.js';
import 'dotenv/config';

const api = express();
api.use(express.json());
api.use('/', router);

const PORT = process.env.PORT || 3001;
api.listen(PORT, () => console.log(`API on port ${PORT}`));
