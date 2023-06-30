import express from 'express';
import productsRoute from './routes/productsRoute';
import ordersRoute from './routes/ordersRoute';
// import loginRoute from './routes/loginRoute';

const app = express();

app.use(express.json());

app.use(productsRoute);
app.use(ordersRoute);
// app.use(loginRoute);

export default app;
