const express = require('express'); //this is like the import command but for node

const hubsModel = require('./data/hubs-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
  res.send('hello node 22');
});

server.get('/hubs', (req, res) =>{
  hubsModel.find().then(hubs =>{
    res.send(hubs);
  }).catch( err =>{
    res.send(err);
  });
});

server.post('/hubs', (req, res) =>{
  const hubData = req.body;
  console.log('hub data', hubData);
  hubsModel.add(hubData)
  .then(hub =>{
    res.json(hub);
  })
  .catch(err =>{
    res.send({message: 'error saving the hub'});
  });
});

server.delete('/hubs/:id', (req, res) =>{
  const id = req.params.id;
  hubsModel.remove(id)
  .then(hub =>{
    res.json(hub);
  })
  .catch(err =>{
    res.send({message: 'error saving the hub'});
  });
});

server.put('/hubs/:id', (req, res) =>{
  const id = req.params.id;
  const changes = req.body;

  hubsModel.update(id, changes)
  .then(hub =>{
    res.json(hub);
  })
  .catch(err =>{
    res.send({message: 'error saving the hub'});
  });
});

const port = 8000;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));