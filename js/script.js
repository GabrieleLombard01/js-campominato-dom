//JS RESET
console.log('JS OK')


// RECUPERO gli elementi dal DOM
const grid = document.getElementById('grid');
const playButton = document.getElementById('play-button');
const levelSelect = document.getElementById('difficulty');


//Funzione start-game
function startGame(){
    
    //! OPERAZIONI INIZIALI:
    //Cambio il testo in RICOMINCIA
    playButton.innerText = "Rigioca";
    
    //Svuoto la griglia
    grid.innerHTML = '';

    // Recupero il livello scelto
    const level = levelSelect.value;
    
    //Calcolo le celle totali
    let rows;
    let cols;

    switch(level) {
        case 'hard':
            rows = 7;
            cols = 7;
            break;
        case 'normal':
            rows = 9;
            cols = 9;
            break;
        case 'easy':
            default:
            rows = 10;
            cols = 10;
            break;
    };
    
    //Funzione per creare la cella
    const createCell = (cellNumber, level) => {

        const cell = document.createElement('div');
        cell.classList.add('cell', level);

        

        cell.append(cellNumber);

        return cell;
    };

    const totalCells = rows * cols;
    
    //! LOGICA DI GIOCO EFFETTIVA:

    //Generare la griglia
    for(let i = 1; i <= totalCells; i++) {

        //CREO la cella
        const cell = createCell(i, level);

        //IN ASCOLTO sulla cella
        cell.addEventListener('click',() => {
            cell.classList.add('clicked');
            console.log(i);
        });

        //La inserisco in pagina
        grid.appendChild(cell);
    }
};

//IN ASCOLTO sul play-button
playButton.addEventListener('click', startGame);