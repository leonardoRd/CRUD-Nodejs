import express from "express"
import morgan from 'morgan'
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import invoiceRoutes from "./routes/invoices.routes.js";
import productosRoutes from "./routes/productos.routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api',authRoutes);
app.use('/api',taskRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', productosRoutes)

export default app;