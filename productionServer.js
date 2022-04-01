const express = require('express')
const { ExpressPeerServer } = require('peer');
const path = require('path')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 80

app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//replace the instance file of node_module folder
const oldFile = 'node_modules/peer/dist/src/instance.js'
fs.unlinkSync(oldFile)
fs.copyFile('instance.js', oldFile, (err) => {
  if (err) throw err;
  console.log('instance.js replaced!');
});


//PEER JS CONFIG
const peerServer = ExpressPeerServer(server, {
    path: '/myapp',
    allow_discovery: true,
});

app.use('/peerjs', peerServer);
//to update the user list
peerServer.on('connection', (client, realm) => {
    if (!realm) return
    realm.getClientsIds().filter(a => a != client.id).forEach(peerId => {
        const message = { type: 'CONNECTED', peerId: client.id }
        realm.getClientById(peerId).getSocket().send(JSON.stringify(message))
        console.log(message);
    })
});

//to update the user list
peerServer.on('disconnect', (client, realm) => {
    if (!realm) return
    realm.getClientsIds().filter(a => a != client.id).forEach(peerId => {
        const message = { type: 'DISCONNECTED', peerId: client.id }
        realm.getClientById(peerId).getSocket().send(JSON.stringify(message))
        console.log(message);
    })
});