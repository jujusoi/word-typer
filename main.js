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

const makeElements = () => {
    const selectionDiv = document.createElement('div');
    selectionDiv.classList.add('individual-save');
    const selectionh5 = document.createElement('h5');
    selectionh5.classList.add('selection-name');
    const selectionh5Span = document.createElement('span');
    selectionh5Span.classList.add('selection-name-num');
    const selectioncontent = document.createElement('p');
    selectioncontent.classList.add('saved-selection-word');
    const obj = {
        selectionDiv,
        selectionh5,
        selectionh5Span,
        selectioncontent
    };
    return obj;
};
const appendElements = (selectionDiv, selectionh5, selectionh5Span, selectioncontent) => {
    selectionh5.appendChild(selectionh5Span);
    selectionDiv.appendChild(selectionh5);
    selectionDiv.appendChild(selectioncontent);
    document.querySelector('#saved-selection').appendChild(selectionDiv);
};

const renderSelections = (res) => {
    const storageItems = JSON.parse(window.localStorage.getItem('savedSelections')) || [];
    if (res === 'one') {
        const { selectionDiv, selectionh5, selectionh5Span, selectioncontent } = makeElements();

        selectionh5.textContent = 'Selection '
        selectionh5Span.textContent = `${storageItems.length}:`;
        const content = storageItems[storageItems.length - 1].map((object) => object.word);
        selectioncontent.textContent = content.join(', ');

        appendElements(selectionDiv, selectionh5, selectionh5Span, selectioncontent);
    } else {
        for (let i = 0; i < storageItems.length; i++) {

            const { selectionDiv, selectionh5, selectionh5Span, selectioncontent } = makeElements();
            
            selectionh5.textContent = 'Selection '
            selectionh5Span.textContent = `${i + 1}:`;
            const content = storageItems[i].map((object) => object.word);
            selectioncontent.textContent = content.join(', ');

            appendElements(selectionDiv, selectionh5, selectionh5Span, selectioncontent);    
        };
    };
};

document.querySelector('#save-selection-button').addEventListener('click', function(event) {
    const storageItems = window.localStorage.getItem('savedSelections') || [];
    if (storageItems.length > 0) {
        const parsedStorageItems = JSON.parse(storageItems);
        parsedStorageItems.push(wordArray);
        console.log(parsedStorageItems);
        window.localStorage.setItem('savedSelections', JSON.stringify(parsedStorageItems));
    } else {
        storageItems.push(wordArray);
        window.localStorage.setItem('savedSelections', JSON.stringify(storageItems));
    };
    renderSelections('one');
});

document.querySelector('#reset').addEventListener('click', function(event) {
    wordArray = [];
    document.querySelector('#typer-holder').innerHTML = '', document.querySelector('#translation').innerHTML = '';
    updateChosenList(wordArray.map((object) => object.word));
    updateScore(0);
});

document.querySelector('#start-button').addEventListener('click', function(event) {
    updateTyper(selectRandomWord(wordArray))
});

renderSelections('all');