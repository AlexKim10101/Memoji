'use strict';

var form;

var timer = document.getElementById('timer');
const GameTime = 1;
var timeInSeconds = 60 * GameTime;
var firstClick = true;
var minutes;
var seconds;
var open_cards;

var card__blocked__one;//"blocked" - означает, что не может быть перевернут
var card__blocked__two;//одновременно не может быть более 2 "blocked"
var card__rejected__one;//"rejected" - означает, что после сравнения, емоджи не совпали
var card__rejected__two;//одновременно не может быть более 2 "rejected"
var card__approved__one;//пришлось ввести для setTimeout
var card__approved__two;//пришлось ввести для setTimeout
var good__click = false;//good__click = true, если была перевернута карта. 
var bottom__wrapper = document.getElementById('wrapperEndGameSlide');
var bottom = document.getElementById('endGameSlide__bottom');
var endGameSlide__message = document.getElementById('endGameSlide__message');


/* Создание формы */
function initForm(param) {
    var emojiArr = ['🐊','🐵','🐷','🐰','🐶','🐟'];//эмодзи для игры
    emojiArr = emojiArr.concat(emojiArr);//создаем 6 пар
    emojiArr.sort(mixArr);//перемешиваем

    //далее создаем шаблон карточки

    form = document.getElementById(param.formId);
    
    var el = document.createElement('div');
    el.className='card';
    
    var front = document.createElement('div');
    front.className = 'card__front';

    var emoji = document.createElement('div');
    front.appendChild(emoji);
    el.appendChild(front);

    var back = document.createElement('div');
    back.className = 'card__back';
    el.appendChild(back);

    //создаем 12 карточек по шаблону
    var card;
    
    for (var i = 0; i < 12; i++) {
        card = el.cloneNode(true);
        card.querySelector('.card__front').textContent = emojiArr[i];
        form.appendChild(card);            
    }
};
//для перемешивания
function mixArr(a, b) {
    return Math.random() - 0.5;
}

//обработка клика
function cardFlip(event) {
    good__click = false;
    let target = event.target;
    let card = target.classList.contains('card') ? target : target.closest('.card');

    if (!card) return;
    if(card.classList.contains('card__turn')||card.classList.contains('card__reject')||card.classList.contains('card__approved')){
        return;
    }
    else{
        card.classList.add('card__turn');             
        good__click = true;
        if(card__blocked__one){
            card__blocked__two = card;                
        }
        else{
            card__blocked__one = card;            
            
        }      
    }

}
//логика игры
function validator(){

    if((card__rejected__two)&&(good__click)){     

        card__rejected__two.classList.remove('card__reject');            
        card__rejected__one.classList.remove('card__reject');
        card__rejected__two.classList.remove('card__turn');            
        card__rejected__one.classList.remove('card__turn');
        card__rejected__one = null;
        card__rejected__two = null;
        
    }
    if(card__blocked__two){
        if(card__blocked__one.childNodes[0].textContent===card__blocked__two.childNodes[0].textContent){
            card__approved__one = card__blocked__one;
            card__approved__two = card__blocked__two;

            setTimeout(function(){
                card__approved__one.classList.add('card__approved');
                card__approved__two.classList.add('card__approved');
                open_cards++;
            },250);             
        }
        else{
          
            card__rejected__one = card__blocked__one;
            card__rejected__two = card__blocked__two;
            setTimeout(function(){
                card__rejected__one.classList.add('card__reject');
                card__rejected__two.classList.add('card__reject');              
            },250);                
        }           
        card__blocked__one = null;
        card__blocked__two = null;
    }

}
//формат часов
function timeFormat(timeInSeconds){
    minutes = parseInt(timeInSeconds / 60, 10);
    seconds = parseInt(timeInSeconds % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ':' + seconds;

}    
//остановка игры
function endGame(){
    document.removeEventListener('click',cardFlip);
    document.removeEventListener('click',validator);
    document.removeEventListener('click',clock);
    bottom__wrapper.classList.toggle('to_be');
    
    if (timeInSeconds == 0){
        endGameSlide__message.textContent = 'Lose';
    }
    else{
        endGameSlide__message.textContent = 'Win';
    }
    setTimeout(function(){
        
    },1000);
    
}

function resultGame(){
    bottom.classList.add('pushed');
    setTimeout(function(){
       form.innerHTML = '';
        startGame(); 
    },100);
    
}




//начало игры
function startGame(){
    bottom__wrapper.classList.remove('to_be');
    bottom.classList.remove('pushed');
    card__blocked__one = null;
    card__blocked__two = null;
    card__rejected__one = null;
    card__rejected__two = null;
    card__approved__one = null;
    card__approved__two = null;
    good__click = false; 
    timeInSeconds = 60 * GameTime;
    timer.textContent = timeFormat(timeInSeconds);
    firstClick = true;
    open_cards = 0;


    
    initForm({
        formId: 'gameField'
    });
    document.addEventListener('click',cardFlip);
    document.addEventListener('click',validator);
    document.addEventListener('click',clock);
    
}

//таймер
function clock(){
    if ((firstClick)&&(good__click)){
        firstClick = false;
        var timerId = setInterval(function(){
            timer.textContent = timeFormat(timeInSeconds);            
            if ((timeInSeconds == 0)||(open_cards == 6)){
                endGame();                
                
                clearInterval(timerId);
            }
            else{
                timeInSeconds--;
            }
            
        },1000)

    }
    

}



 

