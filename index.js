const express = require('express');
const { func } = require('joi');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/GYM-Equipements')
    .then(() => console.log('connected to GYM-Equipements'))
    .catch(err => console.error('could not connect to mongoDB.' , err));

const EquipementsSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Equipement = mongoose.model('Equipement',EquipementsSchema);

async function getEquipements(){
    const equipement = await Equipement.find();
    return equipement;
}

async function createEquipement(name, price){
    console.log(name);
    const equipement = new Equipement({
        name: name,
        price: price
    });
     
    try{
        const result = await equipement.save();
        return result;
    }
    catch(err){
        console.log(err.message);
        return err.message;
    }
}

async function getEquipementsWithName(name){
    const equipement = await Equipement.find({
        name: name
    })
    console.log(equipement);
    return equipement;
}

async function updateEquipementName(name, price){

    const equipementToUpdate = {name: name};
    const priceToUpdate = {price: price};

    
    try{
        const updatedEquipement = await Equipement.findOneAndUpdate(equipementToUpdate, priceToUpdate);
        return updatedEquipement;
    }
    catch(err){
        console.log(err.message);
        return err.message;
    }
}

async function deleteEquipementByName(name){
    const equipementToDelete = {
        name: name
    };

    console.lo

    try{
        const deletedEquipement = await Equipement.findOneAndRemove(equipementToDelete);
        return deletedEquipement;
    }
    catch(err){
        console.log(err.message);
        return err.message;
    }
}


app.get('/api/equipements', (req,res) => {
    async function get(){
        const result = await getEquipements();

        res.send(result);
    }
    get();
});
app.post('/api/equipements', (req,res) => {
    
    async function create(){
        const result = await createEquipement(req.body.name, req.body.price);
        console.log(result);

        res.send(result);
    }
    create();
});

app.get('/api/equipements/:name', (req,res) => {
    async function getEquipementWithName(){
        const result = await getEquipementsWithName(req.params.name);

        res.send(result);
    }
    getEquipementWithName();
    
});

app.put('/api/equipements/:name', (req,res) => {
    async function updateEquipement(){
        const result = await updateEquipementName(req.params.name, req.body.price);

        res.send(result);
    }
    updateEquipement();
    
});

app.delete('/api/equipements/:name', (req,res) => {

    async function deleteEquipement(){
        const result = await deleteEquipementByName(req.params.name);

        res.send(result);
    }
    deleteEquipement();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})
