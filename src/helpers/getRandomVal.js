/*
* return random number between 1 and 4
*/
function getRandomNumber(){
	return ( Math.floor(Math.random()*4) + 1 );
}


/*
* return random array of {@count} length
*/
function getRandomString(count){
	var randomStringArr = [];
	for(var i=0;i<count;i++){
		randomStringArr.push(getRandomNumber());		
	}
	return randomStringArr;
}

/*
* return game array
*/
export function getRandomStringArray(){
	var randomArr = [];
	for(var i=0; i < 20 ;i++ ){
		randomArr.push(getRandomString(i+1));
	}

	return randomArr;
}