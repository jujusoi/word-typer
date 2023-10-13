
const words = [ {
    word: 'cappello',
    translation: 'hat',
}, {
    word: 'zaino',
    translation: 'backpack',
}, {
    word: 'specchio',
    translation: 'mirror',
}, {
    word: 'scontrino',
    translation: 'receipt',
}, {
    word: 'maglione',
    translation: 'sweater',
}, {
    word: 'camicia',
    translation: 'shirt',
}, {
    word: 'io ho bisogno di',
    translation: 'i need',
}, {
    word: 'cento',
    translation: 'one hundred',
}, {
    word: 'cinquanta',
    translation: 'fifty',
}, {
    word: 'dieci',
    translation: 'ten',
}];
let score = 0;

const selectRandomWord = (wordArray) => {
    const index = Math.floor(Math.random(0) * wordArray.length);
    return wordArray[index];
};

const updateTyper = (obj) => {
    const body = document.querySelector('#typer-holder');
    const translation = document.querySelector('#translation');
    if (body.childElementCount > 0) {
        body.innerHTML = '';
        translation.innerHTML = '';
    };
    translation.textContent = `"${obj.translation}"`;
    for (let i = 0; i < obj.word.length; i++) {
        const p = document.createElement('p');
        if (i === 0) {
            p.classList.add('letter-active');
        }
        p.classList.add('letter-type');
        p.textContent = obj.word[i].toLowerCase();
        body.appendChild(p);
    };
};

window.addEventListener('keydown', (event) => {
    const holder = document.querySelector('#typer-holder');
    const childrenCount = holder.childElementCount;

    const key = event.key;
    let active = document.querySelector('.letter-active').textContent.toLowerCase();

    const indexOfActiveResult = indexOfActive(childrenCount, holder);

    if (key === active) {
        document.querySelector('.letter-active').classList.remove('letter-active');
        changeWordColor(holder.children[indexOfActiveResult]);
        if (indexOfActiveResult == childrenCount - 1) {
            setTimeout(() => {
                updateTyper(selectRandomWord(words));
                updateScore(score++);
            }, 500)
        } else {
            active = holder.children[indexOfActiveResult + 1];
            active.classList.add('letter-active');
        }
    };
});

const indexOfActive = (childcount, holder) => {
    let index;
    for (let i = 0; i < childcount; i++) {
        if (holder.children[i].classList.contains('letter-active')) {
            index = i;
        };
    };
    return index;
};

const changeWordColor = (word) => {
    word.classList.add('letter-correct');
};

const updateScore = (score) => {
    document.querySelector('#score').textContent = score;
};

updateTyper(selectRandomWord(words));
