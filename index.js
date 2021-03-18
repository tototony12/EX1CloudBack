require('dotenv').config();


const express = require('express');
const app = express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.listen(3003, (err) => {
    if (err) {
      throw err
    }
    console.log('Servidor iniciado en el puerto 3000')
  })

app.post('/', (req, res) => {
    console.log(req.body)

    const toneAnalyzer = new ToneAnalyzerV3({
        version: '2017-09-21',
        authenticator: new IamAuthenticator({
          apikey: process.env.API_KEY,
        }),
        serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/271700cf-6143-4817-8a24-ceb8420a2625',
      });

    const text = req.body.text;    

    const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
        app.get('/result', function (req, res) {
            res.send(JSON.stringify(toneAnalysis, null, 2))
          })        
        console.log(JSON.stringify(toneAnalysis, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });

})

