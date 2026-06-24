let cls =
  localStorage.getItem("quizClass");

let subject = localStorage.getItem("quizSubject").toLowerCase().trim();

document.getElementById("quizTitle").innerText =
  `Class ${cls} ${subject.toUpperCase()} Quiz`;

/*  QUESTIONS */

let quizzes = {

  /*  CLASS 6 */

  "6-math":[

    {q:"5 + 3 = ?", options:["6","7","8","9"], answer:"8"},
    {q:"10 - 4 = ?", options:["4","5","6","7"], answer:"6"},
    {q:"12 ÷ 3 = ?", options:["2","3","4","5"], answer:"4"},
    {q:"7 × 2 = ?", options:["12","13","14","15"], answer:"14"},
    {q:"Square of 5?", options:["10","20","25","30"], answer:"25"},
    {q:"Half of 18?", options:["6","7","8","9"], answer:"9"},
    {q:"15 + 10 = ?", options:["20","25","30","35"], answer:"25"},
    {q:"9 × 9 = ?", options:["72","81","91","99"], answer:"81"},
    {q:"100 ÷ 10 = ?", options:["5","10","15","20"], answer:"10"},
    {q:"8 + 12 = ?", options:["18","19","20","21"], answer:"20"}

  ],

  "6-science":[

    {q:"Plants make food by?", options:["Breathing","Photosynthesis","Digestion","Sleeping"], answer:"Photosynthesis"},
    {q:"Which organ pumps blood?", options:["Brain","Liver","Heart","Lungs"], answer:"Heart"},
    {q:"Water freezes at?", options:["0°C","50°C","100°C","10°C"], answer:"0°C"},
    {q:"Humans breathe using?", options:["Heart","Kidney","Lungs","Eyes"], answer:"Lungs"},
    {q:"Earth is a?", options:["Star","Planet","Moon","Comet"], answer:"Planet"},
    {q:"Which vitamin from sunlight?", options:["A","B","C","D"], answer:"D"},
    {q:"Animals that eat plants?", options:["Carnivores","Herbivores","Omnivores","Insects"], answer:"Herbivores"},
    {q:"Boiling point of water?", options:["50°C","75°C","100°C","120°C"], answer:"100°C"},
    {q:"Largest planet?", options:["Mars","Earth","Jupiter","Venus"], answer:"Jupiter"},
    {q:"We need oxygen for?", options:["Sleeping","Breathing","Eating","Walking"], answer:"Breathing"}

  ],

  /* ================= CLASS 7 ================= */

  "7-math":[

    {q:"7 × 8 = ?", options:["54","56","58","60"], answer:"56"},
    {q:"49 ÷ 7 = ?", options:["5","6","7","8"], answer:"7"},
    {q:"Square root of 64?", options:["6","7","8","9"], answer:"8"},
    {q:"15 × 5 = ?", options:["65","70","75","80"], answer:"75"},
    {q:"100 - 45 = ?", options:["45","50","55","60"], answer:"55"},
    {q:"20 + 30 = ?", options:["40","45","50","55"], answer:"50"},
    {q:"9 × 11 = ?", options:["88","99","100","101"], answer:"99"},
    {q:"90 ÷ 9 = ?", options:["8","9","10","11"], answer:"10"},
    {q:"Cube of 2?", options:["4","6","8","10"], answer:"8"},
    {q:"18 + 12 = ?", options:["28","29","30","31"], answer:"30"}

  ],

  "7-science":[

    {q:"Water boils at?", options:["50°C","100°C","150°C","200°C"], answer:"100°C"},
    {q:"Plants release?", options:["Nitrogen","Oxygen","Carbon","Smoke"], answer:"Oxygen"},
    {q:"Sun is a?", options:["Planet","Star","Moon","Rock"], answer:"Star"},
    {q:"Which gas do humans inhale?", options:["CO2","Oxygen","Nitrogen","Hydrogen"], answer:"Oxygen"},
    {q:"Human skeleton gives?", options:["Food","Support","Water","Air"], answer:"Support"},
    {q:"Which organ helps digestion?", options:["Liver","Heart","Eyes","Lungs"], answer:"Liver"},
    {q:"Nearest planet to Sun?", options:["Earth","Mercury","Mars","Venus"], answer:"Mercury"},
    {q:"Force pulling objects down?", options:["Magnetism","Gravity","Electricity","Energy"], answer:"Gravity"},
    {q:"Electricity flows through?", options:["Conductors","Rubber","Wood","Plastic"], answer:"Conductors"},
    {q:"Moon revolves around?", options:["Mars","Earth","Sun","Jupiter"], answer:"Earth"}

  ],

  /* ================= CLASS 8 ================= */

  "8-math":[

    {q:"8 × 8 = ?", options:["56","64","72","80"], answer:"64"},
    {q:"144 ÷ 12 = ?", options:["10","11","12","13"], answer:"12"},
    {q:"Square root of 81?", options:["7","8","9","10"], answer:"9"},
    {q:"25% of 100?", options:["20","25","30","35"], answer:"25"},
    {q:"50 + 75 = ?", options:["100","110","120","125"], answer:"125"},
    {q:"12 × 12 = ?", options:["124","132","144","154"], answer:"144"},
    {q:"200 - 50 = ?", options:["100","120","150","170"], answer:"150"},
    {q:"3³ = ?", options:["6","9","18","27"], answer:"27"},
    {q:"90 + 10 = ?", options:["95","100","105","110"], answer:"100"},
    {q:"40 ÷ 5 = ?", options:["6","7","8","9"], answer:"8"}

  ],

  "8-science":[

    {q:"Cell is the basic unit of?", options:["Body","Life","Plant","Water"], answer:"Life"},
    {q:"Plants absorb water through?", options:["Leaves","Flowers","Roots","Stem"], answer:"Roots"},
    {q:"Gas needed for photosynthesis?", options:["Oxygen","Hydrogen","Carbon Dioxide","Nitrogen"], answer:"Carbon Dioxide"},
    {q:"Speed unit?", options:["kg","m/s","cm","g"], answer:"m/s"},
    {q:"Largest organ in human body?", options:["Heart","Skin","Lungs","Brain"], answer:"Skin"},
    {q:"Electric bulb converts?", options:["Light to heat","Electricity to light","Sound to heat","Heat to light"], answer:"Electricity to light"},
    {q:"H2O is?", options:["Salt","Water","Hydrogen","Oxygen"], answer:"Water"},
    {q:"Earth has how many moons?", options:["0","1","2","3"], answer:"1"},
    {q:"Energy from Sun is?", options:["Solar","Wind","Water","Coal"], answer:"Solar"},
    {q:"Human blood color?", options:["Blue","Green","Red","Yellow"], answer:"Red"}

  ],

  /* ================= CLASS 9 ================= */

  "9-math":[

    {q:"Value of π?", options:["2.14","3.14","4.14","5.14"], answer:"3.14"},
    {q:"10² = ?", options:["10","20","100","1000"], answer:"100"},
    {q:"√121 = ?", options:["9","10","11","12"], answer:"11"},
    {q:"15² = ?", options:["125","225","325","425"], answer:"225"},
    {q:"100 ÷ 25 = ?", options:["2","3","4","5"], answer:"4"},
    {q:"7³ = ?", options:["49","147","243","343"], answer:"343"},
    {q:"45 + 55 = ?", options:["90","95","100","105"], answer:"100"},
    {q:"5 × 20 = ?", options:["50","75","100","120"], answer:"100"},
    {q:"Perimeter of square?", options:["4 × side","2 × side","side²","None"], answer:"4 × side"},
    {q:"Area of rectangle?", options:["l+b","l×b","2l+b","2(l+b)"], answer:"l×b"}

  ],

  "9-science":[

    {q:"Unit of force?", options:["Newton","Joule","Watt","Volt"], answer:"Newton"},
    {q:"Speed of light?", options:["3×10⁸ m/s","300 m/s","30 m/s","3 m/s"], answer:"3×10⁸ m/s"},
    {q:"Atomic number of Hydrogen?", options:["1","2","3","4"], answer:"1"},
    {q:"Photosynthesis occurs in?", options:["Roots","Stem","Leaves","Flowers"], answer:"Leaves"},
    {q:"SI unit of work?", options:["Joule","Newton","Volt","Ampere"], answer:"Joule"},
    {q:"Heart pumps?", options:["Water","Blood","Oxygen","Food"], answer:"Blood"},
    {q:"Which gas causes global warming?", options:["Oxygen","CO2","Hydrogen","Nitrogen"], answer:"CO2"},
    {q:"Human brain is in?", options:["Chest","Leg","Head","Hand"], answer:"Head"},
    {q:"Nearest star to Earth?", options:["Moon","Mars","Sun","Jupiter"], answer:"Sun"},
    {q:"Matter exists in?", options:["1 state","2 states","3 states","4 states"], answer:"3 states"}

  ],

  /* ================= CLASS 10 ================= */

  "10-math":[

    {q:"Quadratic equation degree?", options:["1","2","3","4"], answer:"2"},
    {q:"√144 = ?", options:["10","11","12","13"], answer:"12"},
    {q:"Sin 90° = ?", options:["0","1","2","-1"], answer:"1"},
    {q:"Cos 0° = ?", options:["0","1","-1","2"], answer:"1"},
    {q:"10 × 10 = ?", options:["10","50","100","1000"], answer:"100"},
    {q:"Area of circle formula?", options:["πr²","2πr","r²","πd"], answer:"πr²"},
    {q:"180 ÷ 2 = ?", options:["80","85","90","95"], answer:"90"},
    {q:"5² = ?", options:["10","15","20","25"], answer:"25"},
    {q:"Pythagoras theorem?", options:["a+b=c","a²+b²=c²","a²-b²=c²","None"], answer:"a²+b²=c²"},
    {q:"10% of 200?", options:["10","20","30","40"], answer:"20"}

  ],

  "10-science":[

    {q:"Chemical symbol of Oxygen?", options:["O","Ox","Og","On"], answer:"O"},
    {q:"pH of pure water?", options:["5","6","7","8"], answer:"7"},
    {q:"Unit of electricity?", options:["Volt","Ampere","Ohm","All"], answer:"All"},
    {q:"Human blood group discovered by?", options:["Newton","Landsteiner","Einstein","Darwin"], answer:"Landsteiner"},
    {q:"DNA full form?", options:["Deoxyribo Nucleic Acid","Dynamic Acid","None","Data Acid"], answer:"Deoxyribo Nucleic Acid"},
    {q:"Earth atmosphere mainly contains?", options:["Oxygen","Nitrogen","CO2","Hydrogen"], answer:"Nitrogen"},
    {q:"Which lens used in microscope?", options:["Concave","Convex","Plane","None"], answer:"Convex"},
    {q:"Plants reproduce by?", options:["Seeds","Roots","Both","None"], answer:"Both"},
    {q:"Current unit?", options:["Volt","Ampere","Watt","Joule"], answer:"Ampere"},
    {q:"Acid turns blue litmus?", options:["Red","Green","Yellow","Black"], answer:"Red"}

  ]

};

