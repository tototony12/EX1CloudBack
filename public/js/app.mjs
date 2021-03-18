
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
    // no funciona el delay, recargar pagina manualmente para ver resultado
    var x = 1;
    var y = null;

    setTimeout(function() {
        x = x * 3 + 2;
        y = x / 2;
    }, 100);

    window.location.replace("/result");
    return false;
  }