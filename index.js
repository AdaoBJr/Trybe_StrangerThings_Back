require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { PORT, UPSIDEDOWN_MODE } = process.env;

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = UPSIDEDOWN_MODE === 'true';

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );
  res.status(200).json(characters);
});

const RUNNING = PORT;

app.listen(RUNNING, () => {
  console.log(`process.env.PORT = ${process.env.PORT}`);
  console.log(`Escutando na porta ${RUNNING}`);
});