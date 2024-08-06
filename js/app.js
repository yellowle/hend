const co = document.querySelector('#canvas');
const ctx = co.getContext('2d');


const mousePos = {};   //cursor koordinaten     // leere Objekt um aktuelle mauskoorinaten zu speichern

function checkMousePos(e){


    mousePos.x = e.clientX - this.getBoundingClientRect().left ;  
     //Hier wird die X-Koordinate der Mausposition aktualisiert.
     //e.clientX gibt die X-Koordinate des Mauszeigers im Browser-Fenster zurück.
     //this.getBoundingClientRect().left gibt die X-Koordinate des linken Randes des Elements (in diesem Fall das Canvas) zurück
    //die Differenz dieser beiden Werte verwendet, um die relative X-Position innerhalb des Elements zu erhalten.

    mousePos.y = e.clientY - this.getBoundingClientRect().top ;
         //Hier wird die Y-Koordinate der Mausposition aktualisiert.
     //e.clientY gibt die Y-Koordinate des Mauszeigers im Browser-Fenster zurück.
     //this.getBoundingClientRect().top gibt die Y-Koordinate des oberen Randes des Elements (in diesem Fall das Canvas) zurück
    //die Differenz dieser beiden Werte verwendet, um die relative Y-Position innerhalb des Elements zu erhalten.
}

const protoCircle ={
    x : 0 ,
    y : 0 ,
    r : 0 ,
    col :0 ,
    init : function(x , y , r , col){
        this.x = x ;
        this.y = y ;
        this.r = r ;
        this.col = col ;

    } , 
    move : function(x , y , r , col){
        this.x = mousePos.x ;
        this.y = mousePos.y ;
        this.draw();

    } ,
    draw : function(){
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(this.x , this.y , this.r , 0 , 2 * Math.PI , true);
    ctx.fill();
    ctx.stroke();

    } 
    
    
}






// klone erzeugen
const circle1 = Object.create(protoCircle);
circle1.init(co.width/2 , co.height/2  , 100 , 'red');             
// im circle1 co.width ist halbe canvas width 800/2 = 400
// im circle1 co.height ist halbe canvas height 800/2 = 400
//so circle1 lieg im x=400 y=400 oder center von unsere canvas

const circle2 = Object.create(protoCircle);
circle2.init(0 , 0  , 70 , 'yellow');



function render(){
    requestAnimationFrame(render);            // Das Ergebnis ist eine flüssige Animation, die gut mit der Bildwiederholfrequenz des Bildschirms harmoniert.
    ctx.clearRect(0 , 0 , co.width , co.height);   // Löscht "gesamte canvas Bereich" um vorherige Frame zu enfernen
    circle1.draw();
    circle2.move();

// kollisionsabfrage
if(kollision(circle1 , circle2)){           // wenn kollision ist true ändere eingenschaften von circle
 circle1.col = 'blue';
 circle2.col = 'black';
} else {
    circle1.col = 'red';
    circle2.col = 'yellow';
}


}



function kollision(c1,c2){            
	
    let dx   = c2.x - c1.x;
    let dy   = c2.y - c1.y;
    let rSum = c1.r + c2.r;
    return(dx*dx + dy*dy <= rSum*rSum );       //wenn  x hoch2 + y hoch 2 kleiner als (c1 radius +c2 radis) hoch 2 ist , sie haben kollision
    // true / false
}





render();
co.addEventListener('mousemove' , checkMousePos);



