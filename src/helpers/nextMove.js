export function calculateNextMove(square){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(square[i][j]===null){
				return [i,j];
			}
		}
	}
}