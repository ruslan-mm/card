// 1. Создать карту с полями: number, isOpen, isFrozen.
// 2. Создать пустовой массив. Положить карты в массив. У каждой следующей карты будет number +1 до 8. Повторить это еще раз
// 3. Открыть карту. Значение поля isOpen присваиваю true. Запускаю цикл, в котором проверяю значение поля isFrozen. Если таких карт четное кол-во или 0, меняю значение поля isFrozen этой карты на true. Если нет, сравниваю number этой карты с number карты, у которой значения полей isOpen и isFrozen true. Если number совпадают, оставляю isFrozen = true, а isOpen обеих карт присваиваю false. 

// 1. Открыть карту
// 2. Присвоить полю isOpen значение true
// 3. Объявил переменную в конструкторе cardWithFrozen
// 4. Присвоил переменной cardWithFrozen значение 0
// 5. Взял объект
// 6. Если izFrozen == true, cardWithFrozen++, перешел в п.5
// 7. Если нет, перешел в п.5
// 8. Взял объект
// 9. Если cardWithFrozen равно 0 или четное, поле isFrozen объекта = true
// 10. Если нет, беру первый объект, сравниваю поля isOpen и isFrozen с true
// 11. Если поля true, сравниваю поле value с полем value из п.8
// 12. Если поля или поле false п.10
// 13. Если значение полей value совпадает, обоим объектам в поле isFrozen присваиваю true, а в поле isOpen false
// 14. Если не совпадают, всем полям false
// 4. Далее условие: если таких карт четное кол-во или 0, меняю значение поля isFrozen этой карты на true, если нет, сравниваю значение поля value у этой карты, и у той, у которой и isOpen и isFrozen имеют значение true
// 5. Если значения полей value совпадают, то обоим объектам в поле isFrozen присваиваю true, а в поле isOpen false, в противном случае всем полям false

// 1. открыть карту
// 2. проверить есть ли в игре открытые карты
// 3. если есть, то сравнить карты
// 4. если карты одинаковы — заморозить их
// 5. иначе закрыть обе карты
// 6. если открытых карт нет — то запомнить текущую как открытую

class Card {
    constructor(value) {
        this.value = value;
        this.isOpen = false;
        this.isFrozen = false;
    }
}

class Game {
    constructor(container) {
        this.container = container;
        this.cardArray = [];
        this.cardHasOpen = false;
        this.cardWithFrozen = 0;
        this.pushArray(4);
        // this.mixArray();
        // this.renderCard();
    }

    pushArray(value) {
        // console.log(value)
        this.cardArray = [];
        for (let i = 0; i < (Number(value)/2); i++) {
            this.cardArray.push(new Card(i), new Card(i))
        }
        // console.log(this.cardArray)
        this.mixArray();
        // console.log(this.cardArray)
        this.renderCard();
        console.log(this.cardArray)
    }

    mixArray() {
        for (let i = this.cardArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let buffer = this.cardArray[i]; 
            this.cardArray[i] = this.cardArray[j]; 
            this.cardArray[j] = buffer;
          }
    }

    openCard(position) {
        if (this.cardWithFrozen === this.cardArray.length) {
            console.log(`Игра окончена`)
        }
        else {
            this.cardArray[position].isOpen = true;
            this.renderCard();
            if (this.cardHasOpen === false) { //если не открыта ни одна карточка
                this.cardHasOpen = this.cardArray[position]; //тогда присваиваемой полю cardHasOpen эту карточку
                // this.renderCard();
            }
            else { //если открыта одна карточка
                if (this.cardHasOpen.value === this.cardArray[position].value) { //если значение value 2х карточек равны
                    this.cardHasOpen.isFrozen = true; //то мы замораживаем обе карточки
                    this.cardArray[position].isFrozen = true;
                    this.cardWithFrozen += 2; // увеличиваем счетчик замороженных карточек
                    this.cardHasOpen = false;
                    this.renderCard();
                }
                else { //если карточки не равны
                    setTimeout(() => {
                        this.cardHasOpen.isOpen = false;
                        this.cardArray[position].isOpen = false;  
                        this.cardHasOpen = false;
                        this.renderCard();
                        console.log(this.cardArray)
                    }, 200)
                }
            }
        }
    }

    renderCard() {
        this.container.innerHTML = '';

        const divGame = document.createElement('div');
        divGame.style = `
        display: flex;
        width: 1000px;
        min-height: 500px;
        justify-content: space-around; 
        align-items: center;
        flex-wrap: wrap;
        `
        this.container.append(divGame)

        this.cardArray.forEach((card, index) => {
            const divCard = document.createElement('div');
            divCard.onclick = () => {
                this.openCard(index);
                console.log(`Клик произошел на ${index} элементе`, card)
            }
            if (card.isOpen === true) {
                divCard.style = `
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 240px;
                height: 120px;
                background: none;
                font-size: 50px;
                border: 1px solid black;
                `
                divCard.innerHTML = card.value;
            }
            else {
                divCard.style = `
                min-width: 240px;
                height: 120px;
                background-color: rgba(72, 122, 180, .7);
                cursor: pointer;
                border: 1px solid black;
                `
            } 

            divGame.append(divCard)
        })  
        const divDescr = document.createElement('div');
        this.container.append(divDescr)

        const buttonDescr = document.createElement('button');
        buttonDescr.innerHTML = 'Сыграть еще раз'
        if (this.cardWithFrozen === this.cardArray.length) {
            divDescr.append(buttonDescr)
            this.cardWithFrozen = 0;
        }
        buttonDescr.onclick = () => {
            // this.container.innerHTML = '';
            this.pushArray(4);
        }
        // console.log(this.cardArray);

        const divForm = document.createElement('form')
        divDescr.append(divForm)

        const gameInput = document.createElement('input');
        gameInput.placeholder = 'Введите количество карт';
        divForm.append(gameInput);

        const btnForInput = document.createElement('button')
        btnForInput.innerHTML = 'Запустить новую игру с выбранным количеством карт';
        btnForInput.onclick = () => {
            console.log(gameInput.value);
            this.pushArray(gameInput.value);
        }
        divForm.append(btnForInput)

    }
}

const newGame = new Game(document.querySelector('#container'))



// this.cardArray[position].isOpen = true;
// this.cardArray.forEach(value => {
//     if (value.isFrozen === true) this.cardWithFrozen++;
// })
// this.cardArray.forEach(value => {
//     if (this.cardWithFrozen % 2 === 0 && value.isOpen === true) {
//         value.isFrozen = true;
//         this.currentIndex = this.cardArray.indexOf(value);
//         console.log(this.currentIndex)
//     }
//     else {
//         if (this.cardArray[position].number === this.cardArray[this.currentIndex].number) {
//             this.cardArray[position].isOpen = false;
//             this.cardArray[position].isFrozen = true;
//             this.cardArray[this.currentIndex].isOpen = false;
//         }
//         else {
//             this.cardArray[position].isOpen = false;
//             this.cardArray[position].isFrozen = false;
//             this.cardArray[this.currentIndex].isOpen = false;
//             this.cardArray[this.currentIndex].isFrozen = false;
//         }
//     }
// })
// this.cardArray[position].isFrozen = true;
// // this.isOpen++;
// // this.isFrozen++;
// console.log(this.cardArray);