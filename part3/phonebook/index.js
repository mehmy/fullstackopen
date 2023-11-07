const express = require('express');
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
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
  {
    id: 5,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info of ${persons.length} people</p>
                <p>${date}</p>`);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const nameExists = (name) => {
  return persons.find((person) => person.name === name);
};

app.post('/api/persons', (request, response) => {
  const id = Math.round(Math.random() * (1000 - 1) + 1);
  const person = { id, ...request.body };

  if (!person.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  } else if (!person.number) {
    console.log(nameExists(person.name));
    return response.status(400).json({
      error: 'number missing',
    });
  } else if (persons.find((persons) => persons.name === person.name)) {
    return response.status(400).json({
      error: 'name exists',
    });
  }

  persons = persons.concat(person);
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
