function change_score(){
    score = parseInt(Math.random()*10)
    affichage.innerHTML = score

    localStorage.setItem('score',score);
}

console.log(localStorage.getItem('score'))
