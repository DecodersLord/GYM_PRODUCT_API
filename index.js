const express = require('express');
const app = express();
app.use(express.json());

const equipements = [
    {Id: 1, Name: 'Treadmil'},
    {Id: 2, Name: 'Cycle'},
    {Id: 3, Name: 'Rower'},
    {Id: 4, Name: 'Ski-erg'}
]

app.get('/api/equipements', (req,res) => {
    if(equipements.length <= 0){
        return res.status(404).send('There are no product to display');
    }

    res.send(equipements);
});

app.get('/api/equipements/:id', (req,res) => {
    const equipement = equipements.find(c => c.Id === parseInt(req.params.id));

    if(!equipement) return res.status(404).send('There is no product with requested ID');

    res.send(equipement);
});

app.post('/api/equipements', (req,res) => {

    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be longer than 3 chars');
    }

    const equipement = {
        id: equipements.length + 1,
        Name: req.body.name
    }

    equipements.push(equipement);

    res.send(equipement);
});

app.put('/api/equipements/:id', (req,res) => {
    const equipement = equipements.find(c => c.Id === parseInt(req.params.id));

    if(!equipement) return res.status(404).send('There is no product with requested ID');

    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be longer than 3 chars');
    }

    equipement.Name = req.body.name;

    res.send(equipement);
});

app.delete('/api/equipements/:id', (req,res) => {
    const equipement = equipements.find(c => c.Id === parseInt(req.params.id));

    if(!equipement) return res.status(404).send('There is no product with requested ID');

    const index = equipements.indexOf(req.params.id);
    equipements.splice(index,1);
    res.send(equipement);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})
