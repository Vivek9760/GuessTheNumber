let x =Math.floor( Math.random()*99)+1;
let count=6;
document.getElementById('attempts').innerText = count;


document.getElementById('p2-btn').addEventListener('click',()=>{
    
    let y = document.getElementById("input").value;
    if(count!=1 || y==x){

        
   if(y==''){
       document.getElementById('text').innerText= "PLEASE ENTER A VALID INPUT";
    }else if(y>100 || y<1){
        document.getElementById('text').innerText="ENTER A NUMBER BETWEEN (1-100)";
    }else if(y>x){
        document.getElementById('text').innerText="THE NUMBER IS GREATER THAN THE ACTUAL NUMBER";
        count--;
        document.getElementById('attempts').innerText = count;
    }else if(y<x){
        document.getElementById('text').innerText="THE NUMBER IS SMALLER THAN THE ACTUAL NUMBER";
        count--;
        document.getElementById('attempts').innerText = count;
    }else{
        document.getElementById('text').innerText="CONGRATULATION YOU WON THE GAME";
        document.getElementById('number').innerText=x;
        document.getElementById('img1').style.visibility='visible';
        document.getElementById('img2').style.visibility='visible';
        document.getElementById('p2l2').style.visibility='hidden';
        document.getElementById('p2-btn').style.display='none';
        document.getElementById('input').style.display='none';
}
}else{
    count--;
        document.getElementById('attempts').innerText = count;
    document.getElementById('text').innerText="YOU LOSE THE GAME";
    document.getElementById('number').innerText=x;
    document.getElementById('p2-btn').style.display='none';
}
})