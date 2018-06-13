var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

var st1=0;
var st2=0;
var ct=0;
var timeoutId = null;
var a1id=null;
var result=false;
var score=0;
var health=5;
var scoreid=null;
var ang;
var ang2;
var ct1=0;
var ct2=0;
var tx=900;
var ctxx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var ct3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var angles= [0.0,0.0,0.0,0.0,0.0];
var ballsp=6;
var wepsp=9;
var wallsp=6;
var rafu=5;
var ct4=0;
var ct5=0;
var audio1=new Audio("Super Mario theme.wav");
var audio2=new Audio("Mario game over.wav");
var audio3=new Audio("hit.wav");

var ball = {
  x: 100,
  y: 100,
  
  radius: 20,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = '15px Arial';
    ctx.fillText('Deep', this.x, this.y);
  }
};

function drawspike()
 {ctx.beginPath();
  ctx.moveTo(0,0); 
   for(var i=1;i<=24;i++)
    if(i%2==1)
    ctx.lineTo(10,25*i);
    else
    ctx.lineTo(0,25*i);
 ctx.fillStyle='#373744'   
 ctx.fill()  ;
 ctx.fillStyle = '#000000';
  }

function mouseMoveHandler(e){
  
   if(e.clientX - canvas.offsetLeft>=ball.x)
  {ang=Math.atan((ball.y-e.clientY + canvas.offsetTop)/(e.clientX - canvas.offsetLeft-ball.x));
    st1=1;st2=0;tx=e.clientX - canvas.offsetLeft;
   }
   if(e.clientX - canvas.offsetLeft<ball.x)
   {ang=Math.atan((ball.y-e.clientY + canvas.offsetTop)/-(e.clientX - canvas.offsetLeft-ball.x));
    st1=0;st2=1;tx=e.clientX - canvas.offsetLeft;
  }  
   

  /*if(e.clientX - canvas.offsetLeft<20)
	{ball.x=20;
	ball.y=e.clientY - canvas.offsetTop;
     return;}
	if(e.clientX - canvas.offsetLeft>880)
	{ball.x=880;
	ball.y=e.clientY - canvas.offsetTop;
     return;}

    if(e.clientY - canvas.offsetTop<20)
	{ball.x=e.clientX - canvas.offsetLeft;
	ball.y=20;
     return;}
     if(e.clientY - canvas.offsetTop>580)
	{ball.x=e.clientX - canvas.offsetLeft;
	ball.y=580;
     return;} */
  //temp=ball; 
}

function isColliding(a, b) {
  
  if(a.x>=b.x-20&&a.x<=b.x+30&&a.y>=b.y&&a.y<=b.y+b.l)
  	{
      a.x=b.x-20;
    }
  if(a.x>=b.x+10&&a.x<=b.x+50&&a.y>=b.y&&a.y<=b.y+b.l)
    {
      a.x=b.x+50;
    }

  if(a.x>=b.x&&a.x<=b.x+30&&a.y>=b.y-20&&a.y<=b.y+b.l/4)
  	{
      a.y=b.y-20;
    }
  if(a.x>=b.x&&a.x<=b.x+30&&a.y>=b.y+b.l/2&&a.y<=b.y+b.l+20)
    {
      a.y=b.y+b.l+20;
    }
}

function isCollidingwp(hi,ind,x,y, b) {
  
  if(x>=b.x&&x<=b.x+30&&y>=b.y&&y<=b.y+b.l)
    {
      hi.wpx=hi.x;hi.wpy=hi.y;
      ctxx[ind]=0;
      if(ball.x>hi.x)
        ct3[ind]=1;
    }
  if(x>=b.x+10&&x<=b.x+50&&y>=b.y&&y<=b.y+b.l)
    {
      hi.wpx=hi.x;hi.wpy=hi.y;
      ctxx[ind]=0;
      if(ball.x>hi.x)
        ct3[ind]=1;
      
    }

  if(x>=b.x&&x<=b.x+30&&y>=b.y-20&&y<=b.y+b.l/4)
    {
      hi.wpx=hi.x;hi.wpy=hi.y;
      ctxx[ind]=0;
      if(ball.x>hi.x)
        ct3[ind]=1;
    }
  if(x>=b.x&&x<=b.x+30&&y>=b.y+b.l/2&&y<=b.y+b.l+20)
    {
      hi.wpx=hi.x;hi.wpy=hi.y;
      ctxx[ind]=0;
      if(ball.x>hi.x)
        ct3[ind]=1;
    }
   if(x<20||x>=canvas.width||y<0||y>=canvas.height)
    {
      hi.wpx=hi.x;hi.wpy=hi.y;
      ctxx[ind]=0;
      if(ball.x>hi.x)
        ct3[ind]=1;
    }
   if(Math.abs(Math.sqrt(Math.pow(ball.x-x,2)+Math.pow(ball.y-y,2)))<=23)
    {
      hi.wpx=hi.x;hi.wpy=hi.y;
      ctxx[ind]=0;
      if(ball.x>hi.x)
        ct3[ind]=1;
      health--;
      audio3.play();
    }
  
}


