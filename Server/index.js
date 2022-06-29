import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//User routes
import userRoutes from './routes/users.js';
import patientRoutes from './routes/patients.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

//Starting route for every user
app.use('/users', userRoutes);

//Starting route for every patient
app.use('/patients', patientRoutes);

app.use('/', (req, res) => {
    res.json({ message: 'Server is running '});
})

const PORT = 5000;

const CONNECTION_URL = `mongodb+srv://ekansh:1234@cluster0.rsm6p.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server is connected to the database and running on port ${PORT}`)))
.catch((err) => console.log(err));

