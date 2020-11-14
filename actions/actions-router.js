const express = require("express");
const actions = require("../data/helpers/actionModel");


const router = express.Router();


router.get('/', (req, res) => {
    // do your magic!
    actions.get()
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error retrieving the user',
      })
    })
  });



router.post('/', (req, res) =>{
    actions.insert(req.body)
    .then(act => {
       res.status(201).json(act);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error adding the action', err})
    })
 });



router.put('/:id', (req, res) => {
    const changes = req.body;

    actions.update(req.params.id, changes)
    .then(act => {
        if (act){
            res.status(200).json(act);
        } else {
            res.status(404).json({ message: "The action could not be found"})
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "error updating the action"
        })
    })
})
 


router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: "The action is deleted"});
        } else {
            res.status(404).json({ message: "The action could not be found"});
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error removing the action', err})
    })
})


 module.exports = router;