'use strict';

/* Controllers */


function MyCtrl1($scope) {
	//console.log($scope);
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];



var rootsController = function($scope){
	console.log( 'rootsController - ' + $scope );
	angular.element('#input').focus();
	$scope.submit = function(){
		console.log('submit - '+ $scope.input);
		//$scope.st.onClick( $scope.input );
	}
	$scope.change = function(){
		console.log('change - ' + $scope.input);
		if($scope.input && $scope.input.trim().length >= 1){
			var arr = $scope.input.split(''), output = '';
			$scope.rootoutput = [];
			$.each(arr, function(i, chr){
				var text = ARABIC_LETTER_MAP[ chr ];
				if(text){ $scope.rootoutput.push( {letter: EnToAr(chr), info: text } ); }
			});
			
			if($scope.input.trim().length >= 3){
				var text = meaning($scope.input.trim() );
				$scope.rootmeaning = [];
				if(text){ $scope.rootmeaning.push( { root: EnToAr( $scope.input.trim() ), info: text} ); }
			}else{$scope.rootmeaning = []; $('#meaning').html('');}
		}else{ $scope.rootoutput = [];  }
		//$scope.st.onClick( $scope.input );
	}
	$scope.treeClick = function(){
		$scope.input = $('#debug').val();
		console.log('treeclick = ' + $scope.input);
		console.log( st );
		$scope.st = st;
	}
}

var _meanings;
var meaning = function(root){
	if(!_meanings || _meanings.length <= 0){
		$.get('data/meanings.js', function(meanings){
			_meanings = meanings;
			$('#meaning').html( lookupMeaning(root) || EnToAr(root) + ': No data found!' +'<HR>'); //return lookupMeaning(root);
		});	
	}
	else{ 
		$('#meaning').html(''); return lookupMeaning(root); 
	}
}

var lookupMeaning = function(root){
			for(var i=0; i < meanings.length; ++i){ 
				if (meanings[i].RootCode == root){ 
					console.log( meanings[i] );
					return meanings[i].Meanings;
				} 
			}
}

/************************ DATA ***********************/
var ARABIC_LETTER_MAP = {
"A": "-First -Reference -Manifest itself",
"b": "-Medium -Bring",
"t": "-Time -Following / Retrospective -Self",
"v": "-Relation -Affiliate -Pair",
"j": "-Assembly -Join",
"H": "-Life -Benefit -Live",
"x": "-Creation -Composition / Decomposition -Create",
"d": "-Direction -Tend towards",
"*": "-Carrying a representation -Represent -Substitute",
"r": "-Order -Command",
"z": "-Separation -Slice",
"s": "-In progress -Support -Energy Flowing",
"$": "-Radiance -Diffusion -Spread",
"S": "-Homogeneity -Consistent -Full (i.e. a Solid Block)",
"D": "-Lower plan -Properties -Earth",
"T": "-Establish -Surface -Axis",
"Z": "-Appearance -Extend",
"E": "-Œil -Perception -See",
"g": "-Veil -Cover",
"f": "-Inside -Breath -Insert",
"q": "-Conscience -Existence -Stand",
"k": "-Similarity -Other like me -Likeness",
"l": "-Service -For -Provide",
"m": "-Place -Thing -Being",
"n": "-Us -Generic -Unite",
"h": "-Him -The retract (invisible) -Souvenir",
"w": "-Add up -Fastening -Passive -Attach",
"y": "-Me -Will -Power",
"'": "-Brevity -Stop" //Hamza

/*
http://i256.photobucket.com/albums/hh162/speed2kx/ARABIC-LETTER-ORIGINS-2.png
http://www.meru.org/Sufi/alphacha.html
http://ia600806.us.archive.org/34/items/MeaningOfTheSemitLetters/AlphabetOrigin.pdf
http://www.scribd.com/doc/78886389/Arabic-Letters-Merged-to-Make-Meaning-Awesome-Srsmantique
http://www.scribd.com/doc/78886898/Arabic-Letters-Combined-to-Make-Meaning-2-3dsmantique
*/
}