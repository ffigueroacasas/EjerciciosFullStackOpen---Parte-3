const express = require('express')

const app = express()
app.use(express.json())

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
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.end(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})