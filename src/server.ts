// import express from 'express';
// import payload from 'payload';

// require('dotenv').config();
// const app = express();

// // Redirect root to Admin panel
// app.get('/', (_, res) => {
//   res.redirect('/admin');
// });

// // Initialize Payload
// payload.init({
//   secret: process.env.PAYLOAD_SECRET || '',
//   mongoURL: process.env.MONGODB_URL || '', // using realm for testing.
//   mongoOptions: {
//     user: process.env.MONGODB_USER || '',
//     pass: process.env.MONGODB_PASS || ''
//   },
//   express: app,
//   onInit: () => {
//     payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
//   },
// })

// // Add your own express routes here

// app.listen(3000);