function bakwall()
{
  if(ball.x<40)
    result=true;
}
 
function sc(){score++;}

function menu() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.font = '36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('deep maze game(hacker)', canvas.width / 2, canvas.height / 4);
  ctx.font = '20px Arial';
  ctx.fillText('INSTRUCTIONS:Touching walls and hitmen will kill deep. ', canvas.width / 2, canvas.height / 2);
  ctx.fillText('Use mouse to guide him.Bullets will reduce his health. ENJOY. ', canvas.width / 2, canvas.height / 2+30);
  ctx.strokeStyle = 'red';
  ctx.rect(375,500,150,50);
  ctx.stroke();
  ctx.fillText('Start game ', 450, 525);
  ctx.strokeStyle = '#000000';
   // Start the game on a click
  canvas.addEventListener('click', startGame);
}
  
  function makehit(x, y, rad) {
   return {
    x: x,
    y: y,
    r1: rad,
    wpx:x,
    wpy:y,
    draw: function() {ctx.fillStyle = 'green';
       ctx.beginPath();
    ctx.arc(this.x, this.y, this.r1, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x-5, this.y-5, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x+5, this.y-5, 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.wpx, this.wpy, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

      ctx.fillStyle = '#000000';   
      }
    };
  } 



  function makeSquare(x, y, length, breadth) {
   return {
    x: x,
    y: y,
    l: length,
    b: breadth,
    draw: function() {ctx.fillStyle = 'brown';
      ctx.fillRect(this.x, this.y, this.b, this.l);
      ctx.fillStyle = '#000000';   
      }
    };
  }

var enemies = [];
var hitms= [];

function makeEnemy() {
  var enemyX = canvas.width;
  var enemySize = Math.floor(Math.random()*1000)%500;
  var enemyY=Math.floor(Math.random()*1000)%(canvas.height - enemySize);
  enemies.push(makeSquare(enemyX, enemyY, enemySize, 30));
  var rn=Math.floor(Math.random()*100)%rafu;
  if(rn==0)
 { hitms.push(makehit(enemyX+50+Math.floor(Math.random()*1000)%100,enemyY+Math.floor(Math.random()*1000)%(enemySize/2),10));
  ctxx.push(0);
 ct3.push(0);
 angles.push(0.0);}
}

function a1f()
{audio1.play();}
 
function setct(){ct=1;}

function startGame(e) {
  var sngx=	e.clientX - canvas.offsetLeft;
  var sngy=	e.clientY - canvas.offsetTop;
  if(sngx>375&&sngx<525&&sngy>500&&sngy<550)
  {canvas.removeEventListener('click', startGame);
   timeoutId = setInterval(makeEnemy, 1000);
   a1id= setInterval(a1f, 20);
  setTimeout(makeEnemy, 1000);
  setTimeout(a1f,100);
  setTimeout(setct, 1300);
  scoreid = setInterval(sc, 500);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);
    canvas.addEventListener("mouseover", mouseMoveHandler, false);
   // canvas.addEventListener("click", clickHandler, false);
    draw();}
  
}


