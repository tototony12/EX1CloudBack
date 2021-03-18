require('dotenv').config();


const express = require('express');
const app = express();



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

})


const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

function toneAnalyzer(analyzedText) {
    const toneAnalyzer = new ToneAnalyzerV3({
        version: '2017-09-21',
        authenticator: new IamAuthenticator({
          apikey: process.env.API_KEY,
        }),
        serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/271700cf-6143-4817-8a24-ceb8420a2625',
      });
      
    const text = analyzedText;    

    const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
    };
      
    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
          window.alert(JSON.stringify(toneAnalysis, null, 2));
        })
        .catch(err => {
            window.alert('error:', err);
        });
}