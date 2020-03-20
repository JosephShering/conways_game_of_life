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
const grid = [];

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
    grid[5][5] = 1;
    grid[5][6] = 1;
    grid[6][5] = 1;
}

function update() {
    render();
    setInterval(() => {
        render();
        iterate();
    }, 2000);
}

function iterate() {
    for(let rowIndex = 1; rowIndex < size; rowIndex += 1) {
        for(let colIndex = 1; colIndex < size; colIndex += 1) {
            const neighbors = getNeighbors(rowIndex, colIndex);

            if(neighbors > 3 || neighbors < 2) {
                grid[rowIndex][colIndex] = 0;
            } else {
                grid[rowIndex][colIndex] = 1;
            }
        }
    }
}

function render() {
    for(let rowIndex = 0; rowIndex <= size; rowIndex += 1) {
        for(let colIndex = 0; colIndex <= size; colIndex += 1) {
            if(grid[rowIndex][colIndex]) {
                process.stdout.write(aliveCellChar);
            } else {
                process.stdout.write(deadCellChar);
            }
        }

        process.stdout.write('\n');
    }

    process.stdout.moveCursor(0, -grid.length);
}

function getNeighbors(rowIndex, colIndex) {
    let livingNeighbors = 0;
    for(let i = -1; i <= 1; i += 1){
        for(let j = -1; j <= 1; j += 1) {
            livingNeighbors += grid[rowIndex + i][colIndex + j];
        }
    }

    return livingNeighbors;
}