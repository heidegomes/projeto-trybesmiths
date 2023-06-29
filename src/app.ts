import express from 'express';
import productsRoute from './routes/productsRoute';
import ordersRoute from './routes/ordersRoute';

const app = express();

app.use(express.json());

app.use(productsRoute);
app.use(ordersRoute);

export default app;
