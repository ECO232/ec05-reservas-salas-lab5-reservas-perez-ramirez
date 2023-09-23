const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const { validateUsers } = require('./Esquemas/Usuario');
const { validateRooms } = require('./Esquemas/Cuartos');
const { validateReserve } = require('./Esquemas/Reserva');

let users = [];
let rooms = [];
let reserve = [];


app.post('/users', (req, res) => {
    const { name, lastname, identificacion } = req.body;

    const userValidation = validateUsers({ name, lastname, identificacion });

    if (userValidation.error) {
        return res.status(400).json({
            message: userValidation.error.message
        });
    }

    const newuser = {
        name: req.body.name,
        lastname: req.body.lastname,
        identification: req.body.identification,
    };

    users.push(newuser);
    res.status(201).json({
        message: 'User created successfully',
        user: newuser
    });
});


app.get('/users', (req, res) => {
    res.json({ users });
});


app.post('/rooms', (req, res) => {
    const { name, location } = req.body;

   
    const ValidacionCuarto = validateRooms({ name, location });

    if (ValidacionCuarto.error) {
        return res.status(400).json({
            message: ValidacionCuarto.error.message
        });
    }

    const newCuarto = {
        name: ValidacionCuarto.data.name,
        location: ValidacionCuarto.data.location,
    };

    rooms.push(newCuarto);
    res.status(201).json({
        message: 'Room created successfully',
        room: newCuarto
    });
});


app.get('/Cuartos', (req, res) => {
    res.json({ rooms });
});


app.post('/Reserva', (req, res) => {
    const { CuartoId, startHour, userName, userLastName, userIdentification } = req.body;

   
    const reserveValidation = validateReserve({
        CuartoId, startHour, userName, userLastName, userIdentification
    });

    if (reserveValidation.error) {
        return res.status(400).json({
            message: reserveValidation.error.message
        });
    }

 
    const room = rooms.find((r) => r.id === CuartoId);

    if (!room) {
        return res.status(404).json({ message: 'Room not found' });
    }

    const hourIndex = startHour - 7;

    if (hourIndex < 0 || hourIndex >= room.schedule.length) {
        return res.status(400).json({ message: 'Invalid time' });
    }

    if (!room.schedule[hourIndex]) {
        return res.status(400).json({ message: 'The room is not available at that time' });
    }

    
    room.schedule[hourIndex] = false; 
    const reservation = {
        CuartoId,
        roomName: room.name,
        location: room.location,
        startHour,
        endHour: startHour + 1, 
        userName,
        userLastName,
        userIdentification,
    };

    reserve.push(reservation);

    res.status(201).json({
        message: 'Reservation made successfully',
        reservation
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
