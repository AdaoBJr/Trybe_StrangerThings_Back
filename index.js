const express = require('express');
const cors = require('cors');

require('dotenv').config();

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

const { UPSIDEDOWN_MODE } = process.env;

const hereIsUpsideDown = UPSIDEDOWN_MODE;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsUpsideDown,
  );

  res.status(200).json(characters);
});

// remember that this next piece of code chooses randomly the port in witch the api is gonna run on

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`); 
});
