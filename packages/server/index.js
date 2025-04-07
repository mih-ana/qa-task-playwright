const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

let chargePoints = [];

app.get('/charge-point', (_req, res) => {
  res.send(chargePoints);
});

app.post('/charge-point', (req, res) => {
  const chargePoint = { id: v4(), ...req.body };
  chargePoints.push(chargePoint);
  res.status(201).json(chargePoint);
});

app.delete('/charge-point/:id', (req, res) => {
  chargePoints = chargePoints.filter(
    (chargePoint) => chargePoint.id !== req.params.id
  );
  res.status(204).json(null);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
