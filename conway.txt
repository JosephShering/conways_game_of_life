/**
 * This is Conway's game of life.
 * 
 * The rules are simple.
 * 
 * 1. Any live cell with two or three neighbors survives
 * 2. Any dead cell with three live neighbors becomes a live cell
 * 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead
 * 
 * Below we generate a grid for the cells to live and die in.
 */


const deadCellChar = String.fromCharCode(9617);
const aliveCellChar = String.fromCharCode(9619);
const size = 15
let grid = [];

buildGrid();
makeLivingCells();
update();


function buildGrid() {
    for(let rowIndex = 0; rowIndex <= size; rowIndex += 1) {
        grid[rowIndex] = [];
        for(let colIndex = 0; colIndex <= size; colIndex += 1) {
            grid[rowIndex][colIndex] = 0;
        }
    }
}

function makeLivingCells() {
    grid[5][6] = 1;
    grid[6][7] = 1;
    grid[7][6] = 1;
    grid[6][6] = 1;
}

function update() {
    render();
    setInterval(() => {
        render();
        iterate();
    }, 200);
}

function iterate() {
    let nextGrid = grid.map(row => row.slice());

    for(let rowIndex = 1; rowIndex < size; rowIndex += 1) {
        for(let colIndex = 1; colIndex < size; colIndex += 1) {
            const livingNeighbors = getLivingNeighbors(rowIndex, colIndex);
            const isAlive = !!grid[rowIndex][colIndex];
            const isLonely = isAlive && livingNeighbors < 2;
            const isCrowded = isAlive && livingNeighbors > 3;

            if(isLonely || isCrowded) {
                nextGrid[rowIndex][colIndex] = 0;
            }
            
            if(!isAlive && livingNeighbors === 3) {
                nextGrid[rowIndex][colIndex] = 1;
            }
        }
    }

    grid = nextGrid;
}

function render() {
    for(let rowIndex = 1; rowIndex < size; rowIndex += 1) {
        for(let colIndex = 1; colIndex < size; colIndex += 1) {
            if(grid[rowIndex][colIndex]) {
                process.stdout.write(aliveCellChar);
            } else {
                process.stdout.write(deadCellChar);
            }
        }

        process.stdout.write('\n');
    }

    process.stdout.moveCursor(0, -grid.length+2);
}

function getLivingNeighbors(rowIndex, colIndex) {
    let livingNeighbors = 0;
    for(let i = -1; i <= 1; i += 1){
        for(let j = -1; j <= 1; j += 1) {
            livingNeighbors += grid[rowIndex + i][colIndex + j];
        }
    }

    livingNeighbors -= grid[rowIndex][colIndex];

    return livingNeighbors;
}