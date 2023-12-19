const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-1234560'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '040-39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]

app.get('/persons', (req, res) => {
  return res.json(persons)
})

app.get('/info', (req, res) => {
  return res.end(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id) 
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/persons', (req, res) => {
  const person = req.body
  if (!person.name){
    return res.status(400).json({error: "name cannot be missing"})
  }
  if (persons.find(i => i.name === person.name)){
    return res.status(403).json({error: "name must be unique"})
  }

  person.id = Math.floor(Math.random() * 100)
  persons = persons.concat(person)
  return res.status(201).json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})