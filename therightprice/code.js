var price;
var trial;
var choice;
var waiting;
var repeat;
var lap = 0;
var score = 0;

function mettreMain() {
    document.getElementById('bouton1').style.cursor = "pointer"
    document.getElementById('bouton2').style.cursor = "pointer"
    document.getElementById('bouton3').style.cursor = "pointer"
    document.getElementById('bouton4').style.cursor = "pointer"
}

function couleurChargement(ch, good) {
    if(good) {
        document.getElementById(ch).style.background = "green"
    }
    else {
        document.getElementById(ch).style.background = "red"
    }
}

function putSpace(l_button, price_button) {
    var prix_afficher = ''
    for(var i = 0; i < l_button; i++) {
        if(l_button == 1 || l_button == 2 || l_button == 3) {
            prix_afficher = prix_afficher + String(price_button)[i]
        }
        else if(l_button == 4 || l_button == 7 || l_button == 10) {
            if(i == 1 || i == 4 || i == 7) {
                prix_afficher = prix_afficher + " " + String(price_button)[i]
            }
            else {
                prix_afficher = prix_afficher + String(price_button)[i]
            }
        }
        else if(l_button == 5 || l_button == 8 || l_button == 11) {
            if(i == 2 || i == 5 || i == 8) {
                prix_afficher = prix_afficher + " " + String(price_button)[i]
            }
            else {
                prix_afficher = prix_afficher + String(price_button)[i]
            }
        }
        else if(l_button == 6 || l_button == 9 || l_button == 12) {
            if(i == 3 || i == 6 || i == 9) {
                prix_afficher = prix_afficher + " " + String(price_button)[i]
            }
            else {
                prix_afficher = prix_afficher + String(price_button)[i]
            }
        }
    }
    return(prix_afficher)
}

var description_liste = [
    ["Guess the average price per square meter in Paris.", [9679, 10865, 12456, 15025], 9679],
    ["Guess the price of the Iphone X (64 GB - FNAC).", [599, 999,899, 1049], 899],
    ["Guess the estimated price of the Mona Lisa.", [900000000,1500000000,2000000000, 3000000000], 2000000000],
    ["Guess the price of a Formula 1 car.", [500000, 750000, 1200000, 1000000], 1000000],
    ["Guess the price of a gold bar (1 kg).", [60000, 40000, 80000, 100000], 40000],
    ["Guess the price of the OG gold medal (Pyeongchang).", [465, 625, 875, 1105], 465],
    ["Guess the price of an Airbus A380.", [400000000, 250000000, 700000000, 1000000000], 400000000],
    ["Guess the average price of a pro racing bike.", [1000, 4000, 10000, 7000], 10000],
    ["Guess the price of the most expensive tank in the world.", [8000000, 12000000, 15000000, 10000000], 10000000],
    ["Guess the amount of the SMIC 2019.", [900, 1200, 1000, 1500], 1200]
]

var image = document.getElementById("image");

function change_picture() {
    lap = lap + 1
    document.getElementById('bouton_restart').className = "game";
    document.getElementById('fleche').className = "fleche_game";
    if(lap <= 10) {
        mettreMain()
        waiting = false
        document.getElementById('bouton1').style.background = "rgb(32 32 32 / 1)"
        document.getElementById('bouton2').style.background = "rgb(32 32 32 / 1)"
        document.getElementById('bouton3').style.background = "rgb(32 32 32 / 1)"
        document.getElementById('bouton4').style.background = "rgb(32 32 32 / 1)"
        do {
            n = parseInt(Math.random()*10);
        } while(n == repeat);
        repeat = n
        image.setAttribute('src', './assets/image/' + n + '.jpeg')
        description.innerHTML = description_liste[n][0]
        price_button1 = description_liste[n][1][0]
        price_button2 = description_liste[n][1][1]
        price_button3 = description_liste[n][1][2]
        price_button4 = description_liste[n][1][3]

        l_button1 = String(price_button1).length
        l_button2 = String(price_button2).length
        l_button3 = String(price_button3).length
        l_button4 = String(price_button4).length

        prix_afficher1 = putSpace(l_button1, price_button1)
        prix_afficher2 = putSpace(l_button2, price_button2)
        prix_afficher3 = putSpace(l_button3, price_button3)
        prix_afficher4 = putSpace(l_button4, price_button4)
    
        bouton1.innerHTML = prix_afficher1 + ' €'
        bouton2.innerHTML = prix_afficher2 + ' €'
        bouton3.innerHTML = prix_afficher3 + ' €'
        bouton4.innerHTML = prix_afficher4 + ' €'
        price = description_liste[n][2]
    }
    else {
        affichage_ecran_final()
    }

}


