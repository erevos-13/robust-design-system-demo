import express, {} from 'express';
import cors from 'cors';
import router from './routes.js';
import db from './db.js';
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
db.connectDB();
export default app;
//# sourceMappingURL=server.js.map