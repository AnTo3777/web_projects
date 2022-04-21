/*************** Initialization ***************/
function getEl(id){
    return document.getElementById(id);
};

function get_info(id, what) {
    return parseInt(window.getComputedStyle(document.getElementById(id)).getPropertyValue(what));
};

function bet(index_player, montant){
    data_inventory[index_player] -= montant
    data_bets[index_player] += montant
    getEl('bet_' + data_names[index_player]).innerHTML = data_bets[index_player]
    getEl('inventory_' + data_names[index_player]).innerHTML = data_inventory[index_player]
}


/*** Players choice ****/
function fold(){
    if(touche_active){
        getEl('display_' + data_names[index_current_player]).style.backgroundColor = "grey"

        data_fold[index_current_player] = true
    
        if(index_current_player == 5){
            index_current_player = 0
        }
        else{
            index_current_player++
        }
        
        tour_players()
    }
    
}

function callcheck(){
    if(touche_active){
        getEl('display_' + data_names[index_current_player]).style.backgroundColor = "yellow"

        var montant_a_depenser = call_a_suivre - data_bets[index_current_player]
        if((montant_a_depenser == 0) && data_bets[index_current_player] == 0){
            getEl('bet_' + data_names[index_current_player]).innerHTML = ''
        }
        else{
            bet(index_current_player, montant_a_depenser)
        }
    
        if(index_current_player == 5){
            index_current_player = 0
        }
        else{
            index_current_player++
        }
    
        tour_players()
    }
    
}

function raisebet(){
    if(touche_active){
        getEl('display_' + data_names[index_current_player]).style.backgroundColor = "red"
        call_a_suivre += 1000
    
        var montant_a_depenser = call_a_suivre - data_bets[index_current_player]
    
        bet(index_current_player, montant_a_depenser)
    
        index_fin_tour = index_current_player
        for(var i=0; i<=5; i++){
            if((data_fold[i] == false) && (i != index_current_player)){
                getEl('display_' + data_names[i]).style.backgroundColor = "transparent"
            }
        }
    
    
        if(index_current_player == 5){
            index_current_player = 0
        }
        else{
            index_current_player++
        }
        
        tour_players()
    }
    

}


var index_fin_tour = -1

var pot_centrale = 0

var call_a_suivre = 1000

var game_box = getEl('game_box_id')

var all_cards = [['AT', [-26, -1]], ['2T', [-74.5, -1]], ['3T', [-123, -1]], ['4T', [-171.5, -1]], ['5T', [-220, -1]], ['6T', [-268.5, -1]], ['7T', [-317, -1]], ['8T', [-365.5, -1]], ['9T', [-414, -1]], ['10T', [-462.5, -1]], ['vT', [-511, -1]], ['reT', [-559.5, -1]], ['roT', [-608, -1]], ['AP', [-26, -67]], ['2P', [-74.5, -67]], ['3P', [-123, -67]], ['4P', [-171.5, -67]], ['5P', [-220, -67]], ['6P', [-268.5, -67]], ['7P', [-317, -67]], ['8P', [-365.5, -67]], ['9P', [-414, -67]], ['10P', [-462.5, -67]], ['vP', [-511, -67]], ['reP', [-559.5, -67]], ['roP', [-608, -67]], ['ACo', [-26, -133]], ['2Co', [-74.5, -133]], ['3Co', [-123, -133]], ['4Co', [-171.5, -133]], ['5Co', [-220, -133]], ['6Co', [-268.5, -133]], ['7Co', [-317, -133]], ['8Co', [-365.5, -133]], ['9Co', [-414, -133]], ['10Co', [-462.5, -133]], ['vCo', [-511, -133]], ['reCo', [-559.5, -133]], ['roCo', [-608, -133]], ['ACa', [-26, -199]], ['2Ca', [-74.5, -199]], ['3Ca', [-123, -199]], ['4Ca', [-171.5, -199]], ['5Ca', [-220, -199]], ['6Ca', [-268.5, -199]], ['7Ca', [-317, -199]], ['8Ca', [-365.5, -199]], ['9Ca', [-414, -199]], ['10Ca', [-462.5, -199]], ['vCa', [-511, -199]], ['reCa', [-559.5, -199]], ['roCa', [-608, -199]]]

