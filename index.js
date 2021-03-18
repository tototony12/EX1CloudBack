require('dotenv').config();


const express = require('express');
const app = express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));

//app.use(express.static(__dirname + '/public'))
app.use(express.json())

async function obtenerResultados() {
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
        console.log(JSON.stringify(toneAnalysis, null, 2));
        return await res.send(JSON.stringify(toneAnalysis, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
        return await 'error: ' + err;
    });
}

app.get('/', (req, res) => {

    res.render('index', {resultados})
})

app.listen(3003, (err) => {
    if (err) {
      throw err
    }
    console.log('Servidor iniciado en el puerto 3000')
  })

app.post('/nuevo', (req, res) => {
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