/*  QUIZ LOGIC  */

let key = cls + "-" + subject;

let questions = quizzes[key];
let selected = "";

let index = 0;

let score = 0;


/* LOAD QUESTION */

function loadQuestion(){

  let q = questions[index];

  document.getElementById("questionBox").innerHTML =
    `<h2>${index+1}. ${q.q}</h2>`;

  let optionsHTML = "";

  q.options.forEach(opt=>{

    optionsHTML += `
      <button onclick="selectAnswer(this, '${opt}')">
        ${opt}
      </button>
    `;
  });

  document.getElementById("optionsBox").innerHTML = optionsHTML;
}

loadQuestion();

/* SELECT ANSWER */
function selectAnswer(btn, ans){

  selected = ans; // store selected answer

  let q = questions[index];

  let allButtons = document.querySelectorAll("#optionsBox button");

  allButtons.forEach(b => b.classList.add("disabled"));

  if(ans === q.answer){
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");

    allButtons.forEach(b => {
      if(b.innerText.trim() === q.answer){
        b.classList.add("correct");
      }
    });
  }
}
/* NEXT QUESTION */

function nextQuestion(){

  selected = "";

  index++;
if(index >= questions.length){

  document.getElementById("questionBox").innerHTML =
    "🎉 Quiz Completed";

  document.getElementById("optionsBox").innerHTML = "";

  document.getElementById("scoreText").innerText =
    `Your Score: ${score}/${questions.length}`;

  // 👉 go back to index page after 3 seconds
  setTimeout(function(){
    window.location.href = "index.html";
  }, 3000);

  return;
}

  loadQuestion();
}

