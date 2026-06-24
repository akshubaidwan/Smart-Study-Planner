
let currentUser = localStorage.getItem("currentUser") || null;

let tasks =
  JSON.parse(
    localStorage.getItem(currentUser + "_tasks")
  ) || [];
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("lastDate") || "";
function showSection(id){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
function getPriorityScore(task){
  return (task.urgency * 2) + task.importance;
}
function sortTasks(){
  tasks.sort((a,b)=> getPriorityScore(b) - getPriorityScore(a));
}
function addTask(){
  let t = document.getElementById("task").value;
  let d = document.getElementById("date").value;
  let batch =
  document.getElementById("batch").value;
  let p = document.getElementById("priority")?.value || "Medium";

  if(!t) return alert("Enter task");

  let urgency = parseInt(prompt("Urgency (1-10):")) || 5;
  let importance = parseInt(prompt("Importance (1-10):")) || 5;
  tasks.push({
    t, d, p,
    batch,
    urgency,
    importance,
    done:false,
    created:new Date()
  });
  sortTasks();
  save();
  render();
}
function render(){
  let list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((e,i)=>{
    let div = document.createElement("div");
    div.className = "task";
if(e.batch === "Coding"){
  div.style.borderLeft = "6px solid #6366f1";
}
if(e.batch === "School"){
  div.style.borderLeft = "6px solid #22c55e";
}
if(e.batch === "Revision"){
  div.style.borderLeft = "6px solid #f59e0b";
}
if(e.batch === "Science"){
  div.style.borderLeft = "6px solid #06b6d4";
}
if(e.batch === "Fitness"){
  div.style.borderLeft = "6px solid #ef4444";
}
    if(e.done) div.classList.add("done");

    /* 🔥 HIGH PRIORITY */
    if(getPriorityScore(e) > 15){
      div.style.borderLeft = "5px solid red";
      div.style.transform = "scale(1.02)";
    }
    let days = (new Date() - new Date(e.created)) / (1000*60*60*24);
    if(days > 3){
      div.classList.add("old");
    }
    div.innerHTML = `
<div class="task-left">
  <b>${e.t}</b><br>
  <small>
  📂 ${e.batch || "General"}
  | ${e.d || "No date"}
  | ${e.p}
  ${checkDeadline(e.d)}
</small>
  <!-- 📸 Upload Proof -->
  <div class="proof-box">
    <input
      type="file"
      accept="image/*"
      onchange="uploadProof(event, ${i})"
    >
    ${
      e.proof
      ?
      `<img src="${e.proof}" class="proof-img">`
      :
      ""
    }
  </div>
</div>
<div class="task-buttons">
  <button onclick="toggle(${i})">✔</button>
  <button onclick="del(${i})">✖</button>
</div>`;
    list.appendChild(div);
  });
  updateProgress();
}
function uploadProof(event, i){
  let file = event.target.files[0];
  if(!file) return;
  let reader = new FileReader();  
  reader.onload = function(e){
    tasks[i].proof = e.target.result;
    save();
    render();
  };
  reader.readAsDataURL(file);
}
function checkDeadline(date){
  if(!date) return "";
  let today = new Date();
  let due = new Date(date);
  let diff =
    Math.ceil(  // Rounds UP to nearest whole number
      (due - today) / (1000*60*60*24)
    );
  if(diff < 0){
    return " 🔴 Overdue";
  }
  if(diff <= 1){
    return " ⚠ Due Soon";
  }
  return "";
}
function toggle(i){
  tasks[i].done = !tasks[i].done;
  if(tasks[i].done){
    updateStreak();
  }
  save();
  render();
}
function del(i){
  tasks.splice(i,1);
  save();
  render();
}
function save(){
  if(!currentUser) return;

  localStorage.setItem(
    currentUser + "_tasks",
    JSON.stringify(tasks)
  );
}



/* PROGRESS BAR */
// Update completion progress UI (user interface)

function updateProgress(){
  let done = tasks.filter(t=>t.done).length;
  let total = tasks.length;
  let per = total ? (done/total)*100 : 0;

  document.getElementById("bar").style.width = per + "%";
  document.getElementById("text").innerText =
    `${done}/${total} completed`;
}



/*  TIMER SYSTEM */
// Countdown timer variables

let time = 0;
let int = null;
let alarmSound = null;

/* SET TIMER */
function setTimer(){

  let min =
    parseInt(document.getElementById("minutes").value) || 0;

  let sec =
    parseInt(document.getElementById("seconds").value) || 0;

  time = (min * 60) + sec;

  updateDisplay();
}

/* START TIMER */
function start(){

  if(int || time <= 0) return;

  int = setInterval(()=>{

    time--;

    updateDisplay();

    if(time <= 0){

      clearInterval(int);

      int = null;

      playAlarm();

      alert("🎉 Time's Up!");

    }

  },1000);
}

/* STOP / RESET TIMER */
function reset(){

  clearInterval(int);

  int = null;

  time = 0;

  document.getElementById("timerText").innerText =
    "00:00";

  stopAlarm();
}

/* DISPLAY */
function updateDisplay(){

  let m = Math.floor(time / 60);

  let s = time % 60;

  document.getElementById("timerText").innerText =
    `${m}:${s < 10 ? '0' : ''}${s}`;
}


/* PLAY ALARM SOUND */
function playAlarm(){

  stopAlarm();

  alarmSound = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  alarmSound.loop = true;

  alarmSound.volume = 1;

  alarmSound.play()
  .then(()=>{

    console.log("Alarm playing");

  })
  .catch(err=>{

    console.log("Audio blocked:", err);

    alert("Click anywhere once then start timer again to enable sound.");
  });
}

/* STOP ALARM SOUND */
function stopAlarm(){

  if(alarmSound){

    alarmSound.pause();

    alarmSound.currentTime = 0;

    alarmSound = null;
  }
}


function showStreak(){

  document.getElementById("streak").innerText =
    streak + " days";

  let img =
    document.getElementById("bookImg");

  let rewardText =
    document.getElementById("reward");

  // Always show image
  img.style.display = "block";

  if(streak >= 150){

    rewardText.innerText =
      "🎉 You unlocked Atomic Habits!";

    img.src =
      "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg";

    img.style.opacity = "1";

  } else {

    rewardText.innerText =
      `📖 ${150 - streak} days left to unlock your FREE book!`;

    img.src =
      "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg";

    img.style.opacity = "0.5";
  }
}

function updateStreak(){
  if(!currentUser) return; // only for logged-in users

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let user = users[currentUser];

  let today = new Date().toDateString();

  // ❌ already counted today → ignore
  if(user.lastDate === today) return;

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);

  if(user.lastDate === yesterday.toDateString()){
    user.streak++;
  } else {
    user.streak = 1;
  }

  user.lastDate = today;

  localStorage.setItem("users", JSON.stringify(users));

  streak = user.streak; // sync with your UI
  lastDate = user.lastDate;

  showStreak();
}
/*  AUTO BACKUP */
setInterval(()=>{
  localStorage.setItem("backup", JSON.stringify(tasks));
}, 300000);