function choiceButton1() {
    choice = 1
    if(waiting) {
        console.log('attente')
    }
    else {
        testAnswer()
    }
}
function choiceButton2() {
    choice = 2
    if(waiting) {
        console.log('attente')
    }
    else {
        testAnswer()
    }
}
function choiceButton3() {
    choice = 3
    if(waiting) {
        console.log('attente')
    }
    else {
        testAnswer()
    }
}
function choiceButton4() {
    choice = 4
    if(waiting) {
        console.log('attente')
    }
    else {
        testAnswer()
    }
}

function enleverMain() {
    document.getElementById('bouton1').style.cursor = "auto"
    document.getElementById('bouton2').style.cursor = "auto"
    document.getElementById('bouton3').style.cursor = "auto"
    document.getElementById('bouton4').style.cursor = "auto"
}

function testAnswer() {
    if(choice == 1) {
        if(price_button1 == price) {
            document.getElementById('bouton1').style.background = "green"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', true)
            score += 1

        }
        else {
            document.getElementById('bouton1').style.background = "red"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', false)
        }
    }
    else if(choice == 2) {
        if(price_button2 == price) {
            document.getElementById('bouton2').style.background = "green"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', true)
            score += 1
        }
        else {
            document.getElementById('bouton2').style.background = "red"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', false)
        }
    }
    else if(choice == 3) {
        if(price_button3 == price) {
            document.getElementById('bouton3').style.background = "green"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', true)
            score += 1
        }
        else {
            document.getElementById('bouton3').style.background = "red"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', false)
        }
    }
    else if(choice == 4) {
        if(price_button4 == price) {
            document.getElementById('bouton4').style.background = "green"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', true)
            score += 1
        }
        else {
            document.getElementById('bouton4').style.background = "red"
            enleverMain()
            setTimeout(change_picture, 1500)
            waiting = true
            couleurChargement('ch' + String(lap) + '_game', false)
        }
    }
}

function affichage_ecran_final() {
    enleverMain()
    document.getElementById('bouton1').style.background = "rgb(32 32 32 / 1)"
    document.getElementById('bouton2').style.background = "rgb(32 32 32 / 1)"
    document.getElementById('bouton3').style.background = "rgb(32 32 32 / 1)"
    document.getElementById('bouton4').style.background = "rgb(32 32 32 / 1)"
    bouton1.innerHTML = "-"
    bouton2.innerHTML = "-"
    bouton3.innerHTML = "-"
    bouton4.innerHTML = "-"

    if(score <= 4) {
        description.innerHTML = score + '/10' + "--- You are still far, try again."
    }
    else if(score > 4 && score <= 7) {
        description.innerHTML = "<b>" + score + '/10 </b>' + "--- It's good but you can still do better."
    }
    else if(score > 7 && score <= 9) {
        description.innerHTML = "<b>" + score + '/10 </b>' + "--- It's very good result !"
    }
    else if(score == 10) {
        description.innerHTML = "<b>" + score + '/10 </b>' + "--- Congratulations, you found all the answers!"
    }
    image.setAttribute('src', 'assets/content/transparent.png')
    
    document.getElementById('bouton_restart').className = "end";
    document.getElementById('fleche').className = "fleche_end";
}

function restart() {
    score = 0;
    lap = 0;
    for(var i = 1; i<=10; i++) {
        document.getElementById("ch" + String(i) + "_game").style.background = "rgb(32 32 32 / 1)"
    }
    change_picture()

}



change_picture()
