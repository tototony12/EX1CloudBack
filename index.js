require('dotenv').config();


const express = require('express');
const app = express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

app.use(express.static(__dirname + '/public'))
app.use(express.json())

//app.get('/', (req, res) => {
//    res.render('index')
//})

app.listen(8080, (err) => {
    if (err) {
      throw err
    }
    console.log('Servidor iniciado en el puerto 3000')
  })

app.use((req, res, next) => {
    const allowedOrigins = ['http://187.177.181.167:8080', 'http://187.177.181.167:3003', 'http://127.0.0.1:8080', 'http://localhost:3003'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.post('/analizar', (req, res) => {
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
        app.get('/resultado', function (req, res) {
            res.send(JSON.stringify(toneAnalysis, null, 2))
        })
        console.log(JSON.stringify(toneAnalysis, null, 2));
    })
    .catch(err => {
        app.get('/resultado', function (req, res) {
            res.send('error:', err);
        })    
        console.log('error:', err);
    });

})

