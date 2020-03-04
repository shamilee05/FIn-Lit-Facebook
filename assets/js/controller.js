$(document).ready(function () {
	
var questionNumber=0;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var result = new Array();
var resultNumber=0;

var obj = {
	table: []
 };

var user_category= 'beginner';

var flag = 0;
//0 for first turn ; 1 for the rest


//question bank[i][5] wwill store the id of the correct answer 
var score=0;

generate_firstquiz = function(length)
{
    var arr = [];
    var n;
    for(var i=0; i<3; i++)
    {
	    do
            n = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        while(arr.indexOf(n) !== -1)
       arr[i] = n;
	}
	for(var i=3; i<6; i++)
    {
	    do
            n = Math.floor(Math.random() * (18 - 9 + 1)) + 9;
        while(arr.indexOf(n) !== -1)
       arr[i] = n;
	}
	for(var i=6; i<9; i++)
    {
	    do
            n = Math.floor(Math.random() * (26 - 19 + 1)) + 19;
        while(arr.indexOf(n) !== -1)
       arr[i] = n;
    }
    return arr;
}

generate_beginner = function(length)
	{
		var arr = [];
		var n;
		for(var i=0; i<4; i++)
		{
			do
				n = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		for(var i=4; i<7; i++)
		{
			do
				n = Math.floor(Math.random() * (18 - 9 + 1)) + 9;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		for(var i=7; i<9; i++)
		{
			do
				n = Math.floor(Math.random() * (26 - 19 + 1)) + 19;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		return arr;
	}

generate_intermediate = function(length)
	{
		var arr = [];
		var n;

		for(var i=0; i<6; i++)
		{
			do
				n = Math.floor(Math.random() * (18 - 9 + 1)) + 9;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		for(var i=6; i<9; i++)
		{
			do
				n = Math.floor(Math.random() * (26 - 19 + 1)) + 19;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		return arr;
	}

generate_expert = function(length)
	{
		var arr = [];
		var n;
		for(var i=0; i<1; i++)
		{
			do
				n = Math.floor(Math.random() * (18 - 9 + 1)) + 9;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		for(var i=2; i<9; i++)
		{
			do
				n = Math.floor(Math.random() * (26 - 19 + 1)) + 19;
			while(arr.indexOf(n) !== -1)
		arr[i] = n;
		}
		return arr;
	}

$.getJSON('activity.json', function(data) {
	var arr;
	if(flag == 0)
	{
		arr = generate_firstquiz(3);
	}
	if(flag == 1)
	{
		if(user_category == 'beginner'){
			arr = generate_beginner();
		}
		else if(user_category == 'intermediate'){
			arr = generate_intermediate();
		}
		else if(user_category == 'expert'){
			arr = generate_expert();
		}
	}
	var q_number;
	var num = 0;
	for(i=0;i<data.quizlist.length;i++){ 
		console.log(arr)
		q_number = Number(data.quizlist[i].q_id);
		console.log("okay1")
		console.log(q_number)
		if(arr.indexOf(q_number)>=0)
		{
			console.log("okay2")
			questionBank[num]=new Array;
			questionBank[num][0]=data.quizlist[i].question;
			questionBank[num][1]=data.quizlist[i].option1;
			questionBank[num][2]=data.quizlist[i].option2;
			questionBank[num][3]=data.quizlist[i].option3;
			questionBank[num][4]=data.quizlist[i].option4;
			questionBank[num][5]=data.quizlist[i].correct; 
			num++;
		}
	}
	console.log(questionBank)
	numberOfQuestions=questionBank.length; 
	
		
	displayQuestion();
	})//gtjson
 
 



	function displayQuestion(){

		console.log(questionNumber);
		console.log(questionBank[questionNumber]);

		q1=questionBank[questionNumber][1];
		q2=questionBank[questionNumber][2];
		q3=questionBank[questionNumber][3];
		q4=questionBank[questionNumber][4];

		$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div><div id="4" class="option">'+q4+'</div>');

		$('.option').click(function(){
		if(questionLock==false){questionLock=true;	
		//correct answer
		if(this.id==questionBank[questionNumber][5]){
		$(stage).append('<div class="feedback1">CORRECT</div>');
		result[resultNumber] = 1;
		resultNumber++;
		score++;
		}
		//wrong answer	
		if(this.id!=questionBank[questionNumber][5]){
		$(stage).append('<div class="feedback2">WRONG</div>');
		result[resultNumber] = 0;
		resultNumber++;
		}
		setTimeout(function(){changeQuestion()},1000);
		}})
	}//display question

	
	
	function changeQuestion(){
	
		questionNumber++;
		console.log(questionNumber);

		if(stage=="#game1"){stage2="#game1";stage="#game2";}
			else{stage2="#game2";stage="#game1";}

		if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}

		$(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
		$(stage).animate({"right": "0px"},"slow", function() {$(stage).css('right','0px');questionLock=false;});
		}//change question

	function displayFinalSlide(){

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log("works");
					if(this.responseText == 'e')
					{
						user_category = 'expert';
					}
					if(this.responseText == 'i')
					{
						user_category = 'intermediate';
					}
					if(this.responseText == 'b')
					{
						user_category = 'beginner';
					}
			}
			};


			function reqListener (data) {
			user_category = this.responseText;
			console.log("printing user cat")
			console.log(user_category)
			document.getElementById("user_value").innerHTML = user_category;
			}


			xhttp.addEventListener("load", reqListener);
			xhttp.open("GET", "/ip?q1="+result[0]+'&q2='+result[1]+'&q3='+result[2]+'&q4='+result[3]+'&q5='+result[4]+'&q6='+result[5]+'&q7='+result[6]+'&q8='+result[7]+'&q9='+result[8], true);
			xhttp.send();
			
			$(stage).append('<div class="questionText">You have finished the quiz!<br><br>Total questions: '+numberOfQuestions+'<br>Correct answers: '+score+user_category+'</div>');

			xhttp.open("GET", "http://localhost:3000/updateusercat?uc="+user_category, true);
			xhttp.send();

		
			
	}//display final slide
  

});//doc ready
