const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { UPSIDEDOWN_MODE, PORT } = process.env;

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

  console.log(new Date().toISOString());

  res.status(200).json(characters);
});

const RUNNING = PORT || 3000;

app.listen(RUNNING, () => {
  console.log(`Escutando na porta ${RUNNING}`);
});