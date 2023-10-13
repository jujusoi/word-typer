const formSbmt = document.querySelector('#form-submit');
let wordArray = [];

formSbmt.addEventListener('submit', function(event) {
    event.preventDefault();
    const wordValue = document.querySelector('#word-input').value.trim();
    const translationValue = document.querySelector('#translation-input').value.trim();
    if (wordValue && translationValue) {
        const obj = {
            word: wordValue,
            translation: translationValue
        };
        wordArray.push(obj);
        updateChosenList(wordArray.map((object) => object.word));
        clearForm();
        document.querySelector('#word-input').focus();
    };
});

const clearForm = () => {
    document.querySelector('#word-input').value = '';
    document.querySelector('#translation-input').value = '';
};

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
    if (document.querySelector('.letter-active')) {
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
                    updateTyper(selectRandomWord(wordArray));
                    updateScore(score++);
                }, 500)
            } else {
                active = holder.children[indexOfActiveResult + 1];
                active.classList.add('letter-active');
            }
        };
    }
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

const updateChosenList = (arr) => {
    if (arr.length === 0) {
        document.querySelector('#chosen-words-list').textContent = 'No words selected';
    } else {
        document.querySelector('#chosen-words-list').textContent = arr.join(', ');
    }
};

document.querySelector('#reset').addEventListener('click', function(event) {
    wordArray = [];
    document.querySelector('#typer-holder').innerHTML = '', document.querySelector('#translation').innerHTML = '';
    updateChosenList(wordArray.map((object) => object.word));
    updateScore(0);
});

document.querySelector('#start-button').addEventListener('click', function(event) {
    updateTyper(selectRandomWord(wordArray))
});