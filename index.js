const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

let cards = [
    { id: 1, text: 'New Card', color: 'blue' },
    { id: 2, text: 'New Card', color: 'purple' },
    { id: 3, text: 'New Card', color: 'green' }
];
let ID = 4;

app.get('/', (req, res) => {
    res.json(cards);
});

app.get('/:id', (req, res) => {
    const card = cards.find(card => card.id === parseInt(req.params.id));
    if (!card) return res.status(404).send('Card not found');
    res.json(user);
});

app.post('/', (req, res) => {
    const { text, color } = req.body;
    const newCard = {
        id: ID++,
        text,
        color,
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});

const updateArrayAtElemntAccordingToId = (array, id, update) => {
    return array.map(item => {
        if (item.id == id) {
            return {
                ...item,
                ...update
            };
        }
        return item;
    });
}
app.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let card = cards.find(card => card.id === id);
    if (!card) return res.status(404).send('Card not found');

    card = {
        ...card,
        ...req.body
    }
    cards = updateArrayAtElemntAccordingToId(cards, id, card);
    res.json(card);
});

app.delete('/:id', (req, res) => {
    const index = cards.findIndex(card => card.id == parseInt(req.params.id));
    if (index !== -1) {
        cards.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'User not found' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

