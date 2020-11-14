const express = require("express");
const projects = require("../data/helpers/projectModel");


const router = express.Router();



router.get("/", (req, res) => {
    projects.get()
    .then(pro => {
        res.status(200).json(pro);
    }) 
    .catch(err => {
        res.status(500).json({
            message: "Error retrieving Projects", err
        });
    })
}) 



router.get('/:project_id', validateAction, (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(pro => {
      res.status(200).json(pro)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error getting the Project for the Action'
      })
    })
  });



router.post('/', (req, res) =>{
    projects.insert(req.body)
    .then(pro => {
       res.status(201).json(pro);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error adding the project', err})
    })
 });



router.put('/:project_id', (req, res) => {
    const changes = req.body;

    projects.update(req.params.id, changes)
    .then(pro => {
        if (pro){
            res.status(200).json(pro);
        } else {
            res.status(404).json({ message: "The Project could not be found"})
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "error updating the Project"
        })
    })
})




router.delete('/:project_id', (req, res) => {
    projects.remove(req.params.id)
    .then(pro => {
        if(pro > 0){
            res.status(200).json({ message: "The Project is deleted"});
        } else {
            res.status(404).json({ message: "The Project could not be found"});
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error removing the Project', err})
    })
})



function validateAction(req, res, next) {
    const body = req.body;
    if(Object.keys(body).length === 0) {
     
    res.status(400).json({message: 'Please include request body'})
    
    } if (!body.name){
      res.status(400).json({message: "Please insert name for body"})
    } else {
      next();
    }
  }


 module.exports = router;