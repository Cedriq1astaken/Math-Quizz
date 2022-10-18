let mainBtn = document.getElementById('btnWelcome');
let nextBtn = document.getElementById('next');
let time = document.getElementById('time');
let answerBtn = document.getElementById('respond');
let givenAnswer = document.getElementById('answer');
let current =  document.getElementById('current');
let yourScore = document.getElementById('yourScore');
let yourTime = document.getElementById('yourTime');
let yourOldScore = document.getElementById('yourOldScore');
let yourOldTime = document.getElementById('yourOldTime');
let answerSheetBtn = document.getElementById('answerSheet');
let spc = document.getElementsByClassName('spc');
let back = document.getElementById('back');
let restartBtn = document.getElementById('restart');
let quesNum = 0;  
let pages = [
    document.getElementById('first'),
    document.getElementById('main'),
    document.getElementById('final'),
    document.getElementById('table')
]
let currentTime;
let currentTimeStatus;
let allAns = [];
let theQuestions = [];
let questionSpace = document.getElementById('question'); 
let work = 0;
class QuestionsConstructor{
    constructor(number1, sign, number2, result, status){
        this.number1 = number1,
        this.number2 = number2,
        this.sign = sign,
        this.result = result,
        this.status = status
    }
    get getOperation(){
        return `${this.number1} ${this.sign} ${this.number2}` 
    }
    set setStatus(a){
        this.status = a
    }
}
let numbers =[
    [4,2],[6,3],[25,5],[36,6],[18,9],[24,8],[2,1],[9,3],[8,4],[64,8],[49,7],[12,4]
] 

let randomQuestion = (arr) =>{
 return new Promise((resolve, reject)=>{
    let a = Math.floor(Math.random()*40)
    if(a < 10 && a >=0){
        let results = arr.reduce((x,y)=>{return x + y})
        resolve([results, '+'])
    }
    if(a < 20 && a >=10){
        let results = arr.reduce((x,y)=>{return x - y})
        resolve([results, '-'])
    }
    if(a < 30 && a >=20){
        let results = arr.reduce((x,y)=>{return x * y})
        resolve([results, '*'])
    }
    if(a < 40 && a >=30){
        let results = arr.reduce((x,y)=>{return x / y})
        resolve([results, '/'])
    }
})}

let generator = new Promise((resolve, reject) =>{
    for(i= 0 ;i <20; i++){
    let set = numbers[Math.floor(Math.random()*numbers.length)]
    let theNumber1 = set[0]
    let theNumber2 = set[1]
    let ResultAndSign = []
    let y;
    randomQuestion(set)
    .then(
        (value)=>{ 
            ResultAndSign[0] = value[0];
            ResultAndSign[1] = value[1];
        }
    ).then(
        ()=>{
            y = new QuestionsConstructor(theNumber1, ResultAndSign[1], theNumber2, ResultAndSign[0], undefined)
        }
    ).then(
        ()=>{
        theQuestions.push(y)
        }
    )
    resolve()
}  
})

let save = (a, b) =>{
    localStorage.setItem('oldScore', `${a}`)
    localStorage.setItem('oldTime', `${b}`)
}
let pageManager= (i)=>{
    pages[i].style.visibility = 'hidden';
    pages[i+1].style.visibility = 'visible'; 
    if(localStorage.length == 0){
        if(i == 1){
            yourScore.innerHTML = `Ton score est :${theQuestions.filter((y)=>{
                return y.status == true
            }).length}`
            yourTime.innerHTML = `Ton temps est : ${time.innerHTML}` 
        }
    }
    else{
        if(i == 1){
            yourScore.innerHTML = `Ton score est :${theQuestions.filter((y)=>{
                return y.status == true
            }).length}`
            yourTime.innerHTML = `Ton temps est : ${time.innerHTML}` 
            yourOldScore.innerHTML = `Ton ancien score etait: ${localStorage.getItem('oldScore')}`
            yourOldTime.innerHTML = `Ton ancien temps etait: ${localStorage.getItem('oldTime')}`
        }
    }
}

let questionManager = (i) =>{
        questionSpace.innerHTML = `${theQuestions[i].getOperation}`
        quesNum++
    }
let timer = () =>{
    let count = 1
    timeMan = setInterval(()=>{
        time.innerHTML= `${count}s`
        count++
        if(currentTimeStatus){
            clearInterval(timeMan)
        }
    }, 1000)
}

mainBtn.onclick = async ()=>{
    try{
        pageManager(0); 
        generator.then(()=>{});
        timer()
        questionManager(quesNum); 
    }catch(e){
        alert('error')
        console.error(e)
    }
}
nextBtn.onclick= () =>{
    let ans = theQuestions.filter((y)=>{
        return y.status == true
    }).length
    work--
    if(quesNum == 20){
        pageManager(1)
        save(ans, time.innerHTML)
        nextBtn.style.visibility = 'hidden'
        currentTimeStatus = true
    }
    else{
        questionManager(quesNum); 
        givenAnswer.value = '';
        current.innerHTML = `${quesNum}/20`
        nextBtn.style.visibility = 'hidden'
    }   
}
let spcManager = () =>{
    for(i= 0; i < theQuestions.length; i++){
        spc[i].innerHTML = `${theQuestions[i].getOperation} = ${allAns[i]}`
        if(theQuestions[i].status == true){
            spc[i].style.backgroundColor = 'lightgreen'
        }
        if(theQuestions[i].status == false){
            spc[i].style.backgroundColor = 'red'
        }
    }
}
answerBtn.onclick =() =>{
    if(work == 0){
        nextBtn.style.visibility = 'visible'
        if(theQuestions[quesNum-1].result == givenAnswer.value){
            theQuestions[quesNum-1].setStatus = true;
            work++
            allAns.push(givenAnswer.value)
        }
        else{
            theQuestions[quesNum-1].setStatus = false;
            work++
            allAns.push(givenAnswer.value)
        }
    }
    else{

    }
}
answerSheetBtn.onclick = () =>{
    pageManager(2);
    spcManager();
}
back.onclick= () =>{
    pages[3].style.visibility = 'hidden';
    pages[2].style.visibility = 'visible';
}
restartBtn.onclick=() =>{
    window.location.reload()
}