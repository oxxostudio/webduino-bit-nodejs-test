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

    let draw = (data) => {
        let colorList = {
            '0': '000000',
            '1': 'ffffff',
            'r': '660000',
            'g': '006600',
            'b': '000066',
            'c': '006666',
            'm': '660066',
            'y': '666600'
        };
        let newArr = [];
        data.map((e, index) => {
            let lightNum;
            e = e.toString();
            if (index < 16) {
                lightNum = '0' + index.toString(16);
            } else {
                lightNum = index.toString(16);
            }
            if (colorList.hasOwnProperty(e)) {
                newArr[index] = lightNum + colorList[e];
            } else {
                newArr[index] = lightNum + e;
            }
        });
        return newArr.join().replace(/,/g, '');
    }

    let arr = [
        'r', 'r', '0', 'g', 'g',
        'r', 'r', '0', 'g', 'g',
        '0', '0', '1', '0', '0',
        'b', 'b', '0', 'y', 'y',
        'b', 'b', '0', 'y', 'y'];

    //matrix.setColor(draw(arr));

    let fullColor = (color) => {
        let result = [];
        for (let i = 0; i < 25; i++) {
            result[i] = color;
        };
        return result;
    };
    btnA.on("pressed", () => {
        matrix.setColor(draw(fullColor('r')));
    });
    btnB.on("pressed", () => {
        matrix.setColor(draw(fullColor('b')));
    });
    // let c = 0;
    // let run = () => {
    //     let result = [];
    //     for (let i = 0; i < 25; i++) {
    //         result[i] = '0';
    //     };
    //     result[c] = 'r';
    //     matrix.setColor(draw(result));
    //     c = c + 1;
    //     if (c > 24) { c = 0; }
    //     setTimeout(run, 100);
    // }
    // run();
    // let c = 0;
    // let go = () => {
    //     let arr2 = new Array(25);
    // };

});