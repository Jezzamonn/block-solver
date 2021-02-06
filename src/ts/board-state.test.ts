import { BoardState } from "./board-state";
import { expect } from "chai";
import { Piece } from "./piece";

describe('BoardState.createFromString', function() {
    it('creates the correct board', function() {
        const input =
            '#####\n' +
            '#  ##\n' +
            '# O #\n' +
            '#XO #\n' +
            '#####\n';
        const boardState = BoardState.createFromString(input);
        expect(boardState.board).to.eql([
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]);
    });
});

describe('BoardState', function() {
    let boardState: BoardState;

    beforeEach(function() {
        boardState = new BoardState({board: [
            [1,1,1,1,1],
            [1,0,0,1,1],
            [1,0,2,0,1],
            [1,3,2,0,1],
            [1,1,1,1,1],
        ]});
    });

    describe('createShifted', function () {
        it('shifts piece up', function() {
            const shifted = boardState.createShifted(2, {x: 0, y: -1});
            expect(shifted).to.exist;
            expect(shifted!.board).to.eql([
                [1,1,1,1,1],
                [1,0,2,1,1],
                [1,0,2,0,1],
                [1,3,0,0,1],
                [1,1,1,1,1],
            ]);
        });

        it('shifts piece right', function() {
            const shifted = boardState.createShifted(2, {x: 1, y: 0});
            expect(shifted).to.exist;
            expect(shifted!.board).to.eql([
                [1,1,1,1,1],
                [1,0,0,1,1],
                [1,0,0,2,1],
                [1,3,0,2,1],
                [1,1,1,1,1],
            ]);
        });

        it("doesn't shift pieces into walls", function() {
            const shifted = boardState.createShifted(2, {x: 0, y: 1});
            expect(shifted).to.not.exist;
        });

        it("doesn't shift pieces into other pieces", function() {
            const shifted = boardState.createShifted(2, {x: -1, y: 0});
            expect(shifted).to.not.exist;
        });
    });

    describe('pieces', function() {
        it('returns the right pieces', function() {
            const pieces = boardState.pieces;
            expect(pieces).to.eql({
                1: new Piece({
                    index: 1,
                    moveable: false,
                    firstPosition: {x: 0, y: 0},
                    shape: [
                        {x: 0, y: 0},
                        {x: 1, y: 0},
                        {x: 2, y: 0},
                        {x: 3, y: 0},
                        {x: 4, y: 0},
                        {x: 0, y: 1},
                        {x: 3, y: 1},
                        {x: 4, y: 1},
                        {x: 0, y: 2},
                        {x: 4, y: 2},
                        {x: 0, y: 3},
                        {x: 4, y: 3},
                        {x: 0, y: 4},
                        {x: 1, y: 4},
                        {x: 2, y: 4},
                        {x: 3, y: 4},
                        {x: 4, y: 4},
                    ],
                }),
                2: new Piece({
                    index: 2,
                    moveable: true,
                    firstPosition: {x: 2, y: 2},
                    shape: [
                        {x: 0, y: 0},
                        {x: 0, y: 1},
                    ],
                }),
                3: new Piece({
                    index: 3,
                    moveable: true,
                    firstPosition: {x: 1, y: 3},
                    shape: [
                        {x: 0, y: 0},
                    ],
                }),
            });
        });
    });
});