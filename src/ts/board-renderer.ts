import { BoardState } from "./board-state";

export class BoardRenderer {
    blockWidth: number;
    blockHeight: number;

    boardElem: HTMLElement | null;
    pieceElems: HTMLElement[];
    initialized: boolean;

    constructor() {
        this.blockWidth = 0;
        this.blockHeight = 0;
        this.boardElem = null;
        this.pieceElems = [];
        this.initialized = false;
    }

    get rootElem(): HTMLElement {
        if (this.boardElem == null) {
            throw new Error("Must initialize first!");
        }
        return this.boardElem;
    }

    initialize(board: BoardState) {
        if (this.initialized) {
            throw new Error("Can't initialize again!!");
        }
        this.createBoardElem(board);
        this.createPieceElems(board);

        this.initialized = true;
    }

    createBoardElem(board: BoardState) {
        this.boardElem = document.createElement('div');
        this.boardElem.classList.add('board');

        const widthRatio = board.width / Math.max(board.width, board.height);
        const heightRatio = board.height / Math.max(board.width, board.height);

        // Assumes we're hosted in a square container.
        this.boardElem.style.width = (100 * widthRatio).toFixed(2) + '%';
        this.boardElem.style.height = (100 * heightRatio).toFixed(2) + '%';
    }

    createPieceElems(board: BoardState) {
        this.blockWidth = (100 / board.width);
        this.blockHeight = (100 / board.height);

        const pieces = board.pieces;
        for (const pieceIndex in pieces) {
            const piece = pieces[pieceIndex];

            const pieceElem = document.createElement('div');
            pieceElem.classList.add('piece');
            pieceElem.dataset.index = pieceIndex;
            pieceElem.style.width = this.blockWidth.toFixed(2) + '%';
            pieceElem.style.height = this.blockHeight.toFixed(2) + '%';
            pieceElem.style.left = (piece.firstPosition.x * this.blockWidth).toFixed(2) + '%';
            pieceElem.style.top = (piece.firstPosition.y * this.blockHeight).toFixed(2) + '%';

            let color = '#333';
            if (piece.index > 1) {
                const hue = (piece.index * 230) % 360;
                color = `hsl(${hue}, 50%, 50%)`;
            }
            for (const subPiecePos of piece.shape) {
                const subPieceElem = document.createElement('div');
                subPieceElem.classList.add('sub-piece');
                subPieceElem.style.backgroundColor = color;
                subPieceElem.style.left = (100 * subPiecePos.x) + '%';
                subPieceElem.style.top = (100 * subPiecePos.y) + '%';
                pieceElem.append(subPieceElem);
            }

            this.boardElem!.append(pieceElem);
            this.pieceElems.push(pieceElem);
        }
    }

    update(board: BoardState) {
        if (!this.initialized) {
            throw new Error("Must initialize first!");
        }
        const pieces = board.pieces;
        for (const pieceElem of this.pieceElems) {
            const pieceIndex: number = parseInt(pieceElem.dataset.index!);

            const piece = pieces[pieceIndex];

            pieceElem.style.left = (piece.firstPosition.x * this.blockWidth).toFixed(2) + '%';
            pieceElem.style.top = (piece.firstPosition.y * this.blockHeight).toFixed(2) + '%';
        }
    }
}