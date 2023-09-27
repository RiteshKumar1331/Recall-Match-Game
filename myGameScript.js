var em = ["🍔","🌭","🍿","🍕","🍰","🥧","🥪","🍬","🍩","🍫","🍟","🥕","🍨","🍓","🍍","🌮","🧇","🌻","🏵️","🍭","🧀","🍎","🍉","🌶️","🥨","🍗","🥦","🥑","☕","🥭","🥝","🍒","🍇","🥥"];



//Shuffling above array
var tmp, c, p = em.length;
if(p) while(--p) {
   c = Math.floor(Math.random() * (p + 1));
   tmp = em[c];
   em[c] = em[p];
   em[p] = tmp;
}

//Variables
var pre="", pID, ppID=0, turn=0, t="transform", flip="rotateY(180deg)", flipBack="rotateY(0deg)", myTime, level, state;

//Resizing Screen
window.onresize = init;
function init() {
   W = innerWidth;
   H = innerHeight;
   $('body').height(H+"px");
   $('#ol').height(H+"px");
}

//Showing instructions
window.onload = function() {
    $("#ol").html(`<center><div id="inst"><h3>Welcome !</h3>Instructions for Playing the Game<br/><br/><li>By flipping the blocks, you can create pairs of similar blocks.</li><li>To flip a block you can click on it.</li><li>If you click on two blocks that are not similar, they will be flipped back.</li><p style="font-size:17px;"><br/>Click one of the following level to start the game.</p></div><button onclick="start(3, 4, 1)">Level 1 (3 x 4)</button> <button onclick="start(4, 4, 2)" style="w">Level 2 (4 x 4)</button><button onclick="start(4, 5,3)">Level 3 (4 x 5)</button><button onclick="start(5, 6,4)">Level 4 (5 x 6)</button><button onclick="start(6, 6,5)">Level 5 (6 x 6)</button></center>`);
}

//Starting the game
function start(r,l,i) {
    //Timer and moves
    min=0, sec=0, moves=0,state = i;
    $("#myMoves").html("Moves: 0");
    $("#myTime").html("Time: 00:00");

    myTime = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10) 
          $("#myTime").html("Time: 0"+min+":0"+sec);
      else 
        $("#myTime").html("Time: 0"+min+":"+sec);
    }, 1000);
    rem=r*l/2, noItems=rem;
    level = r+"x"+l;
    //Generating item array and shuffling it
    var items = [];
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    var tmp, c, p = items.length;
    if(p) while(--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }
    
    //Creating table
    $("table").html("");
    var n=1;
    for (var i = 1;i<=r;i++) {
        $("table").append("<tr>");
        for (var j = 1;j<=l;j++) {
           $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n-1]}</p></div></div></td>`);
           n++;
         }
         $("table").append("</tr>");
    }
    
    //Hiding instructions screen
    $("#ol").fadeOut(500);
}

//Function for flipping blocks
function change(x) {
  //Variables
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#"+x+" .inner .back";
  
  //Dont flip for these conditions
  if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {}
  
  //Flip
  else {
    $(i).css(t, flip);
    if (turn==1) {
      //This value will prevent spam clicking
      turn=2;
      
      //If both flipped blocks are not same
      if (pre!=$(b).text()) {
         setTimeout(function() {
            $(pID).css(t, flipBack);
            $(i).css(t, flipBack);
            ppID=0;
         },1000);
      }
      
      //If blocks flipped are same
      else {
          rem--;
          $(i).attr("flip", "block");
          $(pID).attr("flip", "block");
      }
      
      setTimeout(function() {
         turn=0;
         //Increase moves
         moves++;
         $("#myMoves").html("Moves: "+moves);
      },1150);
      
    }
    else {
      pre = $(b).text();
      ppID = x;
      pID = "#"+x+" .inner";
      turn=1;
    }
    
    //If all pairs are matched
    if (rem==0) {
          clearInterval(myTime);
          if (min==0) {
              myTime = `${sec} seconds`;
          }
          else {
              myTime = `${min} minute(s) and ${sec} second(s)`;
          }
          setTimeout(function() {
              $("#ol").html(`<center><div id="iol"><h2>Congratulations!</h2><p style="font-size:23px;padding:10px;">You completed the Level ${state} (${level}) in ${moves} moves. It took you ${myTime}.</p><p style="font-size:18px">You're a gaming legend!<br/>Play Again?</p><button onclick="start(3, 4,1)">Level 1 (3 x 4)</button> <button onclick="start(4, 4,2)" style="w">Level 2 (4 x 4)</button><button onclick="start(4, 5,3)">Level 3 (4 x 5)</button><button onclick="start(5, 6,4)">Level 4 (5 x 6)</button><button onclick="start(6, 6,5)">Level 5 (6 x 6)</button></div></center>`);
              $("#ol").fadeIn(750);
          }, 1500);
    }
  }
}
