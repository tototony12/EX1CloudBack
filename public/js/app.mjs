
const textForm = document.querySelector('.formulario')
let texto = document.getElementById('texto')

textForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formText = {
        text: texto.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            console.log('Texto enviado');
        } else {
            alert('Error')
        }
    }
    xhr.send(JSON.stringify(formText))
})

function redirect() {

    let i = 0; 
    while (i < 10) { 
        task(i); 
    i++; 
    } 

    window.location.replace("/result");
    return false;
  }