function exitgame()
{ctx.clearRect(0,0, canvas.width, canvas.height);
 clearInterval(timeoutId);
 clearInterval(scoreid);
 clearInterval(a1id);
 audio1.pause();
 audio2.play();
 audio1.load();
 canvas.removeEventListener("mousemove", mouseMoveHandler);
 ctx.fillStyle = '#000000';
  ctx.font = '36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('game over', canvas.width / 2, canvas.height / 4);
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' +score, canvas.width / 2, canvas.height / 2); 
  ctx.beginPath();
   ctx.rect(375,500,150,50);
  ctx.stroke();
  ctx.closePath();
  ctx.fillText('Restart', 450, 525);
  ct=0;
  ct4=0;ct5=0;
  timeoutId = null;
  wallsp=6;
  rafu=5;
  result=false;
  health=5;
  score=0; ball.x=100;ball.y=100 ;enemies=[];
  hitms=[];
  ctxx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  ct3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  angles= [0.0,0.0,0.0,0.0,0.0];
  canvas.addEventListener('click', startGame);}



function draw()
{ctx.clearRect(0,0, canvas.width, canvas.height);
	
   if(st1==1&&ball.x<=tx)
  {if(ball.y<20)
    {ball.x+=ballsp*Math.cos(ang);
     ball.y=20;}
   else if(ball.y>580)
    {ball.x+=ballsp*Math.cos(ang);
     ball.y=580;} 
    else{ball.x+=ballsp*Math.cos(ang);
      ball.y-=ballsp*Math.sin(ang);}  }
   else if(st2==1&&ball.x>=tx)  
     {if(ball.y<20)
    {ball.x-=ballsp*Math.cos(ang);
     ball.y=20;
     }
   else if(ball.y>580)
    {ball.x-=ballsp*Math.cos(ang);
     ball.y=580;
      } 
    else { ball.x-=ballsp*Math.cos(ang);
      ball.y-=ballsp*Math.sin(ang);}   }    
      ball.draw();  

  drawspike();
ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText('Score:'+score, 125,50);	
ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText('Health:'+health, 825,50);


enemies.forEach(function(enemy) {
    enemy.x -= wallsp;
    enemy.draw();
  });
if(ct==1)
{if(enemies[0].x <20)
  enemies.splice(0, 1);
}

hitms.forEach(function(enemy,ind) {
    if(enemy.x<canvas.width-50&&(enemy.x>ball.x||ct3[ind]==0))
     { if(ctxx[ind]==0) 
       {angles[ind]=Math.atan((ball.y-enemy.y)/-(enemy.x-ball.x))-(Math.PI/18)+Math.floor(Math.random()*1000)%(Math.PI/9);
        ctxx[ind]=1;}
       enemy.wpx-=wepsp*Math.cos(angles[ind]);
       enemy.wpy-=wepsp*Math.sin(angles[ind]);}
     if(enemy.x<=ball.x)
     { if(ctxx[ind]==0) 
       {angles[ind]=Math.atan((ball.y-enemy.y)/+(enemy.x-ball.x))-(Math.PI/18)+Math.floor(Math.random()*1000)%(Math.PI/9);
        ctxx[ind]=1;}
      if(ct3[ind]==1) {enemy.wpx+=wepsp*Math.cos(angles[ind]);
                 enemy.wpy-=wepsp*Math.sin(angles[ind]);}
               }



    enemy.x -= wallsp;
    enemy.wpx-=wallsp;
    enemy.draw();
  });

hitms.forEach(function(enemy,ind) {
    enemies.forEach(function(en) {
    isCollidingwp(enemy,ind,enemy.wpx,enemy.wpy,en)
  });
    
  });

if(ct==1&&hitms.length==4)
{if(hitms[3].x<canvas.width-10)
{hitms.splice(0, 1);
 ctxx.splice(0,1);
 ct3.splice(0,1);
 angles.splice(0,1);}
}

enemies.forEach(function(enemy) {
   isColliding(ball,enemy);
  });

if(health<=0)
  result=true;
 

bakwall();

if(ct4==0)
{if(score>=50&&score<100)
{wallsp=8;
 rafu=4;
 clearInterval(timeoutId);
timeoutId = setInterval(makeEnemy, 800);
 ct4=1;
 }  }

if(ct5==0)
{if(score>100)
{wallsp=10;
 rafu=1;
 clearInterval(timeoutId);
timeoutId = setInterval(makeEnemy, 600);
 ct5=1;
 }  }

if(result)
exitgame();
else
requestAnimationFrame(draw);
}

menu();