'use strict';

// Код валидации формы
/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports.initForm;
module.exports.gamePlay;
var form;

/* Создание формы */
function initForm(param) {
    var emojiArr=['🦃','🐵','🐹','🐰','🐶','🐟'];
    form = document.getElementById(param.formId);
    
    var el=document.createElement('div');
    el.className='card';
    
    var front=document.createElement('div');
    front.className='card__front';

    var emoji=document.createElement('div');
    front.appendChild(emoji);
    el.appendChild(front);

    var back=document.createElement('div');
    back.className='card__back';
    el.appendChild(back);

    var c;
    var card;
    for (var i=0; i<2; i++) {
        emojiArr.sort(mixArr); /* Перемешиваем массив случайным образом */
        for (var j=0; j<6; j++) {
            card=el.cloneNode(true);
            card.querySelector('.card__front').textContent=emojiArr[j];
            form.appendChild(card);
        }    
    }
};

function mixArr(a, b) {
    return Math.random() - 0.5;
}

/* обработка событий */
function gamePlay() {

    let cards = document.querySelectorAll('card');

    document.addEventListener('click',cardFlip);

    function cardFlip(event) {
        let target = event.target;
        let card = target.classList.contains('card') ? target : target.closest('.card');

        if (!card) return;
        card.classList.toggle('card__turn');


        /*if (card.classList.contains('card__reserve')){
            return;
        }
        else{
            let rejected_arr = Array.from(document.querySelectorAll('.card__reject'));
            if (rejected_arr.length == 2){
                rejected_arr[0].remove('card__reject');
                rejected_arr[1].remove('card__reject');
                card.classList.toggle('card__turn');
                card.classList.add('card__reserve');
            }
            else{
                let reversed_item = Array.from(document.querySelector('.card__reserve'));
                if (reversed_item){
                    if(reversed_item.childNodes[1].textContent == card.childNodes[1].textContent){
                        reversed_item.classList.add('card__approved');
                        reversed_item.classList.remove('card__reserve');
                        card.classList.add('card__approved');     
                    }
                    else{
                        reversed_item.classList.remove('card__reserve')
                        reversed_item.classList.add('card__reject')
                        card.classList.add('card__reject')
                    }
                }
                else{
                    card.classList.toggle('card__turn');
                    card.classList.toggle('card__reserve');
                }

            }
    
        }*/
        
    }
}    

