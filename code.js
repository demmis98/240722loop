var max_x = 16; 
var max_y = 16;

var x = max_x / 2;
var y = max_y / 2;
var tail_x, tail_y, tail_temp;
var direccion = 3;

var apple_x = Math.floor(Math.random() * max_x);
var apple_y = Math.floor(Math.random() * max_y);

var game_over = false;

var field = [];

var container = document.getElementById("container");

var content;

for(var j = 0; j < max_x; j++){
    field.push([]);
    for(var i = 0; i < max_y; i++){
        field[j].push(0);
    }
}

window.onkeyup = function(e){}
window.onkeydown = function(e) {
    switch(e.keyCode){
        case 37:
            if(direccion != 3)
                direccion = 1;
            break;
            
        case 38:
            if(direccion != 4)
                direccion = 2;
            break;
            
        case 39:
            if(direccion != 1)
                direccion = 3;
            break;
            
        case 40:
            if(direccion != 2)
                direccion = 4;
            break;
    }
}
 //loop
var inter_id = window.setInterval(frame, 1000/5)
render()

function frame () {

    switch(direccion){
        case 1:
            x--;
            if(x < 0){
                game_over = true;
                x++;
            }
            break;
            
        case 2:
            y--;
            if(y < 0){
                game_over = true;
                y++;
            }
            break;
            
        case 3:
            x++;
            if(x == max_x){
                game_over = true;
                x--;
            }
            break;
            
        case 4:
            y++;
            if(y == max_y){
                game_over = true;
                y--;
            }
            break;
    }

    if(field[x][y] == 0){
        field[x][y] = direccion;
        if(x == apple_x && y == apple_y){
            while(field[apple_x][apple_y]){
                apple_x = Math.floor(Math.random() * max_x);
                apple_y = Math.floor(Math.random() * max_y);
            }
        }
        else{
            tail_x = x;
            tail_y = y;
            while(field[tail_x][tail_y] != 0){
                tail_temp = field[tail_x][tail_y];
                switch(tail_temp){
                    case 1:
                        tail_x++;
                        break;

                    case 2:
                        tail_y++;
                        break;

                    case 3:
                        tail_x--;
                        break;

                    case 4:
                        tail_y--;
                        break;
                }
            }
            switch(tail_temp){
                case 1:
                    tail_x--;
                    break;

                case 2:
                    tail_y--;
                    break;

                case 3:
                    tail_x++;
                    break;

                case 4:
                    tail_y++;
                    break;
            }
            if(tail_x != x || tail_y != y)
                field[tail_x][tail_y] = 0;
        }
    }
    else{
        game_over = true;
    }

    render();
}

function render(){
    content = "";
    
    content += "<div class='block' style='background-color: lime; position: absolute";
    content += "; width : " + (max_x*32) + "px";
    content += "; height : " + (max_y*32) + "px";
    content += "; left : " + 0 + "px";
    content += "; top : " + 0 + "px";
    content +="'></div>";

    content += "<div class='block' style='background-color: red; position: absolute; width: 32px; height: 32px";
    content += "; left : " + (apple_x*32) + "px";
    content += "; top : " + (apple_y*32) + "px";
    content +="'></div>";

    for(var j = 0; j < max_y; j++)
        for(var i = 0; i < max_x; i++){
            if(field[i][j] != 0){
                content += "<div class='block' style='background-color: violet; position: absolute; width: 32px; height: 32px";
                content += "; left : " + (i*32) + "px";
                content += "; top : " + (j*32) + "px";
                content +="'></div>";
            }
        }

    if(game_over){
        window.clearInterval(inter_id);
        
        content += "<div style='position: absolute";
        content += ";left : " + (max_x*14) + "px";
        content += "; top : " + (max_y*32) + "px";
        content +="'><p>GAME OVER</p></div>";
    }
    container.innerHTML = content;
}