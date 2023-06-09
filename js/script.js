//JS RESET
console.log('JS OK')

// RECUPERO gli elementi dal DOM
const grid = document.getElementById('grid');
const playButton = document.getElementById('play-button');
const levelSelect = document.getElementById('difficulty');
const scorePlaceholder = document.getElementById('score');

//Funzione start-game
const startGame = () => {

    let isGameOver = false;
    
    //! FUNZIONI:

    //Funzione per rivelare le celle
    const revealCells = () => {
        //Recupero le celle
        const cells = document.querySelectorAll('.cell')

        for(let i = 0; i < cells.length; i++){
            const cell = cells[i];
            cell.classList.add('clicked');
            const cellNumber = parseInt(cell.innerText);
            if(bombs.includes(cellNumber)) cell.classList.add('bomb');
        }
    }


    //Funzione per generare le bombe
    const generateBombs = (numberOfBombs, maxNumber) => {
        let bombs = [];
        
        while(bombs.length < numberOfBombs){
            let randomNumber;
            do{
                randomNumber = Math.floor(Math.random() * maxNumber) + 1;
            }   while(bombs.includes(randomNumber));
            bombs.push(randomNumber);
        }
        return bombs;
    };
    
    //Funzione per creare la cella
    const createCell = (cellNumber, level) => {
        const cell = document.createElement('div');
        cell.classList.add('cell', level);
    
        cell.append(cellNumber);
        return cell;
    };

    //Funzione ENDgame
    function endGame(score, hasHitBomb){
        const message = hasHitBomb
            ? `Hai perso! Hai totalizzato ${score} punti` 
            : `Hai vinto! Hai raggiunto ${score} punti`

        alert(message);

        isGameOver = true;

        //Riveliamo tutte le celle
        revealCells()
    }

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
    

    const totalCells = rows * cols;

    // Preparo il punteggio
    let score = 0;
    
    // Setto il numero delle bombe
    const totalBombs = 16;

    // Setto il punteggio massimo
    const maxScore = totalCells - totalBombs;

    // Preparo un contenitore per le bombe
    const bombs = generateBombs(totalBombs, totalCells);

    console.log(bombs);
    
    //! LOGICA DI GIOCO EFFETTIVA:

    //Generare la griglia
    for(let i = 1; i <= totalCells; i++) {

        //CREO la cella
        const cell = createCell(i, level);

        //IN ASCOLTO sulla cella
        cell.addEventListener('click',() => {

            //Controllo se era stata già cliccata
            if(isGameOver === true || cell.classList.contains('clicked')) return;

            //Aggiungo la classe clicked
            cell.classList.add('clicked');
            console.log(cell.innerText);

            // Controllo se è una bomba
            const hasHitBomb = bombs.includes(i);

            if(hasHitBomb){
                cell.classList.add('bomb');

                //Segnalo che hai perso
                endGame(score, hasHitBomb);

            } else {
                //Incremento il punteggio
                scorePlaceholder.innerText = ++score;

                // SE HA VINTO
                if(score === maxScore){
                    endGame(score, hasHitBomb);
                }
            }

        });

        //La inserisco in pagina
        grid.appendChild(cell);
    }
};

//IN ASCOLTO sul play-button
playButton.addEventListener('click', startGame);