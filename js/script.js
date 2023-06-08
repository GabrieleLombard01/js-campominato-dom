//JS RESET
console.log('JS OK')


// RECUPERO gli elementi dal DOM
const grid = document.getElementById('grid');
const playButton = document.getElementById('play-button');


//Funzione start-game
function startGame(){
    
    //! OPERAZIONI INIZIALI:
    //Cambio il testo in RICOMINCIA
    playButton.innerText = "Rigioca";
    
    //Svuoto la griglia
    grid.innerHTML = '';
    
    
    //Funzione per creare la cella
    const createCell = (cellNumber) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.append(cellNumber);
        return cell;
    };
    
    //! LOGICA DI GIOCO EFFETTIVA:

    //Generare la griglia
    for(let i = 1; i <= 100; i++) {

        //CREO la cella
        const cell = createCell(i);

        grid.appendChild(cell);
    }
};

//IN ASCOLTO sul play-button
playButton.addEventListener('click', startGame);