var manche_actuelle = 'preflop'

var touche_active = true

/*************** Create partie ***************/

/***** Selection of 17 cards *****/
var list_17_cards =[]
for(var i=0; i<17; i++){
    do {
        var random_index = Math.round(51*Math.random());
    } while(all_cards[random_index] == null);
    list_17_cards.push(all_cards[random_index])
    all_cards.splice(random_index, 1, null)
}

/***** Distribution *****/
var player_hand = []
for(var i=0; i<=1; i++){
    player_hand.push(list_17_cards[i])
}
var bot1_hand = []
for(var i=2; i<=3; i++){
    bot1_hand.push(list_17_cards[i])
}
var bot2_hand = []
for(var i=4; i<=5; i++){
    bot2_hand.push(list_17_cards[i])
}
var bot3_hand = []
for(var i=6; i<=7; i++){
    bot3_hand.push(list_17_cards[i])
}
var bot4_hand = []
for(var i=8; i<=9; i++){
    bot4_hand.push(list_17_cards[i])
}
var bot5_hand = []
for(var i=10; i<=11; i++){
    bot5_hand.push(list_17_cards[i])
}
var card_middle = []
for(var i=12; i<=16; i++){
    card_middle.push(list_17_cards[i])
}

/***** Display player cards *****/
getEl('card1_player').style.backgroundPosition = String(player_hand[0][1][0]) + "px " + String(player_hand[0][1][1]) + "px"
getEl('card2_player').style.backgroundPosition = String(player_hand[1][1][0]) + "px " + String(player_hand[1][1][1]) + "px"




/*************** Data ***************/

/***** Basic data *****/
var data_names = ['player', 'bot1', 'bot2', 'bot3', 'bot4', 'bot5']

var data_hands = [[player_hand[0][0], player_hand[1][0]], [bot1_hand[0][0], bot1_hand[1][0]], [bot2_hand[0][0], bot2_hand[1][0]], [bot3_hand[0][0], bot3_hand[1][0]], [bot4_hand[0][0], bot4_hand[1][0]], [bot5_hand[0][0], bot5_hand[1][0]]]

var data_inventory = [10000, 10000, 10000, 10000, 10000, 10000]

var data_bets = [0, 0, 0, 0, 0, 0]

var data_fold = [false, false, false, false, false, false]


/***** D, SB, BB *****/

var data_DSBBB = ['', '', '', '', '', '']

/* Dealer */
var index_dealer = Math.round(5*Math.random())
data_DSBBB[index_dealer] = 'D'

/* SB */
if(index_dealer == 5){
    var index_SB = 0
    data_DSBBB[index_SB] = 'SB'
}
else{
    var index_SB = index_dealer + 1
    data_DSBBB[index_SB] = 'SB'
}

/* BB */
if(index_dealer == 4){
    var index_BB = 0
    data_DSBBB[index_BB] = 'BB'
}
else if(index_dealer == 5){
    var index_BB = 1
    data_DSBBB[index_BB] = 'BB'
}
else{
    var index_BB = index_dealer + 2
    data_DSBBB[index_BB] = 'BB'
}




/* Display */
for(var i=0; i<6; i++){
    getEl('display_' + data_names[i]).innerHTML = data_names[i] + ' ' + data_DSBBB[i]
}



/*************** Mise obligatoire ***************/

/***** Small blind *****/
bet(index_SB, 500)

/***** Big blind *****/
bet(index_BB, 1000)






/*************** Debut jeu ***************/

/****** Definir joueur actuel ******/
if(index_BB == 5){
    var index_current_player = 0
}
else{
    var index_current_player = index_BB + 1
}



/***** Tour sans carte middle *****/
var n = 0

