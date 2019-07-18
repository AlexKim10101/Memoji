'use strict';

const GameTime = 1;
const numberOfCardsToWin = 6;

var form;
var minutes;
var seconds;
var openCards;
var timeInSeconds
var firstClick
var goodClick
var cardBlockedOne;
var cardBlockedTwo;
var cardRejectedOne;
var cardRejectedTwo;
var cardApprovedOne;
var cardApprovedTwo;

var timer = document.getElementById('timer');
var bottomWrapper = document.getElementById('wrapperEndGameSlide');
var bottom = document.getElementById('endGameSlide__bottom');
var endGameSlideMessage = document.getElementById('endGameSlideMessage');


/* Создание формы */
function initForm(param) {
    var emojiArr = ['🐶','🐱','🐭','🐹','🐰','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐙','🐵','🦄','🐞','🦀','🐟','🐊','🐓','🦃'];//эмодзи для игры
    emojiArr.sort(mixArr);
    emojiArr.splice(numberOfCardsToWin, emojiArr.length-numberOfCardsToWin);//создаем 6 пар
    emojiArr = emojiArr.concat(emojiArr);
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
    
    emojiArr.forEach(function(emoj_item){    	
    	card = el.cloneNode(true);
        card.querySelector('.card__front').textContent = emoj_item;
        form.appendChild(card);
    })


};
//для перемешивания
function mixArr(a, b) {
    return Math.random() - 0.5;
}

//обработка клика
function cardFlip(event) {
    goodClick = false;
    let target = event.target;
    let card = target.classList.contains('card') ? target : target.closest('.card');

    if (!card) return;
    if(card.classList.contains('card--turn')){
        return;
    }
    else{
        card.classList.add('card--turn');             
        goodClick = true;
        if(cardBlockedOne){
            cardBlockedTwo = card;                
        }
        else{
            cardBlockedOne = card;            
            
        }      
    }

}
//логика игры
function validator(){

    if((cardRejectedTwo)&&(goodClick)){     

        cardRejectedTwo.classList.remove('card--reject');            
        cardRejectedOne.classList.remove('card--reject');
        cardRejectedTwo.classList.remove('card--turn');            
        cardRejectedOne.classList.remove('card--turn');
        cardRejectedOne = null;
        cardRejectedTwo = null;
        
    }
    if(cardBlockedTwo){
        if(cardBlockedOne.childNodes[0].textContent===cardBlockedTwo.childNodes[0].textContent){
            cardApprovedOne = cardBlockedOne;
            cardApprovedTwo = cardBlockedTwo;        
            cardApprovedOne.classList.add('card--approved');
            cardApprovedTwo.classList.add('card--approved');
            openCards++;
                         
        }
        else{
          
            cardRejectedOne = cardBlockedOne;
            cardRejectedTwo = cardBlockedTwo;            
            cardRejectedOne.classList.add('card--reject');
            cardRejectedTwo.classList.add('card--reject');              
                            
        }           
        cardBlockedOne = null;
        cardBlockedTwo = null;
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
    bottomWrapper.classList.toggle('to_be');
    
    if (timeInSeconds == 0){
        endGameSlideMessage.textContent = 'Lose';
    }
    else{
        endGameSlideMessage.textContent = 'Win';
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
    bottomWrapper.classList.remove('to_be');
    bottom.classList.remove('pushed');
    cardBlockedOne = null;
    cardBlockedTwo = null;
    cardRejectedOne = null;
    cardRejectedTwo = null;
    cardApprovedOne = null;
    cardApprovedTwo = null;
    firstClick = true;
    goodClick = false; 
    timeInSeconds = 60 * GameTime;
    timer.textContent = timeFormat(timeInSeconds);   
    openCards = 0;


    
    initForm({
        formId: 'gameField'
    });

    document.addEventListener('click',cardFlip);
    document.addEventListener('click',clock);
    document.addEventListener('click',validator);
    
    
}

//таймер
function clock(){
    if ((firstClick)&&(goodClick)){
        firstClick = false;
        var timerId = setInterval(function(){
            timer.textContent = timeFormat(timeInSeconds);            
            if ((timeInSeconds == 0)||(openCards == numberOfCardsToWin)){
                endGame();                
                clearInterval(timerId);
            }
            else{
                timeInSeconds--;
            }
            
        },1000)

    }
    

}



 

