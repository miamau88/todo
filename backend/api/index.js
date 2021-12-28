const express = require('express')
const api = express.Router()
const { getCtrl, postCtrl, patchCtrl, delCtrl } = require('./todos.ctrl.js')



api.get('/todos', getCtrl)
api.post('/todos/:userId', postCtrl)
api.patch('/todos/:userId/:id', patchCtrl)
api.delete('/todos/:userId/:id', delCtrl)

module.exports = api