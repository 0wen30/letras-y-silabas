import './style.css';

const consonantes = "bcdfghjklmnpqrstvwxyz".toUpperCase().split('');
const vocales = "aeiou".toUpperCase().split('');

function leerTexto(texto: string) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
}

function agregarSilaba(event: DragEvent) {
    const silaba = event.dataTransfer!.getData('silaba');
    parrafo.textContent += silaba;
} 

function crearParrafo() {
    const nuevoParrafo = document.createElement('p');
    nuevoParrafo.addEventListener('drop', agregarSilaba)
    nuevoParrafo.addEventListener('dragover', (ev:DragEvent)=>{
        ev.preventDefault();
        ev.dataTransfer!.dropEffect = "move";
    });
    nuevoParrafo.addEventListener('click', ()=>{
        leerTexto(nuevoParrafo.textContent||'Arrastra una letra o silaba')
    });
    nuevoParrafo.classList.add('parrafo');
    return nuevoParrafo;
}

function limpiarEspacio() {
    while (silabasSpace.firstChild) {
        silabasSpace.removeChild(silabasSpace.firstChild);
    }
}

function crearSilaba(vocal: string, letra: string) {
    const silaba = document.createElement('div');
    silaba.draggable = true;
    silaba.classList.add('card');
    silaba.addEventListener('dragstart', (ev:DragEvent)=> {
        ev.dataTransfer!.setData('silaba', letra + vocal);
    });
    silaba.addEventListener('click', ()=>leerTexto(letra + vocal))
    silaba.textContent = letra + vocal;
    return silaba;
}

function mostrarSilabas(event: Event){
    limpiarEspacio();
    const target = event.target as HTMLDivElement;
    const letra = target.textContent as string;
    leerTexto(letra);
    vocales.forEach(vocal => {
        silabasSpace.appendChild(crearSilaba(vocal, letra));
    })
}

function createCard(letra: string) {
    const card = document.createElement('div');
    card.draggable = true;
    card.classList.add('card');
    card.addEventListener('click', mostrarSilabas)
    card.addEventListener('dragstart', (ev:DragEvent)=> {
        ev.dataTransfer!.setData('silaba', letra );
    });
    card.textContent = letra;
    return card;
}

const hoja = document.querySelector<HTMLDivElement>('#texto')!;
const parrafo = crearParrafo();
hoja.appendChild(parrafo);
const letras = document.querySelector<HTMLDivElement>('#letras')!;
const silabasSpace = document.querySelector<HTMLDivElement>('#silabasSpace')!;

consonantes.forEach(letra => {
    letras.appendChild(createCard(letra));
});