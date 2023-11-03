// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


      
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
};

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
};

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
const setIsProcessRunning = (value) => {
  isRunning = value;
  if(value){
    Dom.hideAll()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = null) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: 25,
    onStringTyped(){
      console.log(ccQueue);
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}
   
class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector
    // push
  }
  hidden(isHidden){
    if(isHidden == false)
      this.item.style.visibility = "visible"
    else
      this.item.style.visibility = "hidden"
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    //! push for every element
    this.push()

    // coordinates
    this.left = left
    this.top = top
    this.bottom = bottom
    this.right = right
    this.height = height
    this.width = width
    this.item.style.opacity = 1
    this.item.style.transform = "translateX(0) translateY(0)"

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj){
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems(){
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes){
      // to reset each anime after back btn pressed
      i.reset();
    } 
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom("blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(200);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if(this.selector != ".anime-header")
      Dom.arrayOfItems.push(this);
    return this;
  }
}

// support class for axis
// class Img {
//   constructor(
//     imgName = null
//     // left = null,
//     // top = null,
//     // height = null,
//     // width = null,
//     // bottom = null,
//     // right = null
//   ) {
//     // coordinates
//     // this.left = left;
//     // this.top = top;
//     // this.bottom = bottom;
//     // this.right = right;
//     // this.height = height;
//     // this.width = this.width;
//     this.img = src.get(imgName);
//     return this;
//   }
//   zIndex(idx) {
//     this.img.style.zIndex = idx;
//     return this;
//   }
//   opacity(val = 1) {
//     this.img.style.opacity = val;
//     return this;
//   }
//   rotate(deg) {
//     this.img.style.transform = `rotate(${deg}deg)`;
//     return this;
//   }
//   scale(val = 1) {
//     this.img.style.scale = val;
//     return this;
//   }
//   get() {
//     return this.img;
//   }
//   set(
//     left = null,
//     top = null,
//     height = null,
//     width = null,
//     bottom = null,
//     right = null
//   ) {
//     // coordinates
//     this.left = left;
//     this.top = top;
//     this.bottom = bottom;
//     this.right = right;
//     this.height = height;
//     this.width = width;
//     this.img.style.opacity = 1;
//     this.img.style.transform = "translateX(0) translateY(0)";

//     if (this.left !== null) this.img.style.left = String(this.left) + "px";
//     if (this.top !== null) this.img.style.top = String(this.top) + "px";
//     if (this.bottom !== null)
//       this.img.style.bottom = String(this.bottom) + "px";
//     if (this.right !== null) this.img.style.right = String(this.right) + "px";
//     if (this.height !== null)
//       this.img.style.height = String(this.height) + "px";
//     if (this.width !== null) this.img.style.width = String(this.width) + "px";
//     this.show();
//     return this;
//   }
//   show() {
//     this.img.style.display = "block";
//     this.opacity();
//     return this;
//   }
//   hide() {
//     this.img.style.display = "none";
//     return this;
//   }
//   static arrayOfImages = [];
//   static hideAll() {
//     for (let i of Img.arrayOfImages) {
//       i.hide();
//       i.opacity();
//     }
//     Img.resetImages();
//   }
//   static resetImages() {
//     Img.arrayOfImages = [];
//   }
//   static setBlinkArrow(
//     isX = true,
//     left = null,
//     top = null,
//     height = 60,
//     width = null,
//     rotate = 0
//   ) {
//     let blinkArrow = new Img("blinkArrow")
//       .set(left, top, height, width)
//       .rotate(rotate)
//       .zIndex(200);
//     if (isX === -1) {
//       blinkArrow.hide();
//       return;
//     }
//     let x = 0,
//       y = 0;
//     if (isX) {
//       x = 20;
//     } else {
//       y = 20;
//     }
//     var blink = anime({
//       targets: blinkArrow.img,
//       easing: "easeInOutQuad",
//       opacity: 1,
//       translateX: x,
//       translateY: y,
//       direction: "alternate",
//       loop: true,
//       autoplay: false,
//       duration: 300,
//     });

//     return blink;
//   }
//   push() {
//     Img.arrayOfImages.push(this);
//     return this;
//   }
// }

// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    land: new Dom("land"),
    chalk_with_hand: new Dom("chalk_with_hand"),
    chalk_markings1: new Dom("chalk_markings1"),
    chalk_markings2: new Dom("chalk_markings2"),
    chalk_markings3: new Dom("chalk_markings3"),
    chalk_markings4: new Dom("chalk_markings4"),
    chalk_markings5: new Dom("chalk_markings5"),
    chalk_markings6: new Dom("chalk_markings6"),
    marking_surface1: new Dom("marking_surface1"),
    marking_surface2: new Dom("marking_surface2"),
    marking_surface3: new Dom("marking_surface3"),
    marking_surface4: new Dom("marking_surface4"),
    marking_surface5: new Dom("marking_surface5"),
    marking_surface6: new Dom("marking_surface6"),
    anchor_plate1: new Dom("anchor_plate1"),
    anchor_plate2: new Dom("anchor_plate2"),
    anchor_plate3: new Dom("anchor_plate3"),
    beam_3d_1: new Dom("beam_3d_1"),
    beam_3d_2: new Dom("beam_3d_2"),
    beam_3d_with_holes1: new Dom("beam_3d_with_holes1"),
    beam_3d_with_holes2: new Dom("beam_3d_with_holes2"),
    ct_prop1: new Dom("ct_prop1"),
    ct_prop2: new Dom("ct_prop2"),
    ct_prop3: new Dom("ct_prop3"),
    ct_prop4: new Dom("ct_prop4"),
    ct_prop5: new Dom("ct_prop5"),
    ct_prop6: new Dom("ct_prop6"),
    foot_adapter1: new Dom("foot_adapter1"),
    foot_adapter2: new Dom("foot_adapter2"),
    foot_adapter3: new Dom("foot_adapter3"),
    head_adapter1: new Dom("head_adapter1"),
    head_adapter2: new Dom("head_adapter2"),
    full_column: new Dom("full_column"),
    drill_machine: new Dom("drill_machine"),
    hammer: new Dom("hammer"),
    nail1: new Dom("nail1"),
    nail2: new Dom("nail2"),
    nail3: new Dom("nail3"),
    nail4: new Dom("nail4"),
    objective: new Dom("objective"),
    real_foot_adapter: new Dom("real_foot_adapter"),
    real_head_adapter: new Dom("real_head_adapter"),
    sheathing: new Dom("sheathing"),
    sheathing1: new Dom("sheathing1"),
    sheathing2: new Dom("sheathing2"),
    sheathing3: new Dom("sheathing3"),
    sheathing4: new Dom("sheathing4"),
    steel_waler1: new Dom("steel_waler1"),
    steel_waler2: new Dom("steel_waler2"),
    steel_waler3: new Dom("steel_waler3"),
    tie_rod1: new Dom("tie_rod1"),
    tie_rod2: new Dom("tie_rod2"),
    tie_rod3: new Dom("tie_rod3"),
    tie_rod4: new Dom("tie_rod4"),
    wing_nut_top1: new Dom("wing_nut_top1"),
    wing_nut_top2: new Dom("wing_nut_top2"),
    wing_nut_top3: new Dom("wing_nut_top3"),
    wing_nut_top4: new Dom("wing_nut_top4"),
    wing_nut_top5: new Dom("wing_nut_top5"),
    wing_nut_full: new Dom("wing_nut_full"),
    beam_3d_with_one_hole: new Dom("beam_3d_with_one_hole"),
    beam_3d_with_holes_nailing_helper: new Dom("beam_3d_with_holes_nailing_helper"),
    beam_3d_with_holes3: new Dom("beam_3d_with_holes3"),
    beam_3d_with_holes4: new Dom("beam_3d_with_holes4"),
    sheathing_full2: new Dom("sheathing_full2"),
    sheathing_full3: new Dom("sheathing_full3"),
    flange_claw1: new Dom("flange_claw1"),
    flange_claw2: new Dom("flange_claw2"),
    flange_claw3: new Dom("flange_claw3"),
    flange_claw4: new Dom("flange_claw4"),
    steel_waler_blue1: new Dom("steel_waler_blue1"),
    steel_waler_blue2: new Dom("steel_waler_blue2"),
    steel_waler_tilt1: new Dom("steel_waler_tilt1"),
    steel_waler_tilt2: new Dom("steel_waler_tilt2"),
    column_side1: new Dom("column_side1"),
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
    }),
    (objective = function () {
      setIsProcessRunning(true);
      Dom.hideAll()

      // to stop current voice
      window.speechSynthesis.cancel();
 
      Scenes.items.welcomeBox.hide();
      Dom.setBlinkArrow(-1);
      setCC("");
      
      // * Required Items
      Scenes.items.projectIntro.show()
      Scenes.items.objective.set(0,55)
      

    anime({
      duration:4000, 
      complete(){
        setIsProcessRunning(false);
        Dom.setBlinkArrow(true, 790, 444).play();
        setCC("Click 'Next' to go to next step");

      }

    })
    return true;
  }),
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 1", "Marking the area (Diagonally and rectangularly)");
      Scenes.items.land.set(0,0,404,950)

      Scenes.items.chalk_with_hand.set(170,3,80,70).zIndex(6)
      
      Scenes.items.chalk_markings1.set(170,18,6,600).zIndex(5)
      Scenes.items.marking_surface1.set(170,18,8,600).zIndex(5)

      Scenes.items.chalk_markings2.set(600,182,6,334).rotate(90).zIndex(5)
      Scenes.items.marking_surface2.set(600,182,8,334).rotate(90).zIndex(5)

      Scenes.items.chalk_markings3.set(170,350,6,600).zIndex(5)
      Scenes.items.marking_surface3.set(170,350,8,600).zIndex(5)

      Scenes.items.chalk_markings4.set(5,182,6,334).rotate(90).zIndex(4)
      Scenes.items.marking_surface4.set(5,182,8,334).rotate(90).zIndex(4)

      Scenes.items.chalk_markings5.set(130,184,6,680).rotate(29).zIndex(3)
      Scenes.items.marking_surface5.set(130,184,8,680).rotate(29).zIndex(3)

      Scenes.items.chalk_markings6.set(130,185,6,680).rotate(-29).zIndex(2)
      Scenes.items.marking_surface6.set(130,185,8,680).rotate(-29).zIndex(2)

      Scenes.items.tempTitle1.set(788,198).setContent("2400mm").hidden()
      Scenes.items.tempTitle2.set(455,364).setContent("2700mm").hidden()

      setCC("Click on the hand to mark the area rectangularly.")
      Dom.setBlinkArrow(true,90,0).play()
      // onclick
      Scenes.items.chalk_with_hand.item.onclick = ()=>{
        Dom.setBlinkArrow(-1);

        anime.timeline({
          easing: "easeOutExpo"
        })
        .add({
          begin(){
            Scenes.items.anime_main_dom.item.style.overflow = "hidden";
          },
          targets: [Scenes.items.chalk_with_hand.item,Scenes.items.marking_surface1.item],
          left: 770,
          duration: 3000,
        })
        .add({
          begin(){
            setCC("Marking the vertical length of 2400mm")
          },
          targets: [Scenes.items.chalk_with_hand.item],
          top: 334,
          duration: 3000,
          complete(){
            Scenes.items.tempTitle1.hidden(false)
          }
        },3000)// marking of right vertical surface
        .add({
          targets: [Scenes.items.marking_surface2.item],
          top: 516,
          duration: 3000,
        },3000)
        .add({
          begin(){
            setCC("Marking the horizontal length of 2700mm")
          },
          targets: [Scenes.items.marking_surface3.item],
          left: -430,
          duration: 3000,
          complete(){
            Scenes.items.tempTitle2.hidden(false)
          }
        },6000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          left: 170,
          duration: 3000,
        },6000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          top: 4,
          duration: 3000,
        },9000)// marking of left vertical surface
        .add({
          targets: [Scenes.items.marking_surface4.item],
          top: -152,
          duration: 3000,
        },9000)
        .add({
          targets: [Scenes.items.marking_surface4.item],
          top: -152,
          duration: 3000,
        },9000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          left: 770,
          top: 338,
          duration: 3000,
        },12000)
        .add({
          targets: [Scenes.items.marking_surface5.item],
          translateX: 700,
          duration: 3000,
        },12000)
        .add({
          begin(){
            Scenes.items.chalk_with_hand.set(770,3)
          },
          endDelay: 500,
        })
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          translateX: -605,
          translateY: 335,
          duration: 3000,
        },15500)
        .add({
          targets: [Scenes.items.marking_surface6.item],
          translateX: -680,
          duration: 3000,
          complete(){
            Dom.setBlinkArrow(true, 790, 408).play()
            // Quiz.loadQuiz()
            setCC("Click 'Next' to go to next step")
            setIsProcessRunning(false)
          }
        },15500)
      }
      return true
    }),
    (step2 = function () {
      // ! fixing the overflow
      Scenes.items.anime_main_dom.item.style.overflow = "visible";

      // hide
      Dom.hideAll();
      setIsProcessRunning(true);
      Dom.setBlinkArrow(-1);
      
      Scenes.setStepHeading("Step 2", "Bring timber beam in the lab and drill holes on it.")

      // * Required Elements
      Scenes.items.beam_3d_1.set(-170,73,350).rotate(-55)
      Scenes.items.beam_3d_2.set(-250,93,350).rotate(-55).zIndex(1)
      Scenes.items.drill_machine.set(820,325,60).zIndex(2) 


      // ! remove
      // Scenes.items.beam_3d_1.set(170,73,350)
      // Scenes.items.beam_3d_with_one_hole.set(170,73,350)
      // Scenes.items.beam_3d_with_holes1.set(170,73,350)
      // Scenes.items.beam_3d_2.set(250,93,350)
      // Scenes.items.beam_3d_with_holes2.set(250,93,350)
      // Scenes.items.sheathing1.set(170,73,350)

      // Scenes.items.drill_machine.set(394,150,60)
      // Scenes.items.drill_machine.set(236,254,60)
      // Scenes.items.drill_machine.set(471,170,60)
      // Scenes.items.drill_machine.set(317,274,60) 

      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Timber Beam")
      Scenes.contentAdderAddBtn("Drill Machine")

      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = timberBeamAnime
      contentAdderBtns[1].onclick = drillMachineAnime
      
      let timberBeamCount = 0
      let drillMachineCount = 0
      function timberBeamAnime(){
        switch(timberBeamCount){
          case 0:
            anime({

              targets: Scenes.items.beam_3d_1.item,
              keyframes : [
                {left : 170},
                {rotate: 0},
              ],
              easing: "easeInOutQuad",
              duration: 2000,
              complete(){
                setCC("Click on the 'Drill Machine' to drill holes on timber beam.");      
                Dom.setBlinkArrow(true, 705,15).play();
              }
            })
            break;
            case 1:
              anime({
                targets: Scenes.items.beam_3d_2.item,
                keyframes : [
                  {left : 250},
                  {rotate: 0},
                ],
                easing: "easeInOutQuad",
                duration: 2000,
                complete(){
                setCC("Click on the 'Drill Machine' to drill holes on timber beam.");      
                  Dom.setBlinkArrow(true, 705,15).play();
                }
              })

              break
        }
        timberBeamCount++
      }

      function drillMachineAnime(){
        switch(drillMachineCount){
          case 0:
            anime.timeline({
              easing: "easeInOutQuad",
                targets: Scenes.items.drill_machine.item,
                duration: 2000,
            })
              .add({
                left: 394,
                top: 150,
                complete(){
                  Scenes.items.beam_3d_1.hide()
                  Scenes.items.beam_3d_with_one_hole.set(170,73,350)        
                }
              })
              .add({
                top: 254,
              })
              .add({
                left: 236,
                top: 254,
                complete(){
                  Scenes.items.beam_3d_with_one_hole.hide()
                  Scenes.items.beam_3d_with_holes1.set(170,73,350) 
                    
                }
              })    
              .add({
                left: 820,
                top: 325,
                complete(){
                  setCC("Click on the 'Timber Beam' to add another tim ber beam in the lab.");      
                      Dom.setBlinkArrow(true, 705,-35).play();
                }
              })      
              break;

              case 1:
                anime.timeline({
                  easing: "easeInOutQuad",
                    targets: Scenes.items.drill_machine.item,
                    duration: 2000,
                })
                  .add({
                    left: 471,
                    top: 170,
                    complete(){
                      Scenes.items.beam_3d_2.hide()
                      Scenes.items.beam_3d_with_one_hole.set(250,93,350)        
                    }
                  })
                  .add({
                    top: 274,
                  })
                  .add({
                    left: 317,
                    complete(){
                      Scenes.items.beam_3d_with_one_hole.hide()
                      Scenes.items.beam_3d_with_holes2.set(250,93,350) 
                        
                    }
                  })    
                  .add({
                    left: 820,
                    top: 325,
                    complete(){
                      setCC("Click on the 'Next' to go to next step.");      
                      Dom.setBlinkArrow(true, 790, 408).play()
                    }
                  })     
                break
        }                
        drillMachineCount++                                     
        }

      function sheathingAnime(){
        anime({
          targets: Scenes.items.form_floor_corner1.item,
          left: 73,
          easing: "easeInOutQuad",
          duration: 2000,
          complete(){
            
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }
        })
      }


      setCC("Click on the 'Timber Beam' to add Timber beam in the lab.");      
      Dom.setBlinkArrow(true, 705, -35).play()
      // onclick
      contentAdderBtns[0].onclick = timeberBeamAnime
      contentAdderBtns[1].onclick = drillMachineAnime
      // remove all the previous elements
      // Dom.hideAll();
      return true;  

    }),
    (step3 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      // Required Elements
      Scenes.setStepHeading("Step 3", "Place plywood sheathing on timber beam with the help of nailing ");

      Scenes.items.beam_3d_with_holes1.set(178,78,345)
      Scenes.items.beam_3d_with_holes2.set(250,93,350)
      Scenes.items.beam_3d_with_holes_nailing_helper.set(250,93,350).zIndex(5)
      Scenes.items.hammer.set(800,350,45).zIndex(6)
      Scenes.items.nail1.set(780,370,30).zIndex(3)
      Scenes.items.nail2.set(770,370,30).zIndex(3)
      Scenes.items.nail3.set(760,370,30).zIndex(3)
      Scenes.items.nail4.set(750,370,30).zIndex(3)
      Scenes.items.sheathing.set(-370,20,358).zIndex(2)

      
      
      
      let hammerAnime  =  anime({
        targets: Scenes.items.hammer.item,
        keyframes: [
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
        ],
        autoplay: false,
        duration: 3000,
      })
      
      //! Remove
      // Scenes.items.sheathing.set(170,73,358)

      // Scenes.items.sheathing1.set(384,149,30,10).zIndex(4)
      // Scenes.items.nail1.set(385,119,30).zIndex(3)
      
      // Scenes.items.sheathing2.set(263,230,30,10).zIndex(4)
      // Scenes.items.nail2.set(263,200,30).zIndex(3)
      // Scenes.items.sheathing3.set(330,248,30,10).zIndex(4)
      // Scenes.items.nail3.set(460,135,30).zIndex(3)
      
      // Scenes.items.sheathing4.set(459,165,30,10).zIndex(4)0
      // Scenes.items.nail4.set(329,218,30).zIndex(3)
      
      
      // Scenes.items.hammer.set(387,86,42).zIndex(6)
      // Scenes.items.hammer.set(264,166,42).zIndex(6)
      // Scenes.items.hammer.set(462,102,42).zIndex(6)
      // Scenes.items.hammer.set(330, 184, 42).zIndex(6)
      
      // Scenes.items.nail1.set(385,146,30).zIndex(3)
      
      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Sheathing")
      Scenes.contentAdderAddBtn("Nailing")

      let contentAdderBtns = getAll(".content-adder-box .btn")
      
      //* remove


      const sheathingAnime = ()=>{
        Dom.setBlinkArrow(-1)
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.sheathing.item],
              duration: 4000,
              keyframes: [
                {left: 170},
                {top: 73},
              ],
              complete(){
                Scenes.items.sheathing1.set(384,149,30,10).zIndex(4)
                Scenes.items.sheathing2.set(263,230,30,10).zIndex(4)
                Scenes.items.sheathing3.set(330,248,30,10).zIndex(4)
                Scenes.items.sheathing4.set(459,165,30,10).zIndex(4)

                Dom.setBlinkArrow(true, 710,15).play();
                setCC("Click on the 'Nailing' to nail on the sheathing.");
              }
            })
          }

      const nailingAnime = ()=>{
        Dom.setBlinkArrow(-1)
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            // * First nailing anime
            .add({
              targets: Scenes.items.nail1.item,
              keyframes:[
                {top: 119},
                {left: 385},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 387,
              top: 86,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail1.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000
            })
            // * Second nailing animation
            .add({
              targets: Scenes.items.nail2.item,
              keyframes:[
                {top: 200},
                {left: 263},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 264,
              top: 166,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail2.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000
            })
            // * Second nailing animation
            .add({
              targets: Scenes.items.nail3.item,
              keyframes:[
                {top: 135},
                {left: 460},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 462,
              top: 102,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail3.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000
            })
            // * Fourth nailing animation
            .add({
              targets: Scenes.items.nail4.item,
              keyframes:[
                {top: 218},
                {left: 329},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 330,
              top: 184,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail4.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000,
            })
            // * nailing completed ---xxx---
            .add({
              targets: Scenes.items.hammer.item,
              left: 800,
              top: 350,
              rotate: 0,
              complete(){
                Dom.setBlinkArrow(true, 790, 408).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
              }
            })
      }

      Dom.setBlinkArrow(true, 710, -35).play();
      setCC("Click on the 'Floor Corner' to add it in the lab.");
      // onclick
      contentAdderBtns[0].onclick = sheathingAnime;
      contentAdderBtns[1].onclick = nailingAnime;

      return true;
    }),
    (step4 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 4",
        "Join the steel waler with timber beam using flenge claw assembly."
      
      );

    // required items

    Scenes.items.flange_claw1.set(569,280,50,60).rotate(0).zIndex(4)
    Scenes.items.flange_claw2.set(630,280,50,60).rotate(0).zIndex(4)
    Scenes.items.flange_claw3.set(599,330,50,60).rotate(0).zIndex(4)
    Scenes.items.flange_claw4.set(660,330,50,60).rotate(0).zIndex(4)
    Scenes.items.steel_waler_blue1.set(748,280,30,135).zIndex(5)
    Scenes.items.steel_waler_blue2.set(748,330,30,135).zIndex(5)

 

    // Scenes.items.flange_claw1.set(611,352,50)
    // Scenes.items.flange_claw2.set(622,270,50)
    // Scenes.items.flange_claw3.set(555,352,50)
    // Scenes.items.flange_claw4.set(562,270,50)
    // ! before rotation
    Scenes.items.beam_3d_with_holes1.set(178-160,78,345)
    Scenes.items.beam_3d_with_holes2.set(250-160,93,350)
    Scenes.items.beam_3d_with_holes_nailing_helper.set(250-160,93,350).zIndex(5)
    Scenes.items.sheathing.set(170-160,75,358).zIndex(2)
    Scenes.items.sheathing1.set(384-160,149,30,10).zIndex(4)
    Scenes.items.sheathing2.set(263-160,230,30,10).zIndex(4)
    Scenes.items.sheathing3.set(330-160,248,30,10).zIndex(4)
    Scenes.items.sheathing4.set(459-160,165,30,10).zIndex(4)
    Scenes.items.nail1.set(385-160,148,30).zIndex(3)
    Scenes.items.nail2.set(263-160,229,30).zIndex(3)
    Scenes.items.nail3.set(460-160,162,30).zIndex(3)
    Scenes.items.nail4.set(329-160,247,30).zIndex(3)
    Scenes.items.tempTitle1.set(40,327).setContent("Before Rotation").hide()
    
    // ! after rotation
    Scenes.items.beam_3d_with_holes3.set(178+150,78,345).zIndex(2).hide()
    Scenes.items.beam_3d_with_holes4.set(250+150,93,350).zIndex(2).hide()
    Scenes.items.sheathing_full2.set(173+150,110,358).hide()
    Scenes.items.tempTitle2.set(340,327).setContent("After Rotation").hide()
    
    // Scenes.items.steel_waler1.set()
    // Scenes.items.steel_waler2.set()

    

    //! final pos
    // Scenes.items.steel_waler1.set(734,328,30)
    // Scenes.items.steel_waler2.set(734,373,30)
    // Scenes.items.steel_waler_tilt1.set(300,125,65).zIndex(5).rotate(-4)
    // Scenes.items.steel_waler_tilt2.set(155,224,65).zIndex(5).rotate(-4)
    // Scenes.items.flange_claw1.set(378,143,50,60).rotate(127).zIndex(4)
    // Scenes.items.flange_claw2.set(303,122,50,60).rotate(127).zIndex(4)
    // Scenes.items.flange_claw3.set(240,244,50,60).rotate(130).zIndex(4)
    // Scenes.items.flange_claw4.set(156,220,50,60).rotate(130).zIndex(4)
    

    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
    Scenes.contentAdderAddBtn("Steel Waler")
    Scenes.contentAdderAddBtn("Flange Claw")
    let contentAdderBtns = getAll(".content-adder-box .btn")
      
    const beforeAfterRotationAnime = ()=>{
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 1000,
      })
      .add({
        complete(){
          Scenes.items.arrowRound.set(350,70,80)
        }
      })
      .add({
        complete(){
          Scenes.items.beam_3d_with_holes3.show()
          Scenes.items.beam_3d_with_holes4.show()
          Scenes.items.sheathing_full2.show()
        }
      })
      .add({
        complete(){
          Scenes.items.tempTitle1.set(40,327).setContent("Before Rotation").show()
          Scenes.items.tempTitle2.set(340,327).setContent("After Rotation").show()      
        }
      })
      .add({
        duration: 4000,
        complete(){
          Scenes.items.arrowRound.hide()
          Scenes.items.tempTitle1.hide()
          Scenes.items.tempTitle2.hide()


          Scenes.items.beam_3d_with_holes1.hide()
          Scenes.items.beam_3d_with_holes2.hide()
          Scenes.items.beam_3d_with_holes_nailing_helper.hide()
          Scenes.items.sheathing.hide()
          Scenes.items.sheathing1.hide()
          Scenes.items.sheathing2.hide()
          Scenes.items.sheathing3.hide()
          Scenes.items.sheathing4.hide()
          Scenes.items.nail1.hide()
          Scenes.items.nail2.hide()
          Scenes.items.nail3.hide()
          Scenes.items.nail4.hide()

        }
      })
      .add({
        targets: [Scenes.items.beam_3d_with_holes4.item,Scenes.items.beam_3d_with_holes3.item,Scenes.items.sheathing_full2.item],
        left: "-=200",
        
      })
      .add({
        targets: Scenes.items.beam_3d_with_holes4.item,
        // left: 
      })

    }
    
    let steelWalerCount = 0
    const steelWalerAnime = ()=>{
    switch(steelWalerCount){
      case 0:
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.steel_waler_blue1.item,
          left: 300,
          top: 125,
          complete(){
            Scenes.items.steel_waler_blue1.hide()
            // tilt position of steel waler
            Scenes.items.steel_waler_tilt1.set(300,125,65).zIndex(5).rotate(-4)
          }
        })
        break
      
      case 1:
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.steel_waler_blue2.item,
          left: 155,
          top: 224,
          complete(){
            Scenes.items.steel_waler_blue2.hide()
            // tilt position of steel waler
            Scenes.items.steel_waler_tilt2.set(155,224,65).zIndex(5).rotate(-4)
          }
        })
        break
    }
    steelWalerCount++
    }

    let flangeClawCount = 0
    const flangeClawAnime = ()=>{
      switch(flangeClawCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000
          })
          .add({
            targets: Scenes.items.flange_claw1.item,
            left: 378,
            top: 143,
            rotate: 127,
          })
          .add({
            targets: Scenes.items.flange_claw2.item,
            left: 303,
            top: 122,
            rotate: 127,
          })
          break

          case 1:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000
            })
            .add({
              targets: Scenes.items.flange_claw3.item,
              left: 240,
              top: 244,
              rotate: 130,
            })
            .add({
              targets: Scenes.items.flange_claw4.item,
              left: 156,
              top: 220,
              rotate: 130,
            })
            break
      }
      flangeClawCount++;
    }

     //! starter animes
     beforeAfterRotationAnime()
     
     Dom.setBlinkArrow(true,718,-35).play()
     setCC("Click on the 'Pipe Waler' to add it in the lab.")
     //onclick pipe waler 
     contentAdderBtns[0].onclick = steelWalerAnime;
     contentAdderBtns[1].onclick = flangeClawAnime;

     return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 5",
        "Lift the one side of column and attach CT prop."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      Scenes.items.beam_3d_with_holes3.set(178-100,78,345).zIndex(2)
      Scenes.items.beam_3d_with_holes4.set(250-100,93,350).zIndex(2)
      Scenes.items.sheathing_full2.set(173-100,110,358)
      Scenes.items.tempTitle1.set(500,370).setContent("After Lifting").hide()

      Scenes.items.steel_waler_tilt1.set(300-50,125,65).zIndex(5).rotate(-4)
      Scenes.items.steel_waler_tilt2.set(155-50,224,65).zIndex(5).rotate(-4)
      Scenes.items.flange_claw1.set(378-50,143,50,60).rotate(127).zIndex(4)
      Scenes.items.flange_claw2.set(303-50,122,50,60).rotate(127).zIndex(4)
      Scenes.items.flange_claw3.set(240-50,244,50,60).rotate(130).zIndex(4)
      Scenes.items.flange_claw4.set(156-50,220,50,60).rotate(130).zIndex(4)
      Scenes.items.column_side1.set(400,10,350).hide()
      
      
      // !final pos
      Scenes.items.head_adapter1.set(220+150,90,25).rotate(35).zIndex(10)
      Scenes.items.head_adapter2.set(220+150,250,25).rotate(35).zIndex(10)
      Scenes.items.ct_prop1.set(135+150,80,280,50).rotate(32).zIndex(11)
      Scenes.items.ct_prop2.set(135+150,210,178,50).rotate(60).zIndex(11)
      Scenes.items.foot_adapter1.set(55+150,280,75).zIndex(12)
     

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Head Adapter");
      Scenes.contentAdderAddBtn("Foot Adapter");
      Scenes.contentAdderAddBtn("CT Prop");

      let contentAdderBtns = getAll(".content-adder-box .btn");

      let walerConnectorCount = 0;
      let steelWalerCount = 0;
      let anchorPlateCount = 0;
      let wingNutCount = 0; 

      const beforeAfterAnime = ()=>{
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 1000,
        })
        .add({
          complete(){
            Scenes.items.arrowRound.set(350,50,50)
          }
        })
        .add({
          complete(){
            Scenes.items.column_side1.show()
          }
        })
        .add({
          complete(){
            Scenes.items.tempTitle1.show()      
          }
        })
        .add({
          duration: 4000,
          complete(){
            Scenes.items.arrowRound.hide()
            Scenes.items.tempTitle1.hide()
  
  
            Scenes.items.beam_3d_with_holes3.hide()
            Scenes.items.beam_3d_with_holes4.hide()
            Scenes.items.sheathing_full2.hide()
            Scenes.items.steel_waler_tilt1.hide()
            Scenes.items.steel_waler_tilt2.hide()
            Scenes.items.flange_claw1.hide()
            Scenes.items.flange_claw2.hide()
            Scenes.items.flange_claw3.hide()
            Scenes.items.flange_claw4.hide()
      
  
          }
        })
        .add({
          targets: Scenes.items.column_side1.item,
          left: "-=150",
          complete(){
            Scenes.items.ct_prop1.set(187,250,250,50).rotate(90).zIndex(11)
            Scenes.items.ct_prop2.set(153,305,185,50).rotate(90).zIndex(11)
            
            Scenes.items.head_adapter1.set(400,360,25).zIndex(10)
            Scenes.items.head_adapter2.set(440,360,25).zIndex(10)
            
            Scenes.items.foot_adapter1.set(510,310,75).zIndex(12)
          }
        })  
      }

      const headAdapterAnime = ()=>{
            anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.head_adapter1.item,
              left:220,
              top:129,
            })
            .add({
              targets: Scenes.items.head_adapter2.item,
              left:220,
              top:212,
              complete(){
                setCC("Click on the 'Foot Adapter' to support the CT Prop.")
                Dom.setBlinkArrow(true,700,15).play()
              }
            })
     
      }
      
      const footAdapterAnime = ()=>{
        switch(footAdapterCount){
          case 0:
            anime({
              easing: "easeInOutQuad",
              targets: Scenes.items.foot_adapter1.item,
              left:55,
              top:280,
              duration: 1000,
              complete(){
                setCC("Click on the 'CT Prop' to support the form floor panel.")
                Dom.setBlinkArrow(true,700,65).play()
              }
            })
            break
          case 1:
            anime({
              easing: "easeInOutQuad",
              targets: Scenes.items.foot_adapter2.item,
              left:216,
              top:280,
              duration: 1000,
            })
            break
          case 2:
            anime({
              easing: "easeInOutQuad",
              targets: Scenes.items.foot_adapter3.item,
              left:376,
              top:280,
              duration: 1000,
            })
            break
  
          
        }
        footAdapterCount++;
      }
  
      const ctPropAnime = ()=>{
        let rotationCount = 2;
        switch(ctPropCount){
          case 0:
            anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.ct_prop1.item,
              left:135, 
              top:115,
              rotate: 35
            })
            .add({
              targets: Scenes.items.ct_prop2.item,
              left:135, 
              top:190,
              rotate: 50,
              complete(){
                // for next step
                Scenes.items.ct_prop3.set(187,250,250,50).rotate(90).zIndex(11)
                Scenes.items.ct_prop4.set(153,305,185,50).rotate(90).zIndex(11)
                
                Scenes.items.head_adapter3.set(400,360,25).zIndex(10)
                Scenes.items.head_adapter4.set(440,360,25).zIndex(10)
                
                Scenes.items.foot_adapter2.set(510,310,75).zIndex(12)
  
                setCC("Click on the 'Repeat' to repeat the previous steps.")
                Dom.setBlinkArrow(true,700,115).play()
              }
            })
            break
          case 1:
            anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.ct_prop3.item,
              left:295, 
              top:115,
              rotate: 35
                
            })
            .add({
              targets: Scenes.items.ct_prop4.item,
              left:295, 
              top:190,
              rotate: 50,
              complete(){
                Scenes.items.ct_prop5.set(187,250,250,50).rotate(90).zIndex(11)
                Scenes.items.ct_prop6.set(153,305,185,50).rotate(90).zIndex(11)
                
                Scenes.items.head_adapter5.set(400,360,25).zIndex(10)
                Scenes.items.head_adapter6.set(440,360,25).zIndex(10)
                
                Scenes.items.foot_adapter3.set(510,310,75).zIndex(12)
  
                //! for image box
                Scenes.items.imageBoxSrc.item.src = "./src/images/real_foot_adapter.png";
                Scenes.items.imageBoxTitle.setContent("Foot Adapter")
              }  
            })
            
            break
          case 2:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
            })
            .add({
              targets: Scenes.items.ct_prop5.item,
              left:455, 
              top:115,
              rotate: 35
                
            })
            .add({
              targets: Scenes.items.ct_prop6.item,
              left:455, 
              top:190,
              rotate: 50,
              complete(){
                Quiz.loadQuiz();
  
                
  
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 408).play();
                setIsProcessRunning(false);
              }
            })
            break
        }
  
        ctPropCount++;
      }


    // !starter animes
    beforeAfterAnime()
    
    Dom.setBlinkArrow(true,680,-35).play()
    setCC("Click on the 'Waler Connector' to connect it with the pipe.")
    //onclick
    contentAdderBtns[0].onclick = walerConnectorAnime
    contentAdderBtns[1].onclick = steelWalerAnime
    contentAdderBtns[2].onclick = anchorPlateAnime
    contentAdderBtns[3].onclick = wingNutAnime
    contentAdderBtns[4].onclick = ()=>{
      anime.timeline()
      .add({
        duration: 2000,
        begin(){
          walerConnectorAnime()
        }
      })
      .add({
        duration: 1000,
        begin(){
          steelWalerAnime()
        }
      })
      .add({
        duration: 1000,
        begin(){
          anchorPlateAnime()
        }
      })
      .add({
        duration: 1000,
        begin(){
          wingNutAnime()
        }
      })
    }
    




    // setCC("Click 'Next' to go to next step");
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading(
        "Step 6",
        "Attaching CT prop with steel waler for providing support."
      );

      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
      Scenes.items.form_floor_corner1.set(626,87,190).rotate(1).zIndex(2)
    Scenes.items.form_floor_corner2.set(121,89,190).rotate(-1).zIndex(2)
    
    Scenes.items.panel1.set(153,95,178)
    Scenes.items.panel2.set(311,95,178)
    Scenes.items.panel3.set(469,95,178)

    Scenes.items.waler_clip1.set(150,110,20).zIndex(3)
    Scenes.items.waler_clip2.set(150,150,20).zIndex(3)
    Scenes.items.waler_clip3.set(150,190,20).zIndex(3)
    Scenes.items.waler_clip4.set(150,230,20).zIndex(3)
    
    Scenes.items.waler_clip5.set(306,110,20)
    Scenes.items.waler_clip6.set(306,150,20)
    Scenes.items.waler_clip7.set(306,190,20)
    Scenes.items.waler_clip8.set(306,230,20)
    
    Scenes.items.waler_clip9 .set(462,110,20)
    Scenes.items.waler_clip10.set(462,150,20)
    Scenes.items.waler_clip11.set(462,190,20)
    Scenes.items.waler_clip12.set(462,230,20)
    
    Scenes.items.waler_clip13.set(618,110,20).zIndex(3)
    Scenes.items.waler_clip14.set(618,150,20).zIndex(3)
    Scenes.items.waler_clip15.set(618,190,20).zIndex(3)
    Scenes.items.waler_clip16.set(618,230,20).zIndex(3)

    Scenes.items.pipe_waler_cutout1.set(37,360,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(37,380,18,550).zIndex(4)
    
    Scenes.items.pipe_waler_connector1.set(700,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector2.set(725,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector3.set(750,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector4.set(775,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector5.set(710,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector6.set(735,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector7.set(760,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector8.set(785,330,30,20).zIndex(5)

    Scenes.items.pipe_waler_cutout1.set(115,130,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(115,215,18,550).zIndex(4)

    Scenes.items.pipe_waler_connector1.set(142,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector2.set(300,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector3.set(456,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector4.set(612,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector5.set(142,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector6.set(300,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector7.set(456,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector8.set(612,204,30,20).zIndex(5)

    Scenes.items.steel_waler1.set(140,168,30,185).rotate(90).zIndex(7)
    Scenes.items.steel_waler2.set(300,168,30,185).rotate(90).zIndex(7)
    Scenes.items.steel_waler3.set(455,168,30,185).rotate(90).zIndex(7)
    
    Scenes.items.steel_waler_connector1.set(220,130,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector2.set(220,216,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector3.set(380,130,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector4.set(380,216,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector5.set(535,130,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector6.set(535,216,30).rotate(-40).zIndex(6)

    Scenes.items.anchor_plate1.set(220,129,25).zIndex(8)
    Scenes.items.anchor_plate2.set(220,212,25).zIndex(8)
    Scenes.items.anchor_plate3.set(380,129,25).zIndex(8)
    Scenes.items.anchor_plate4.set(380,212,25).zIndex(8)
    Scenes.items.anchor_plate5.set(536,129,25).zIndex(8)
    Scenes.items.anchor_plate6.set(536,212,25).zIndex(8)

    Scenes.items.wing_nut1.set(219,137.5,8).zIndex(9)
    Scenes.items.wing_nut2.set(219,220.5,8).zIndex(9)
    Scenes.items.wing_nut3.set(379,137.5,8).zIndex(9)
    Scenes.items.wing_nut4.set(379,220.5,8).zIndex(9)
    Scenes.items.wing_nut5.set(535,137.5,8).zIndex(9)
    Scenes.items.wing_nut6.set(535,220.5,8).zIndex(9)

    Scenes.items.ct_prop1.set(187,250,250,50).rotate(90).zIndex(11)
    Scenes.items.ct_prop2.set(153,305,185,50).rotate(90).zIndex(11)
    
    Scenes.items.head_adapter1.set(400,360,25).zIndex(10)
    Scenes.items.head_adapter2.set(440,360,25).zIndex(10)
    
    Scenes.items.foot_adapter1.set(510,310,75).zIndex(12)

    // image Box
    Scenes.items.imageBox.show("flex").set(750,200)
    Scenes.items.imageBoxSrc.item.src = "./src/images/real_head_adapter.png";
    Scenes.items.imageBoxTitle.setContent("Head Adapter")

    //! remove
    // Scenes.items.head_adapter1.set(220,129,25).zIndex(10)
    // Scenes.items.head_adapter2.set(220,212,25).zIndex(10)
    // Scenes.items.head_adapter3.set(380,129,25).zIndex(10)
    // Scenes.items.head_adapter4.set(380,212,25).zIndex(10)
    // Scenes.items.head_adapter5.set(536,129,25).zIndex(10)
    // Scenes.items.head_adapter6.set(536,212,25).zIndex(10)

    // Scenes.items.ct_prop1.set(135,115,250,50).rotate(35).zIndex(11)
    // Scenes.items.ct_prop2.set(135,190,185,50).rotate(50).zIndex(11)
    // Scenes.items.ct_prop3.set(295,115,250,50).rotate(35).zIndex(11)
    // Scenes.items.ct_prop4.set(295,190,185,50).rotate(50).zIndex(11)
    // Scenes.items.ct_prop5.set(455,115,250,50).rotate(35).zIndex(11)
    // Scenes.items.ct_prop6.set(455,190,185,50).rotate(50).zIndex(11)

    // Scenes.items.foot_adapter1.set(55,280,75).zIndex(12)
    // Scenes.items.foot_adapter2.set(216,280,75).zIndex(12)
    // Scenes.items.foot_adapter3.set(376,280,75).zIndex(12)
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    Scenes.contentAdderAddBtn("Head Adapter");
    Scenes.contentAdderAddBtn("Foot Adapter");
    Scenes.contentAdderAddBtn("CT Prop");
    Scenes.contentAdderAddBtn("Repeat");
    let contentAdderBtns = getAll(".content-adder-box .btn");

    let headAdapterCount = 0; 
    let footAdapterCount = 0;
    let ctPropCount = 0;

    const headAdapterAnime = ()=>{
      switch(headAdapterCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.head_adapter1.item,
            left:220,
            top:129,
          })
          .add({
            targets: Scenes.items.head_adapter2.item,
            left:220,
            top:212,
            complete(){
              setCC("Click on the 'Foot Adapter' to support the CT Prop.")
              Dom.setBlinkArrow(true,700,15).play()
            }
          })
          break

        case 1:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.head_adapter3.item,
            left:380,
            top:129,
          })
          .add({
            targets: Scenes.items.head_adapter4.item,
            left:380,
            top:212,
          })
          break

        case 2:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.head_adapter5.item,
            left:536,
            top:129,
          })
          .add({
            targets: Scenes.items.head_adapter6.item,
            left:536,
            top:212,
          })
          break

      }
      headAdapterCount++;
    }
    
    const footAdapterAnime = ()=>{
      switch(footAdapterCount){
        case 0:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.foot_adapter1.item,
            left:55,
            top:280,
            duration: 1000,
            complete(){
              setCC("Click on the 'CT Prop' to support the form floor panel.")
              Dom.setBlinkArrow(true,700,65).play()
            }
          })
          break
        case 1:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.foot_adapter2.item,
            left:216,
            top:280,
            duration: 1000,
          })
          break
        case 2:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.foot_adapter3.item,
            left:376,
            top:280,
            duration: 1000,
          })
          break

        
      }
      footAdapterCount++;
    }

    const ctPropAnime = ()=>{
      let rotationCount = 2;
      switch(ctPropCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.ct_prop1.item,
            left:135, 
            top:115,
            rotate: 35
          })
          .add({
            targets: Scenes.items.ct_prop2.item,
            left:135, 
            top:190,
            rotate: 50,
            complete(){
              // for next step
              Scenes.items.ct_prop3.set(187,250,250,50).rotate(90).zIndex(11)
              Scenes.items.ct_prop4.set(153,305,185,50).rotate(90).zIndex(11)
              
              Scenes.items.head_adapter3.set(400,360,25).zIndex(10)
              Scenes.items.head_adapter4.set(440,360,25).zIndex(10)
              
              Scenes.items.foot_adapter2.set(510,310,75).zIndex(12)

              setCC("Click on the 'Repeat' to repeat the previous steps.")
              Dom.setBlinkArrow(true,700,115).play()
            }
          })
          break
        case 1:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.ct_prop3.item,
            left:295, 
            top:115,
            rotate: 35
              
          })
          .add({
            targets: Scenes.items.ct_prop4.item,
            left:295, 
            top:190,
            rotate: 50,
            complete(){
              Scenes.items.ct_prop5.set(187,250,250,50).rotate(90).zIndex(11)
              Scenes.items.ct_prop6.set(153,305,185,50).rotate(90).zIndex(11)
              
              Scenes.items.head_adapter5.set(400,360,25).zIndex(10)
              Scenes.items.head_adapter6.set(440,360,25).zIndex(10)
              
              Scenes.items.foot_adapter3.set(510,310,75).zIndex(12)

              //! for image box
              Scenes.items.imageBoxSrc.item.src = "./src/images/real_foot_adapter.png";
              Scenes.items.imageBoxTitle.setContent("Foot Adapter")
            }  
          })
          
          break
        case 2:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 1000,
          })
          .add({
            targets: Scenes.items.ct_prop5.item,
            left:455, 
            top:115,
            rotate: 35
              
          })
          .add({
            targets: Scenes.items.ct_prop6.item,
            left:455, 
            top:190,
            rotate: 50,
            complete(){
              

              setCC("Click 'Next' to go to next step");
              Dom.setBlinkArrow(true, 790, 408).play();
              setIsProcessRunning(false);
            }
          })
          break
      }

      ctPropCount++;
    }

    setCC("Click on the 'Head Adapter' to attach it with steel waler.")
    Dom.setBlinkArrow(true,700,-35).play()
    //onclick
    contentAdderBtns[0].onclick = headAdapterAnime
    contentAdderBtns[1].onclick = footAdapterAnime
    contentAdderBtns[2].onclick = ctPropAnime
    contentAdderBtns[3].onclick = function(){
      headAdapterAnime()
      footAdapterAnime()
      ctPropAnime()
    }

    // setCC("Click 'Next' to go to next step");
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),
    (step7 = function () {
      setIsProcessRunning(true);
      Scenes.setStepHeading(
        "Step 7",
        "Repeat Step 2 to Step 6 for remainnig three sides."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
     Scenes.items.full_foundation_front1.set(0,0).zIndex(4)
     Scenes.items.full_foundation_front2.set(-400,0).zIndex(3).hidden()
     Scenes.items.full_foundation_front3.set(-50,-50).zIndex(2).hidden()
     Scenes.items.full_foundation_front4.set(100,0).zIndex(1).hidden()
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    Scenes.contentAdderAddBtn("Left Side");
    Scenes.contentAdderAddBtn("Back Side");
    Scenes.contentAdderAddBtn("Right Side");
    let contentAdderBtns = getAll(".content-adder-box .btn");

    const leftSideAnime = ()=>{
      Scenes.items.full_foundation_front2.hidden(false)
      anime({
        targets: Scenes.items.full_foundation_front2.item,
        left: 0,
        easing: "easeOutQuad",
        duration: 3000,
      })
    }
    
    const backSideAnime = ()=>{
      Scenes.items.full_foundation_front3.hidden(false)
      anime({
        targets: Scenes.items.full_foundation_front3.item,
        top: 0,
        left: 0,
        easing: "easeOutQuad",
        duration: 3000,
      })
    }

    const rightSideAnime = ()=>{
      Scenes.items.full_foundation_front4.hidden(false)
      anime({
        targets: Scenes.items.full_foundation_front4.item,
        left: 0,
        easing: "easeOutQuad",
        duration: 3000,
        complete(){
          setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 408).play();
          setIsProcessRunning(false);
        }
      })
    }

    //onclick
    contentAdderBtns[0].onclick = leftSideAnime
    contentAdderBtns[1].onclick = backSideAnime
    contentAdderBtns[2].onclick = rightSideAnime

    // setCC("Click 'Next' to go to next step");
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),


    (completed = function () {
      Dom.hideAll();
      Scenes.items.contentAdderBox.setContent("");

      // get(".btn-save").style.display = "block";
      Scenes.items.btn_save.show().push();
      Dom.setBlinkArrow(-1);
      setCC("Download it and share with your friends.");
      // certificate name
      let certificateStuName = get("#certificateStuName");
      certificateStuName.innerHTML = student_name;
      // get("#quizScore").innerHTML = Quiz.score;
      get("#certificateDate").innerHTML = currentDateGlobal;
      Scenes.items.certificate.show("flex").push();

      // * restart btn

      let nxtBtn = get(".btn-next");
      nxtBtn.innerHTML = "Restart";
      nxtBtn.onclick = function () {
        location.reload();
      };

      return true;
    }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      backDrawerItem();
      backProgressBar();
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

Scenes.steps[6]()
// Scenes.next()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");
const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});
// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
function getCursor(event) {
  let x = event.clientX;
  let y = event.clientY;
  let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

  const infoElement = document.getElementById("info");
  infoElement.innerHTML = _position;
  infoElement.style.top = y + "px";
  infoElement.style.left = x + 20 + "px";
}
                                 