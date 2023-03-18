"use strict";
// Ada Boilerplate - JavaScript and Computer Vision Teachable Machine,
// Machine Learning & Teachable Machine Models

//for easy lets setup some quick global variables
var hairModelURL = "https://teachablemachine.withgoogle.com/models/gf2JtvTHa/"; //variable used to hold path to the model
var glassesModelURL =
  "https://teachablemachine.withgoogle.com/models/yc7riJ0kE/"; // path to hold model for glasses
var genderModelURL =
  "https://teachablemachine.withgoogle.com/models/TX87sWJAZ/"; //variable used to hold path to the gender model

var hairLengthClassifier; //variable used to hold the hair length classifier object
var glassesClassifier; //variable used to hold the glasses classifier object
var genderClassifier; //variable used to hold the gender classifier object

var cam; //variable used to hold the camera object

var label0 = "",
  confidence0 = 0; //for ease and just because we're only demo'ing with two classes
var label1 = "",
  confidence1 = 0;

var label2 = "",
  confidence2 = 0; //for ease and just because we're only demo'ing with two classes
var label3 = "",
  confidence3 = 0;

var label4 = "",
  confidence4 = 0; //for ease and just because we're only demo'ing with two classes
var label5 = "",
  confidence5 = 0;

function preload() {
  //p5 function - this function is automatically called by the p5 library, once only
  hairLengthClassifier = ml5.imageClassifier(hairModelURL + "model.json"); //load the hair model
  glassesClassifier = ml5.imageClassifier(glassesModelURL + "model.json"); //load the glasses model
  genderClassifier = ml5.imageClassifier(genderModelURL + "model.json"); //load the gender model
}

function setup() {
  //p5 function - this function is autmaticallt called after the 'preload' function; the function is only executed once
  var viewport = createCanvas(480, 360); //p5 function to create a p5 canvas
  viewport.parent("video_container"); //attach the p5 canvas to the target html div
  frameRate(24); //set the frame rate, we dont need to high performance video

  cam = createCapture(VIDEO); //p5 function, store the video information coming from the camera
  cam.hide(); //hide the cam element

  classify(); //start the classifer
}

function classify() {
  //ml5, classify the current information stored in the camera object
  hairLengthClassifier.classify(cam, processresultsHair); //once complete execute a callback to the processresults function
  glassesClassifier.classify(cam, processresultsGlasses); //once complete execute a callback to the processresults function
  genderClassifier.classify(cam, processresultsGender); //once complete execute a callback to the processresults function
}

function processresultsHair(error, results) {
  //a simple way to return the current classification details
  if (error) {
    //something seems to have gone wrong
    console.error("classifier error: " + error);
  } else {
    //no errors detected, so lets grab the label and execute the classify function again
    label0 = results[0].label;
    confidence0 = results[0].confidence;
    label1 = results[1].label;
    confidence1 = results[1].confidence;
    classify(); //execute the classify function again
  }
}

function processresultsGlasses(error, results) {
  //a simple way to return the current classification details
  if (error) {
    //something seems to have gone wrong
    console.error("classifier error: " + error);
  } else {
    //no errors detected, so lets grab the label and execute the classify function again
    label2 = results[0].label;
    confidence2 = results[0].confidence;
    label3 = results[1].label;
    confidence3 = results[1].confidence;
    classify(); //execute the classify function again
  }
}

function processresultsGender(error, results) {
  //a simple way to return the current classification details
  if (error) {
    //something seems to have gone wrong
    console.error("classifier error: " + error);
  } else {
    //no errors detected, so lets grab the label and execute the classify function again
    label4 = results[0].label;
    confidence4 = results[0].confidence;
    label5 = results[1].label;
    confidence5 = results[1].confidence;
    classify(); //execute the classify function again
  }
}

function friendlyresults() {
  //a simple way to return the current classification details
  let result = "Please wait...";
  if (label0.length > 0) {
    result =
      label0 +
      ": " +
      (confidence0 * 100).toFixed(0) +
      "%" +
      ", " +
      label1 +
      ": " +
      (confidence1 * 100).toFixed(0) +
      "%";
  }
  return result;
}

function friendlyresults1() {
  //a simple way to return the current classification details
  let result = "Please wait...";
  if (label2.length > 0) {
    result =
      label2 +
      ": " +
      (confidence2 * 100).toFixed(0) +
      "%" +
      ", " +
      label3 +
      ": " +
      (confidence3 * 100).toFixed(0) +
      "%";
  }
  return result;
}

function friendlyresults2() {
  //a simple way to return the current classification details
  let result = "Please wait...";
  if (label4.length > 0) {
    result =
      label4 +
      ": " +
      (confidence4 * 100).toFixed(0) +
      "%" +
      ", " +
      label5 +
      ": " +
      (confidence5 * 100).toFixed(0) +
      "%";
  }
  return result;
}

function draw() {
  //p5 function - this function is automatically called every frame
  background("#c0c0c0"); //set the canvas default back colour

  image(cam, 0, 0); //pass the video to the p5 canvas
  document.getElementById("results").innerHTML = friendlyresults(); //update the result string
  document.getElementById("results1").innerHTML = friendlyresults1(); //update the result string
  document.getElementById("results2").innerHTML = friendlyresults2(); //update the result string
}
