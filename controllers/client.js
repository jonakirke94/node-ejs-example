const express = require("express");
const router = express.Router();
const fs = require('fs');


exports.get_all = (req, res, next) => {
   
    const clientInfo = fs.createReadStream(__dirname + '/clients.json', {encoding: "utf8"})
    clientInfo.on("data", info => {
        const data = JSON.parse(info);

        res.render('clients', {
            clients: data.Clients
        })
    }) 
}

exports.get = (req, res, next) => {
    const id = req.params.id
    const clientInfo = fs.createReadStream(__dirname + '/clients.json', {encoding: "utf8"})
    clientInfo.on("data", info => {
        const data = JSON.parse(info);
        let client;
        for(let i = 0; i < data.Clients.length; i++) {
            
             if(data.Clients[i].Id == id) {
                client = data.Clients[i];
                break;
            } 
        }

        res.render('client', {
            id: client.Id,
            name: client.Name
        })
    }) 
}

exports.createClient = (req, res, next) => {

    res.render('create', {})
      
}

exports.deleteClient = (req, res ,next) => {
    res.render('delete', {})
}


exports.create = (req, res, next) => {
    console.log('Create endpoint hit')
    const clientInfo = fs.createReadStream(__dirname + '/clients.json', {encoding: "utf8"})
    clientInfo.on("data", info => {
        const data = JSON.parse(info);
        const newId = data.Count +1;
        const name = req.body.Name;


        const client = {
            "Id": newId,
            "Name": name,
        }

        data.Clients.push(client);
        data.Count = data.Count +1;

        fs.writeFile(__dirname + '/clients.json', JSON.stringify(data), (err) => {
            if(err) {
                res.status(401).json({
                    message:  "Couldn't create client",
                });
            }

            res.render('create', {
                msg : "Created Successfully"
            })
        })     
    }) 
}

exports.delete = (req, res, next) => {
    console.log('Delete endpoint hit')
    const clientInfo = fs.createReadStream(__dirname + '/clients.json', {encoding: "utf8"})
    clientInfo.on("data", info => {
        const data = JSON.parse(info);
        const id = req.body.id;

        for(let i = 0; i < data.Clients.length; i++) {
            
            if(data.Clients[i].Id == id) {
               data.Clients.splice(i, 1);
               break;
           } 
       }

        fs.writeFile(__dirname + '/clients.json', JSON.stringify(data), (err) => {
            if(err) {
                res.status(401).json({
                    message:  "Couldn't create client",
                });
            }

            res.render('delete', {
                msg : "Deleted Successfully"
            })
        })     
    }) 
}