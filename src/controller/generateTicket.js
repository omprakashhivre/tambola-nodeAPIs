

const GenerateTicketData = () => {
    const row1a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const row2a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const row3a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const numdone = [0];
    const numdone02 = [];
    const numdone1 = [0];
    const numdone2 = [0];
    let randnum = 0;
    let row3Count = 0
    const columnRanges = [
        [1, 9],
        [10, 19],
        [20, 29],
        [30, 39],
        [40, 49],
        [50, 59],
        [60, 69],
        [70, 79],
        [80, 90]
    ];


    for (let i = 0; i < 5; i++) {
        randnum = Math.floor(Math.random() * 90 + 1);
        for (let y = 0; y < numdone.length; y++) {
            if (randnum == numdone[y]) {
                randnum = Math.floor(Math.random() * 90 + 1);
                y = 0;
            }
        }
        numdone02.push(randnum);

        if (randnum <= 9) {
            numdone.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
            row1a[0] = randnum;
        } else if (randnum >= 10 && randnum <= 19) {
            numdone.push(10, 11, 12, 13, 14, 15, 16, 17, 18, 19);
            row1a[1] = randnum;
        } else if (randnum >= 20 && randnum <= 29) {
            numdone.push(20, 21, 22, 23, 24, 25, 26, 27, 28, 29);
            row1a[2] = randnum;
        }
        else if (randnum >= 30 && randnum <= 39) {
            numdone.push(30, 31, 32, 33, 34, 35, 36, 37, 38, 39);
            row1a[3] = randnum;
        } else if (randnum >= 40 && randnum <= 49) {
            numdone.push(40, 41, 42, 43, 44, 45, 46, 47, 48, 49);
            row1a[4] = randnum;
        } else if (randnum >= 50 && randnum <= 59) {
            numdone.push(50, 51, 52, 53, 54, 55, 56, 57, 58, 59);
            row1a[5] = randnum;
        } else if (randnum >= 60 && randnum <= 69) {
            numdone.push(60, 61, 62, 63, 64, 65, 66, 67, 68, 69);
            row1a[6] = randnum;
        }
        else if (randnum >= 70 && randnum <= 79) {
            numdone.push(70, 71, 72, 73, 74, 75, 76, 77, 78, 79);
            row1a[7] = randnum;
        }
        else if (randnum >= 80 && randnum <= 90) {
            numdone.push(80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90);
            row1a[8] = randnum;
        }
    }

    for (let i = 0; i < 5; i++) {
        randnum = Math.floor(Math.random() * 90 + 1);
        for (let y = 0; y < numdone1.length; y++) {
            if (randnum == numdone1[y]) {
                randnum = Math.floor(Math.random() * 90 + 1);
                y = 0;
            }
            for (let j = 0; j < numdone02.length; j++) {
                if (randnum == numdone02[j]) {
                    randnum = Math.floor(Math.random() * 90 + 1)
                    j = 0
                }
            }
        }
        numdone02.push(randnum);

        if (randnum <= 9) {
            numdone1.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
            row2a[0] = randnum;
        } else if (randnum >= 10 && randnum <= 19) {
            numdone1.push(10, 11, 12, 13, 14, 15, 16, 17, 18, 19);
            row2a[1] = randnum;
        } else if (randnum >= 20 && randnum <= 29) {
            numdone1.push(20, 21, 22, 23, 24, 25, 26, 27, 28, 29);
            row2a[2] = randnum;
        }
        else if (randnum >= 30 && randnum <= 39) {
            numdone1.push(30, 31, 32, 33, 34, 35, 36, 37, 38, 39);
            row2a[3] = randnum;
        } else if (randnum >= 40 && randnum <= 49) {
            numdone1.push(40, 41, 42, 43, 44, 45, 46, 47, 48, 49);
            row2a[4] = randnum;
        } else if (randnum >= 50 && randnum <= 59) {
            numdone1.push(50, 51, 52, 53, 54, 55, 56, 57, 58, 59);
            row2a[5] = randnum;
        } else if (randnum >= 60 && randnum <= 69) {
            numdone1.push(60, 61, 62, 63, 64, 65, 66, 67, 68, 69);
            row2a[6] = randnum;
        }
        else if (randnum >= 70 && randnum <= 79) {
            numdone1.push(70, 71, 72, 73, 74, 75, 76, 77, 78, 79);
            row2a[7] = randnum;
        }
        else if (randnum >= 80 && randnum <= 90) {
            numdone1.push(80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90);
            row2a[8] = randnum;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (row1a[i] == 0 && row2a[i] == 0) {
            const range = (i + 1) * 10

            const min = range - 10;
            const max = range;

            const generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            row3a[i] = generatedNumber == 0 ? generatedNumber + 1 : generatedNumber
            ++row3Count;
        }
    }

    const zerosIndices = row3a.reduce((indices, value, index) => {
        if (value === 0) {
            indices.push(index);
        }
        return indices;
    }, []);

    const randomIndices = [];
    while (row3Count < 5) {

        const randomIndex = zerosIndices[Math.floor(Math.random() * zerosIndices.length)];
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
            ++row3Count;
        }
    }

    randomIndices.forEach(index => {
        const columnIndex = index % 9;
        const [min, max] = columnRanges[columnIndex];
        let newRow3Item
        while (true) {
            newRow3Item = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!row1a.includes(newRow3Item) && !row2a.includes(newRow3Item))
                break
        }

        row3a[index] = newRow3Item
    });


    for (let i = 0; i < 9; i++) {
        if (row1a[i] !== 0 && row2a[i] !== 0) {
            if (row1a[i] > row2a[i]) {
                const k = row1a[i]
                row1a[i] = row2a[i]
                row2a[i] = k
            }
        }
        if (row1a[i] != 0 && row3a[i] !== 0) {
            if (row1a[i] > row3a[i]) {
                const k = row1a[i]
                row1a[i] = row3a[i]
                row3a[i] = k
            }
        }
        if (row2a[i] != 0 && row3a[i] !== 0) {
            if (row2a[i] > row3a[i]) {
                const k = row2a[i]
                row2a[i] = row3a[i]
                row3a[i] = k
            }
        }
    }


    const myTicket = [row1a,row2a,row3a]

    return myTicket;
}

module.exports = GenerateTicketData