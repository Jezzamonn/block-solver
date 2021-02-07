import { BoardState } from "./board-state";

let blockWidth: number;
let blockHeight: number;

function sizeBoard(board: BoardState) {
    const container = document.querySelector<HTMLElement>('.board')!;

    const boardWidth = board.board[0].length;
    const boardHeight = board.board.length;

    const widthRatio = boardWidth / Math.max(boardWidth, boardHeight);
    const heightRatio = boardHeight / Math.max(boardWidth, boardHeight);
    container.style.width = (100 * widthRatio).toFixed(2) + '%';
    container.style.height = (100 * heightRatio).toFixed(2) + '%';

    blockWidth = (100 / boardWidth);
    blockHeight = (100 / boardHeight);

    const root = document.documentElement;
    root.style.setProperty('--block-width', blockWidth.toFixed(2) + '%');
    root.style.setProperty('--block-height', blockHeight.toFixed(2) + '%');

}

function createBoardElements(board: BoardState) {
    const container = document.querySelector<HTMLElement>('.board')!;

    const pieces = board.pieces;
    for (const pieceIndex in pieces) {
        const piece = pieces[pieceIndex];

        const pieceElem = document.createElement('div');
        pieceElem.classList.add('piece');
        pieceElem.dataset.index = pieceIndex;
        pieceElem.style.left = (piece.firstPosition.x * blockWidth).toFixed(2) + '%';
        pieceElem.style.top = (piece.firstPosition.y * blockHeight).toFixed(2) + '%';

        let color = '#333';
        if (piece.index > 1) {
            const hue = (piece.index * 230) % 360;
            color = `hsl(${hue}, 50%, 50%)`;
        }
        for (const subPiecePos of piece.shape) {
            const subPieceElem = document.createElement('div');
            subPieceElem.classList.add('sub-piece');
            subPieceElem.style.left = (100 * subPiecePos.x) + '%';
            subPieceElem.style.top = (100 * subPiecePos.y) + '%';
            subPieceElem.style.backgroundColor = color;
            pieceElem.append(subPieceElem);
        }

        container.append(pieceElem);
    }
}

function updateBoardElements(board: BoardState) {
    const pieceElems = document.querySelectorAll<HTMLElement>('.piece');
    const pieces = board.pieces;
    for (const pieceElem of pieceElems) {
        const pieceIndex: number = parseInt(pieceElem.dataset.index!);

        const piece = pieces[pieceIndex];

        pieceElem.style.left = (piece.firstPosition.x * blockWidth).toFixed(2) + '%';
        pieceElem.style.top = (piece.firstPosition.y * blockHeight).toFixed(2) + '%';
    }
}

function init() {
    let board = BoardState.createFromString(`
##  ##
##  ##
RRR CC
# MMC#
 BBYY 
GGBYPP
G LL P
  LL  
`);

    sizeBoard(board);
    createBoardElements(board);

    setInterval(() => {
        while (true) {
            const pieceIndexes = Object.keys(board.pieces).map(p => parseInt(p));
            const randomPiece = pieceIndexes[Math.floor(Math.random() * pieceIndexes.length)];
            const moves = [
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: -1},
            ];
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            const newBoard = board.createShifted(randomPiece, randomMove);
            if (newBoard == null) {
                continue;
            }
            board = newBoard;
            updateBoardElements(board);
            break;
        }
    }, 20);
}

window.onload = init;