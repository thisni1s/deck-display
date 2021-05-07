import express from 'express'
import axios from 'axios'
import base64 from 'base-64'
import { boardInfo, board, label, stack, card } from './models.js'
const app = express()
const port = 5000

let username = process.env.USERNAME
let password = process.env.PASSWORD
let basic = 'Basic '+ base64.encode(username + ':' + password)
let baseurl = process.env.BASEURL

app.use(express.static('./static')); //serves the index.html

app.get('/boards', async function(req, res) {
    
    let data = "";
    var config = {
      method: 'get',
      url: baseurl + '/index.php/apps/deck/api/v1.0/boards',
      headers: { 
        'OCS-APIRequest': 'true', 
        'Authorization': basic
      }
    };    
    try {
        const response = await axios(config)    
        data = response.data
    } catch (error) {
        console.log(error)
    }

    let result = data.map(function(element) {
        if (element.archived === false) {
            let board = boardInfo(element.id, element.title, element.color)
            return board
        }     
    })

    res.send(result);
})

app.get('/boards/:id', async function(req, res) {
    let result = '';
    let boarddetails = '';
    let stacks = '';
    let config = {
      method: 'get',
      url: baseurl + '/index.php/apps/deck/api/v1.0/boards/'+req.params.id,
      headers: { 
        'OCS-APIRequest': 'true', 
        'Authorization': basic
      }
    };    
    try {
        const response = await axios(config)    
        boarddetails = response.data
    } catch (error) {
        console.log(error)
    }
    config = {
        ...config,
        url: baseurl + '/index.php/apps/deck/api/v1.0/boards/'+req.params.id+'/stacks',
    }
    try {
        const response = await axios(config)    
        stacks = response.data
    } catch (error) {
        console.log(error)
    }

    result = boarddetails.archived === false ? board(    
        boarddetails.id,
        boarddetails.title,
        boarddetails.color,
        boarddetails.labels.map(element => {
            return label(element.id, element.title, element.color)
        }),
        stacks.map(element => {
            return stack(
                element.id,
                element.title,
                element.cards !== undefined ? element.cards.map(carde => {
                    return card(
                        carde.id,
                        carde.title,
                        carde.description,
                        carde.labels.length !== 0 ? carde.labels.map(lbl => {
                            return label(lbl.id, lbl.title, lbl.color)
                        }) : [],
                        carde.assignedUsers.length !== 0 ? carde.assignedUsers.map(user => {
                            return user.participant.displayname.split(' ')[0]
                        }) : [],
                        carde.duedate,
                        )
                }) : []
                )
        })

    ) : {}   

    res.send(result);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