let studyFiles =
JSON.parse(
  localStorage.getItem(currentUser + "_studyFiles")
) || [];



/*  INIT LOAD  */
// First render when page loads


render();
showStreak();
renderStudyFiles();


/*  STUDY MATERIAL  */

function loadMaterials(){
  let cls = document.getElementById("classSelect").value;
  let container = document.getElementById("materialsList");

  container.innerHTML = "";

  if(!cls){
    container.innerHTML = "<p>Select a class to view materials</p>";
    return;
  }

  let subjects = studyData[cls];

  if(!subjects){
    container.innerHTML = "<p>Materials coming soon...</p>";
    return;
  }

  subjects.forEach(s=>{
    let div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <div>
        <b>${s.sub}</b>
      </div>
      <a href="${s.link}" target="_blank">
        <button>Open</button>
      </a>
    `;

    container.appendChild(div);
  });
}

function loadClass(cls){

  let subjectsDiv = document.getElementById("subjects");

  subjectsDiv.innerHTML = `

    <div class="material-card">
      <h3>📘 Maths</h3>

      <button onclick="openPDF('${cls}','math')">
        Open Notes
      </button>
    </div>

    <div class="material-card">
      <h3>🔬 Science</h3>

      <button onclick="openPDF('${cls}','science')">
        Open Notes
      </button>
    </div>

  `;
}


/* 🔥 WORKING PDF LINKS */

function openPDF(cls, subject){

  let pdfLinks = {

    "6-math":
    "https://byjus.com/cbse-notes/cbse-notes-class-6-maths/",

    "6-science":
    "https://byjus.com/ncert-solutions-class-6-science/",

    "7-math":
    "https://byjus.com/cbse-notes/cbse-notes-class-7-maths/",

    "7-science":
    "https://byjus.com/ncert-solutions-class-7-science/",

    "8-math":
    "https://byjus.com/cbse-notes/cbse-notes-class-8-maths/",

    "8-science":
    "https://byjus.com/cbse-notes/class-8-science-notes/",

    "9-math":
    "https://byjus.com/cbse-notes/math-notes-class-9/",

    "9-science":
    "https://byjus.com/cbse-notes/class-9-science-notes/",

    "10-math":
    "https://byjus.com/ncert-solutions-class-10-maths/",

    "10-science":
    "https://byjus.com/cbse-notes/class-10-science-notes/"
  };

  let key = cls + "-" + subject;

  let url = pdfLinks[key];

  if(url){
    window.open(url, "_blank");
  }
  else{
    alert("PDF not found");
  }
}



function signup(){
  let u = prompt("Enter username:");
  let p = prompt("Enter password:");

  if(!u || !p) return alert("Fill all fields");

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(users[u]){
    alert("User already exists");
    return;
  }

  users[u] = {password:p, streak:0, lastDate:""};
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful");
}

function login(){
  let u = prompt("Enter username:");
  let p = prompt("Enter password:");

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(!users[u] || users[u].password !== p){
    alert("Invalid credentials");
    return;
  }

  currentUser = u;
  localStorage.setItem("currentUser", u);

  alert("Login successful");
}



/*  THEME TOGGLE  */

function toggleTheme(){

  let body = document.body;

  body.classList.toggle("darkMode");

  /* SAVE THEME */
  if(body.classList.contains("darkMode")){

    localStorage.setItem("theme","dark");

    createNightSky();

  } else {

    localStorage.setItem("theme","light");

    removeNightSky();
  }
}


/*  APPLY SAVED THEME  */

window.addEventListener("load", ()=>{

  let savedTheme = localStorage.getItem("theme");

  if(savedTheme === "dark"){

    document.body.classList.add("darkMode");

    createNightSky();
  }

});


/* NIGHT SKY */

function createNightSky(){

  if(document.getElementById("nightEffect")) return;

  let container = document.createElement("div");

  container.id = "nightEffect";

  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.zIndex = "0";

  /* ⭐ STARS */

  for(let i=0;i<120;i++){

    let star = document.createElement("div");

    star.style.position = "absolute";

    let size = Math.random()*3 + "px";

    star.style.width = size;
    star.style.height = size;

    star.style.background = "white";

    star.style.borderRadius = "50%";

    star.style.top = Math.random()*100 + "%";

    star.style.left = Math.random()*100 + "%";

    star.style.opacity = Math.random();

    star.animate([
      {opacity:0.2},
      {opacity:1},
      {opacity:0.2}
    ],{
      duration:2000 + Math.random()*3000,
      iterations:Infinity
    });

    container.appendChild(star);
  }

  /* 🌙 MOON */

  let moon = document.createElement("div");

  moon.style.position = "absolute";

  moon.style.width = "100px";
  moon.style.height = "100px";

  moon.style.borderRadius = "50%";

  moon.style.top = "40px";
  moon.style.right = "50px";

  moon.style.background =
    "radial-gradient(circle,#fff,#ddd)";

  moon.style.boxShadow =
    "0 0 50px rgba(255,255,255,0.8)";

  container.appendChild(moon);

  document.body.appendChild(container);
}


/* REMOVE NIGHT SKY  */

function removeNightSky(){

  let effect = document.getElementById("nightEffect");

  if(effect){

    effect.remove();
  }
}


/*  LOGIN CHECK  */

if(!localStorage.getItem("currentUser")){
  window.location.href = "login.html";
}


function logout(){

  localStorage.removeItem("currentUser");

  currentUser = null;

  window.location.href = "login.html";
}

if(currentUser){

  document.getElementById("welcomeUser").innerText =
    "Welcome, " + currentUser + " 👋";

}



/* MOTIVATION QUOTES */

const quotes = [

  "✨ Success is the sum of small efforts repeated daily.",

  "📚 Discipline beats motivation.",

  "🚀 Study now and make your future proud.",

  "🌱 Small progress is still progress.",

  "🎯 Focus on your goals, not distractions.",

  "💡 Dream big. Start small. Act now.",

  "🔥 Consistency creates success."

];

function loadQuote(){

  let quoteElement =
    document.getElementById("quote");

  if(!quoteElement) return;

  let randomQuote =
    quotes[Math.floor(Math.random() * quotes.length)];

  quoteElement.innerText = randomQuote;
}

/* LOAD QUOTE */
window.addEventListener("load", loadQuote);



/*  PRODUCTIVITY CHART  */

window.addEventListener("load", () => {

  let ctx = document.getElementById("chart");

  if(!ctx) return;

  new Chart(ctx, {

    type: "doughnut",

    data: {

      labels: ["Completed", "Pending"],

      datasets: [{

        data: [

          tasks.filter(t => t.done).length,

          tasks.filter(t => !t.done).length
        ],

        backgroundColor: [

          "#60a5fa",

          "#fb7185"
        ],

        borderWidth: 0
      }]
    },

    options: {

      responsive:true,

      maintainAspectRatio:false,

      cutout:"65%",

      plugins:{

        legend:{
          position:"bottom"
        }
      }
    }
  });

});

/* CALCULATOR */

function appendCalc(value){

  document.getElementById("calcDisplay").value += value;

}

function clearCalc(){

  document.getElementById("calcDisplay").value = "";

}

function calculate(){

  let display =
    document.getElementById("calcDisplay");

  try{

    display.value = eval(display.value);

  }
  catch{

    display.value = "Error";

  }
}



/*  STUDY SOUNDS  */

let currentAudio = null;

function playSound(type){

  // stop previous sound
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio();

  if(type === "rain"){

    currentAudio.src =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  } else if(type === "white"){

    currentAudio.src =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
  }

  currentAudio.loop = true;

  currentAudio.play();
}

function stopSound(){

  if(currentAudio){

    currentAudio.pause();

    currentAudio.currentTime = 0;
  }
}



/* QUIZ  */

function startQuiz(){

  let cls =
    document.getElementById("quizClass").value;

  let subject =
    document.getElementById("quizSubject").value;

  if(!cls || !subject){

    alert("Please select class and subject");

    return;
  }

  localStorage.setItem("quizClass", cls);

  localStorage.setItem("quizSubject", subject);

  window.location.href = "quiz.html";
}






function uploadStudyFile(){

  let file =
    document.getElementById("studyFile").files[0];

  if(!file){
    alert("Choose a file");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e){

    studyFiles.push({
      name: file.name,
      type: file.type,
      data: e.target.result,
      uploaded: new Date()
    });

    localStorage.setItem(
      currentUser + "_studyFiles",
      JSON.stringify(studyFiles)
    );

    renderStudyFiles();
  };

  reader.readAsDataURL(file);
}





function renderStudyFiles(){

  let container =
    document.getElementById("studyFilesList");

  container.innerHTML = "";

  studyFiles.forEach((file, i)=>{

    let preview = "";

    if(file.type.startsWith("image/")){
      preview =
      `<img
         src="${file.data}"
         width="120"
         style="border-radius:10px;">
      `;
    }

    let div =
      document.createElement("div");

    div.className = "task";

    div.innerHTML = `
      ${preview}

      <div>
        <b>${file.name}</b>
      </div>

      <a href="${file.data}" target="_blank">
        Open
      </a>

      <button onclick="deleteStudyFile(${i})">
        Delete
      </button>
    `;

    container.appendChild(div);
  });
}




function deleteStudyFile(i){

  studyFiles.splice(i, 1);

  localStorage.setItem(
    currentUser + "_studyFiles",
    JSON.stringify(studyFiles)
  );

  renderStudyFiles();
}