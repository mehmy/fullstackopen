require('dotenv').config();
const express = require('express');
const Person = require('./models/person');

const app = express();

const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.static('dist'));

app.use(express.json());

morgan.token('data', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  const date = new Date();
  Person.find({}).then((result) => {
    response.send(
      `<div>
        <p>Phonebook has info for ${result.length} people</p>
      </div>
      <div>
        <p>${date}</p>
      </div>`
    );
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      if (person) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const person = { ...request.body };
  console.log(person);

  if (!person.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  } else if (!person.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  } else {
    const personDoc = new Person({
      name: person.name,
      number: person.number,
    });

    personDoc
      .save()
      .then((result) => {
        console.log('success');
        response.json(result);
      })
      .catch((error) => next(error));
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
