$(document).ready(function(){

	
	var solutionsGame=[["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];
	var availableIds=["1","2","3","4","5","6","7","8","9"];
	
	var userArr=[];
	var computerArr=[];

	var onePlayer=true;

	var userX=true;

	var turnUser=true;

	
	var clickable=["#1","#2","#3","#4","#5","#6","#7","#8","#9"];
	/************************************* Function to Clear the table*******************************************/
	function clear(input){
		availableIds=["1","2","3","4","5","6","7","8","9"];
		userArr=[];
		computerArr=[];
		solutionsGame=[["1","2","3"],["4","5","6"],["7","8","9"],["1","4","7"],["2","5","8"],["3","6","9"],["1","5","9"],["3","5","7"]];

		$("table td").empty();
		$("div.square2 div:last-child").remove();
		
		$("table").animate({opacity:1});
		$("table td").removeClass("unClickable");

		if(onePlayer==true){
			if(turnUser==true){
				$("#yourT").html("<p>Your Turn</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
			} else {
				$("#yourT").html("<p>Computer Turn</p>").css({"padding-left":"60%","font-size":"1.5em"}).animate({top:"-2em"},"slow",displayComp);
			}
		} else /*(onePlayer==false)*/{
			if(turnUser==true){
				$("#yourT").html("<p>Go Player 1</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
			} else /*turnUser==false*/ {
				$("#yourT").html("<p>Go Player 2!</p>").css({"padding-left":"60%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
			}
		}
	}
	
	/*****************************Function to put the line*******************************************************/

	function line(){
		var myText="";

		if(onePlayer==true){
			if(turnUser==true){
				myText= "You win!";
			} else /*turnUser==false*/ {
				myText="Computer Wins!";
			}
		} else /*onePlayer==false*/{
			if(turnUser==true){
				myText= "Player 1 wins!";
			} else /*turnUser==false*/ {
				myText="Player 2 wins";
				}
			}
		
    
    if(availableIds.length==0){
			myText="It was a draw!";
		}

		var handle=function(){
			$("<div>"+myText+"</div>").css({
							fontSize:"2em",
							position:"absolute",
							top:"45%",
							left:"25%",
							zIndex:9999,
							}).appendTo($(".square2").css({position:"relative"}))

		}
		$("table").delay(1000).animate({
  					opacity:0.25,
  						},2000,handle);

		setTimeout(function(){
			clear();
		},7000);
	}

	/************************************* Function to color winner line ****************************************/

	function displayWinner(input){
		input.forEach(function(element,index){
  			input[index]="#"+element;
			})
		var selector=input.toString();
		$(selector).addClass("lineColor");
		$("#yourT").animate({top:"+2em"},"slow");

		setTimeout(function(){
			$(selector).removeClass("lineColor");
		},6000),
		line();

	}


	/******************************* Function to check line*******************************************************/

	function checkLine(input){
		for(var i=0;i<solutionsGame.length;i++){
				 var result=solutionsGame[i].every(function(elem){
		              return input.includes(elem)==true;
		            })
				
				if(result==true){
					return solutionsGame[i];
				}
			};
	}

	/*********************************Residual Computer Value********************************************************/
	function residual(){
			var result="";
			var rand=Math.floor(Math.random()*availableIds.length);

			result=availableIds[rand];

			return result;
	}

	/******************************* Second Computer Value *******************************************************/

	function compCheck1(){
		console.log("compcheck1 starts");
		
			for(var i=0;i<solutionsGame.length;i++){
				if(solutionsGame[i].includes(computerArr.toString())==true && solutionsGame[i].includes(userArr.toString())==false){
					console.log("solutionsGame: "+solutionsGame[i]);
					for(var k=0;k<solutionsGame[i].length;k++){
						if(solutionsGame[i][k]!=computerArr.toString() ){
							console.log("Bingo second computer value");
							return solutionsGame[i][k];
							}
						}
					}
			}
		
		return residual();
	}

	/************************************* Min user value******************************************/

	function minUser(){
		console.log("minUser starts");
		for(var i=0;i<availableIds.length;i++){
				console.log("availableIds: "+availableIds[i]);
			var myArr=userArr.slice();
			myArr.push(availableIds[i]);
			if(checkLine(myArr)){
				console.log("Don't do Line!"+availableIds[i]);
				return availableIds[i];
			}

		}

		return compCheck1();
	}

	/**************** Max computer value*******************************/

	function maxComputer(){
			console.log("maxComputer starts");
			for(var i=0;i<availableIds.length;i++){
				var myArr=computerArr.slice();
				myArr.push(availableIds[i]);
				if(checkLine(myArr)){
					console.log("Bingo Line!!!!"+availableIds[i]);
					
					return availableIds[i];
				}
								
			}

			return minUser();
									
	}

	function computer(){
		return maxComputer();

	}


	/*********************Function to display computer values ***********************************************/

	function displayComp(){
		var result=computer();
		if(userX==true){
				$("<div>O</div>").css({"font-weight":"bold",
												position:"absolute",
												top:"45%",
												left:"45%",
												zIndex:9999}).appendTo($("#"+result).css({position:"relative"}));
				//$("#"+result).html("O").css({"font-weight":"bold"});

		} else /*userX==false*/ {
				$("<div>X</div>").css({"font-weight":"bold",
												position:"absolute",
												top:"45%",
												left:"45%",
												zIndex:9999}).appendTo($("#"+result).css({position:"relative"}));
				//$("#"+result).html("X").css({"font-weight":"bold"});
			}

		computerArr.push(result);
		availableIds.splice(availableIds.indexOf(result),1);

		$("#"+result).addClass("unClickable");
		clickable.splice(clickable.indexOf("#"+result),1);
		console.log("clickable: "+clickable);


		console.log("userArr: "+userArr+" ;computerArr: "+computerArr+" ;availableIds: "+availableIds);	

		var solution=checkLine(computerArr);

		if(solution!=undefined){
			displayWinner(solution);
			return;
		} 

		if(availableIds.length==0){
			$("#yourT").animate({top:"+2em"},"slow");
			line();
			return;
		}
		
		$("#yourT").animate({top:"+2em"},"slow",function(){
			$("#yourT").html("<p>Your Turn</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
					
		})// your turn flag
				
		turnUser=true;
		$(clickable.toString()).removeClass("unClickable");

	}

	/************************************** One Player ***************************************************/

	$("#onePl").click(function(){
		onePlayer=true;
		$("#firstP,#onePl,#twoPl").fadeOut("slow",function(){
			$("#secondFirstP,#theX,#theO,#theBack").fadeIn("slow");
				});
		
		$("#theBack").click(function(){
			$("#secondFirstP,#theX,#theO,#theBack").hide();
			$("#firstP,#onePl,#twoPl").fadeIn("slow");
		})

		$("p#theX, p#theO").on("click",function(){
			if(this.id=="theX"){
				userX=true;
			} else /* this.id==theO*/ {
				userX=false;
			}
			console.log("userX: "+userX);

			var rand=Math.random();
			if(rand<0.5) {
					turnUser=true;
					$("#yourT").html("<p>Your Turn</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
				} else {
					turnUser=false;
					$("#yourT").html("<p>Computer Turn</p>").css({"padding-left":"60%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
					$("table td").addClass("unClickable");
					displayComp();
					
			}

			$("#secondFirstP,#theX,#theO,#theBack").fadeOut("slow",function(){
				$("#span1,#span2,#reset").css("visibility","visible");
				$("table").fadeIn("slow");

			});

		});

	})

/***************************************Two Players **********************************************************/

	$("#twoPl").click(function(){
		onePlayer=false;
		$("#firstP,#onePl,#twoPl").fadeOut("slow",function(){
			$("#thirdFirstP,#theX,#theO,#theBack").fadeIn("slow");
				});
		$("#theBack").click(function(){
											
			$("#thirdFirstP,#theX,#theO,#theBack").hide();
			$("#firstP,#onePl,#twoPl").fadeIn("slow");
		})


		$("p#theX, p#theO").on("click",function(){

			if(this.id=="theX"){
				userX=true;
			} else /* this.id==theO*/ {
				userX=false;
			}

			var rand=Math.random();
			if(rand<0.5)/*Player 1*/ {
					turnUser=true;
					$("#yourT").html("<p>Go Player 1!</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
				} else /* Player 2*/ {
					turnUser=false;
					$("#yourT").html("<p>Go Player 2!</p>").css({"padding-left":"60%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
					
			}
			
			$("#thirdFirstP,#theX,#theO,#theBack").fadeOut("slow",function(){
				$("#span1,#span2,#reset").css("visibility","visible");
				$("table").fadeIn("slow");
			});

		});
	});

	/*************************************************** Clicks *********************************************************/

	$("table td").on("click",function(){
			if(onePlayer==true){
				/*************************** Click of one Player ********************************************/
				console.log("onePlayer: "+onePlayer);
				if(userX==true){
					$("<div>X</div>").css({"font-weight":"bold",
												position:"absolute",
												top:"45%",
												left:"45%",
												zIndex:9999}).appendTo($(this).css({position:"relative"}));
					
				} else /*userX==false*/{
					$("<div>O</div>").css({"font-weight":"bold",
												position:"absolute",
												top:"45%",
												left:"45%",
												zIndex:9999}).appendTo($(this).css({position:"relative"}));
					
				}

			
			$("table td").addClass("unClickable");
			clickable.splice(clickable.indexOf("#"+this.id),1);
			

			userArr.push(this.id);



			var solution=checkLine(userArr);
			if(solution!=undefined){
				displayWinner(solution);
				return;
			}

			availableIds.splice(availableIds.indexOf(this.id),1);
			console.log("userArr: "+userArr+" ;computerArr: "+computerArr+" ;availableIds: "+availableIds);	
			// turnUser
    		if(turnUser==true){
				$("#yourT").animate({top:"+2em"},"slow",function(){
					$("#yourT").html("<p>Computer Turn</p>").css({"padding-left":"60%","font-size":"1.5em"}).animate({top:"-2em"},"slow",
						displayComp);
					
				});
				
				turnUser=false;
			} else /*turnUser==false*/ {
				$("#yourT").animate({top:"+2em"},"slow",function(){
					$("#yourT").html("<p>Your Turn</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow",
						displayComp);
					
				})
				
				turnUser=true;
			}

			} else {
				/***************************** Clicks of Two Players ************************************************/
				

				if(userX==true){
						$("<div>X</div>").css({"font-weight":"bold",
												position:"absolute",
												top:"45%",
												left:"45%",
												zIndex:9999}).appendTo($(this).css({position:"relative"}));
						userArr.push(this.id);
						availableIds.splice(availableIds.indexOf(this.id),1);
						console.log("availableIds two players: "+availableIds);
						console.log("userArr"+userArr);
						
						var solution=checkLine(userArr);
						
						if(solution!=undefined){
							displayWinner(solution);
							return;
						}
						if(availableIds.length==0){
							$("#yourT").animate({top:"+2em"},"slow");
							line();
							return;
						}
						
						userX=false;
					} else /*userX==false*/{
						$("<div>O</div>").css({"font-weight":"bold",
												position:"absolute",
												top:"45%",
												left:"45%",
												zIndex:9999}).appendTo($(this).css({position:"relative"}));
						computerArr.push(this.id);
						availableIds.splice(availableIds.indexOf(this.id),1);
						console.log("availableIds two players: "+availableIds);
						console.log("computerArr"+computerArr);
						
						var solution=checkLine(computerArr);

						if(solution!=undefined){
							displayWinner(solution);
							return;
						}
						if(availableIds.length==0){
							$("#yourT").animate({top:"+2em"},"slow");
							line();
							return;
						}
						
						userX=true;
				}

				$(this).addClass("unClickable");
				
				if(turnUser==true){
					$("#yourT").animate({top:"+2em"},"slow",function(){
						$("#yourT").html("<p>Go Player 2</p>").css({"padding-left":"60%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
						
					});
					
					turnUser=false;
				} else /*turnUser==false*/ {
					$("#yourT").animate({top:"+2em"},"slow",function(){
						$("#yourT").html("<p>Go Player 1</p>").css({"padding-left":"10%","font-size":"1.5em"}).animate({top:"-2em"},"slow");
						
					})
					
					turnUser=true;
				}


		}

		
		
	})


	/********************************************** Reset *************************************************************/

	$("#reset").click(function(){

		$("table").fadeOut();
		$("#span1, #span2, #reset").css("visibility","hidden");
		$("#yourT").animate({top:"+2em"},"slow",function(){
			window.location.reload(true);
			$("#firstP,#onePl,#twoPl").fadeIn("slow");
		});

	})

})