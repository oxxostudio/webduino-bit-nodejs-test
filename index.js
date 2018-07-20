let webduino = require('webduino-js');
require('webduino-bit-module-led-matrix')(webduino);
require('webduino-bit-module-button')(webduino);

const opts = {
    board: 'Bit',
    device: 'ydecvdTXWiJbU4WS2b',
    transport: 'mqtt'
};

let board = new webduino.board[opts.board](opts);

board.once(webduino.BoardEvent.READY, (board) => {
    board.samplingInterval = 250;
    const matrix = new webduino.module.Matrix(board, 4, 25);
    const btnA = new webduino.module.Button(board, board.getDigitalPin(35), webduino.module.Button.PULL_UP);
    const btnB = new webduino.module.Button(board, board.getDigitalPin(27), webduino.module.Button.PULL_UP);

    matrix.setColor('#666');

    btnA.on("pressed", () => {
        matrix.setColor('#300,#600,#900,#f00');
    });
    btnB.on("pressed", () => {
        matrix.setColor('#003');
    });
});