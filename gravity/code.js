/*************** Initialization ***************/
function getEl(id){
    return document.getElementById(id);
};

function get_info(id, what) {
    return parseInt(window.getComputedStyle(document.getElementById(id)).getPropertyValue(what));
};

function get_width_sreen(){
   return window.innerWidth
}

function get_height_sreen(){
    return window.innerHeight
}




/*************** Data ***************/


/*************** Characteristique ball aleatoire ***************/
var data_width = []
var data_bounce = []
var data_weight = []
var data_velocity_y = []
var data_velocity_x = []

for(var i=0; i<10; i++){

    data_width.push(String(Math.round(30+200*Math.random()))+'px')
    getEl('ball' + String(i)).style.height = data_width[i]
    getEl('ball' + String(i)).style.width = data_width[i]



    data_bounce.push(Number((0.6+0.3*Math.random()).toFixed(1)))
    data_weight.push(Number((0.2+0.7*Math.random()).toFixed(1)))

    var norme_velocity_y = Math.round(30*Math.random())
    var norme_velocity_x = Math.round(60*Math.random())


    data_velocity_y.push((-1)**norme_velocity_y * norme_velocity_y)
    data_velocity_x.push((-1)**norme_velocity_x * norme_velocity_x)

}

/*************** Balls ***************/



setInterval(function(){

    for(var i=0; i<10; i++){
        var position_x = get_info("ball" + String(i), "left");
        var position_y = get_info("ball" + String(i), "top");

        var friction_y = 0.01 * data_velocity_y[i];
        var friction_x = 0.01 * data_velocity_x[i];



        /*************** Bounces ***************/

        if(position_y >= get_height_sreen() - get_info("ball" + String(i), "height")- 15){
            /** repositionner */
            position_y = get_height_sreen() - get_info('ball' + String(i), 'height') - 15
            document.getElementById("ball"+ String(i)).style.top = position_y + 'px'
            /** Bounce y **/
            data_velocity_y[i] = - data_bounce[i] * data_velocity_y[i]
        }

        if(position_y <= 15){
            /** repositionner */
            position_y = 15
            document.getElementById("ball" + String(i)).style.top = position_y + 'px'
            /** Bounce y **/
            data_velocity_y[i] = - data_bounce[i] * data_velocity_y[i]
        }



        if(position_x >= get_width_sreen() - get_info('ball' + String(i), 'width')-15){
            /** repositionner */
            position_x = get_width_sreen() - get_info('ball' + String(i), 'width')-15
            document.getElementById("ball" + String(i)).style.top = position_x + 'px'
            /** Bounce x **/
            data_velocity_x[i]= -1 * data_velocity_x[i]
        }

        if(position_x <= 5){
            /** repositionner */
            position_x = 5
            document.getElementById("ball" + String(i)).style.top = position_x + 'px'

            /** Bounce x **/
            data_velocity_x[i]= -1 * data_velocity_x[i]
        }


        /** Contrer beug **/
        if(data_velocity_y[i] < 0 && data_velocity_y[i] > -2.1){
            data_velocity_y[i] = 0
        }
        if(Math.abs(data_velocity_x[i]) < 1.1){
            data_velocity_x[i]= 0
        }


        /** Calcul de la vitesse **/
        data_velocity_y[i] = data_velocity_y[i] + data_weight[i] - friction_y
        getEl("ball" + String(i)).style.top = position_y + data_velocity_y[i] + "px"

        data_velocity_x[i]= data_velocity_x[i] - friction_x
        getEl("ball" + String(i)).style.left = position_x + data_velocity_x[i]+ "px"

        console.log(data_bounce)

    }
    console.log()
    
},1000/35);





/** saut */

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        for(var i=0; i<10; i++){
            data_velocity_y[i] = Math.round(-5-20*Math.random())

            if(data_velocity_x[i] < 0){
                data_velocity_x[i] -= 5
            }
            else if(data_velocity_x[i] >= 0){
                data_velocity_x[i] += 5
            }
        }
    }
});