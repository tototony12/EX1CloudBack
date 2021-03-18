import toneAnalyzer from "../../functions.js"

const textForm = document.querySelector('.formulario')
let texto = document.getElementById('texto')

textForm.addEventListener('submit', (e) => {
    e.preventDefault();

    toneAnalyzer(texto);
})