function tour_players(){

        if(index_current_player == index_fin_tour){
            if(manche_actuelle == 'preflop'){
                manche_actuelle = 'flop'
            }
            else if(manche_actuelle == 'flop'){
                manche_actuelle = 'turn'
            }
            else if(manche_actuelle == 'turn'){
                manche_actuelle = 'river'
            }
            init_new_turn()
        }
        else{

            if(data_fold[index_current_player] == false){
                /* Afficher en bleu le joueur actuel */
                getEl('display_' + data_names[index_current_player]).style.backgroundColor = "skyblue"

                if(call_a_suivre - data_bets[index_current_player] == 0){
                    var liste_choix = ['fold', 'check', 'bet']
                    /* Changer boutons */
                    getEl('callcheck').innerHTML = liste_choix[1]
                    getEl('raisebet').innerHTML = liste_choix[2]
                }
                else{
                    var liste_choix = ['fold', 'call', 'raise']
                    getEl('callcheck').innerHTML = liste_choix[1]
                    getEl('raisebet').innerHTML = liste_choix[2]
                }
            }
            else{
                if(index_current_player == 5){
                    index_current_player = 0
                }
                else{
                    index_current_player++
                }


                tour_players()
                
                /*
                setTimeout(function(){
                    tour_players_preflop()
                }, 3000)
                */
            }
        }
    
            /*
            if(data_names[index_current_player] != 'player'){
                var liste_choix = ['fold', 'call', 'raise']
                var choix = liste_choix[Math.round(2*Math.random())]
    
                if(choix == 'fold'){
                    setTimeout(function(){
                        fold()
                    }, 3000)
                    
                }
                else if(choix == 'call'){
                    setTimeout(function(){
                        call()
                    }, 3000)
                }
                else if(choix == 'raise'){
                    setTimeout(function(){
                        raise()
                    }, 3000)
                }
            }
            */
    n += 1
    if(n==1){
        index_fin_tour = index_current_player
    }

}


function init_new_turn(){
    /**** Initialisation */
    for(var i=0; i<=5; i++){
        if(data_fold[i] == false){
            getEl('display_' + data_names[i]).style.backgroundColor = "transparent"
        }
    }

    /**** Prendre mise et mettre dans pot */
    for(var i=0; i<=5; i++){
        pot_centrale = pot_centrale + data_bets[i]
        data_bets[i] = 0
        getEl('bet_' + data_names[i]).innerHTML = ""
    }
    getEl('pot').innerHTML = pot_centrale






    if(manche_actuelle == 'river'){
        touche_active = false
        for(var i=1; i<=5; i++){
            console.log('carte bot' + String(i) + ' : ' + data_hands[i][0] + ', ' + data_hands[i][1])
        }
        
        
    }
    else{
        /**** Definir premier joueur a jouer */
        index_current_player = index_SB

        while(data_fold[index_current_player]){
            index_current_player++
        }

        index_fin_tour = -1
        n = 0
        call_a_suivre = 0
        
        tour_players()
    }
 


    /**** Montrer cartes */

    if(manche_actuelle == 'flop'){
        for(var i=1; i<=3; i++){
            getEl('card' + String(i) + '_middle').style.background = 'url(./assets/cards.png) no-repeat'
            getEl('card' + String(i) + '_middle').style.backgroundSize = '650px 262px'
            getEl('card' + String(i) + '_middle').style.backgroundPosition = String(card_middle[i-1][1][0]) + "px " + String(card_middle[i-1][1][1]) + "px"
        }
    }
    else if(manche_actuelle == 'turn'){
        getEl('card4_middle').style.background = 'url(./assets/cards.png) no-repeat'
        getEl('card4_middle').style.backgroundSize = '650px 262px'
        getEl('card4_middle').style.backgroundPosition = String(card_middle[3][1][0]) + "px " + String(card_middle[3][1][1]) + "px"
    }
    else if(manche_actuelle == 'river'){
        getEl('card5_middle').style.background = 'url(./assets/cards.png) no-repeat'
        getEl('card5_middle').style.backgroundSize = '650px 262px'
        getEl('card5_middle').style.backgroundPosition = String(card_middle[4][1][0]) + "px " + String(card_middle[4][1][1]) + "px"
    }
}





tour_players()