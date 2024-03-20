    // let score = {
		// 	wins : 0,
		// 	losses : 0,
		// 	ties : 0,
		// };

		// let scoreFromLastSession = localStorage.getItem('score');
		// console.log(scoreFromLastSession);
		// score = JSON.parse(scoreFromLastSession);

	let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses : 0,
            ties : 0
    };

    updateScoreElement();

    // if(!score){
    // 	score = {
    // 		wins: 0,
    // 		losses : 0,
    // 		ties : 0
    // 	}
    // }

    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r'){
            playGame('rock');
        }else if(event.key === 'p'){
            playGame('paper');
        }else if(event.key === 's'){
            playGame('scissors');
        }
     });

    function ResetScore(){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;			
        updateResult_MovesElement('','');
        updateScoreElement();
        localStorage.removeItem('score');
    }

    function playGame(playerMove){
        
        let result = '';
        const computerMove = pickComputerMove()
        if(computerMove === playerMove){
            result = 'Tie';
            score.ties += 1;
        }else if(computerMove === 'paper' && playerMove === 'rock' || computerMove === 'scissors' && playerMove === 'paper' || computerMove === 'rock' && playerMove === 'scissors'){
            result = 'You lose';
            score.losses += 1;
        }else if(computerMove === 'scissors' && playerMove === 'rock' || computerMove === 'rock' && playerMove === 'paper' || computerMove === 'paper' && playerMove === 'scissors'){
            result = 'You Win';
            score.wins += 1;
        }

        updateResult_MovesElement(result, playerMove, computerMove);

        localStorage.setItem('score', JSON.stringify(score));
        
        updateScoreElement();

        // alert(`You chose ${playerMove} and Computer chose ${ComputerMove}. ${result} \nWins : ${score.wins} Losses: ${score.losses} Ties : ${score.ties}`);
    }

    function updateScoreElement(){
        document.querySelector('.js-score').innerHTML = `Wins : ${score.wins} Losses: ${score.losses} Ties : ${score.ties}`;
    }

    function updateResult_MovesElement(result, playerMove, computerMove){
        
        document.querySelector('.js-result').innerHTML = result;
        if(playerMove !== '' && computerMove !== ''){
            document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
        }else{
            document.querySelector('.js-moves').innerHTML = '';
        }
    }

    function pickComputerMove(){
        
        let ComputerMove = '';
        const randomNumber = Math.random();
        if(randomNumber >= 0 && randomNumber < 0.3){
            ComputerMove = 'rock';
        }else if (randomNumber >= 0.3 && randomNumber < 0.7){
            ComputerMove = 'paper';
        }else if(randomNumber >= 0.7 && randomNumber < 1){
            ComputerMove = 'scissors';
        }
        return ComputerMove;
    }
    
    let intervalId = 0;
    function autoPlay(){
        let autoPlayState = document.querySelector('.autoPlay-button').innerHTML
        if(autoPlayState === 'Auto Play'){
            document.querySelector('.autoPlay-button').innerHTML = 'Stop Play';
            intervalId = setInterval(function(){
                let playerMove = pickComputerMove();
                playGame(playerMove);
            }, 2000);
        }else if(autoPlayState === 'Stop Play'){
            clearInterval(intervalId);
            document.querySelector('.autoPlay-button').innerHTML = 'Auto Play';
        }
    }