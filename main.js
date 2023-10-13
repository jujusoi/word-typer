
const words = ['Hello', 'World', 'How', 'Are', 'You', 'Doing', 'Today'];

const selectRandomWord = (wordArray) => {
    const index = Math.floor(Math.random() * wordArray.length);
    return wordArray[index];
};

const updateTyper = (word) => {
    const body = document.querySelector('#typer-holder');
    if (body.childElementCount > 0) {
        body.innerHTML = '';
    };
    for (let i = 0; i < word.length; i++) {
        const p = document.createElement('p');
        if (i === 0) {
            p.classList.add('letter-active');
        }
        p.classList.add('letter-type');
        p.textContent = word[i].toLowerCase();
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
        if (indexOfActiveResult == childrenCount - 1) {
            console.log(`finished word`);
            updateTyper(selectRandomWord(words));
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

updateTyper(selectRandomWord(words));