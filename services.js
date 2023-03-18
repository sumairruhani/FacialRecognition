"use strict";

//Model URL global variables
var hairModelURL = "https://teachablemachine.withgoogle.com/models/gf2JtvTHa/"; //variable used to hold path to the model
var glassesModelURL =
  "https://teachablemachine.withgoogle.com/models/yc7riJ0kE/"; // path to hold model for glasses
var genderModelURL =
  "https://teachablemachine.withgoogle.com/models/TX87sWJAZ/"; //variable used to hold path to the gender model

// Classifier global variables
var hairLengthClassifier; //variable used to hold the hair length classifier object
var glassesClassifier; //variable used to hold the glasses classifier object
var genderClassifier; //variable used to hold the gender classifier object

// Camera variable
var cam; //variable used to hold the camera object

//imported image variable
var img;

// Classifier class names label and confidence levels stored in variables
var labelShort = "",
  confShort = 0;
var labelLong = "",
  confLong = 0;

var labelGlassesOff = "",
  confOff = 0;
var labelGlassesOn = "",
  confOn = 0;

var labelMale = "",
  confMale = 0;
var labelFemale = "",
  confFemale = 0;

//p5 function - this function is automatically called by the p5 library, once only
function preload() {
  // img = loadImage("Datasets/Gender/Female/000002.jpg");
  hairLengthClassifier = ml5.imageClassifier(hairModelURL + "model.json"); //load the hair model
  glassesClassifier = ml5.imageClassifier(glassesModelURL + "model.json"); //load the glasses model
  genderClassifier = ml5.imageClassifier(genderModelURL + "model.json"); //load the gender model
}

//p5 function - this function is autmatically called after the 'preload' function; the function is only executed once
function setup() {
  var viewport = createCanvas(480, 360); //p5 function to create a p5 canvas
  // var viewport = createCanvas(178, 218); //p5 function to create a p5 canvas
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
    labelShort = results[0].label;
    confShort = results[0].confidence;
    labelLong = results[1].label;
    confLong = results[1].confidence;
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
    labelGlassesOff = results[0].label;
    confOff = results[0].confidence;
    labelGlassesOn = results[1].label;
    confOn = results[1].confidence;
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
    labelMale = results[0].label;
    confMale = results[0].confidence;
    labelFemale = results[1].label;
    confFemale = results[1].confidence;
    classify(); //execute the classify function again
  }
}

function friendlyresultsHair() {
  //A well formatted way to return the hair length confidence levels and the threshold value
  let result = "Please wait...";
  if (labelShort && labelLong) {
    let confidenceLevels = `${labelShort}: ${(confShort * 100).toFixed(
      0
    )}%, ${labelLong}: ${(confLong * 100).toFixed(0)}%`;

    switch (true) {
      case confShort >= 0.8:
        result = `${confidenceLevels}. Hair is short`;
        break;
      case confShort >= 0.6:
        result = `${confidenceLevels}. Hair is likely to be short`;
        break;
      case confShort > 0.5:
        result = `${confidenceLevels}. Hair could be short`;
        break;
      case confLong >= 0.8:
        result = `${confidenceLevels}. Hair is long`;
        break;
      case confLong >= 0.6:
        result = `${confidenceLevels}. Hair is likely to be long`;
        break;
      case confLong > 0.5:
        result = `${confidenceLevels}. Hair could be long`;
        break;
      default:
        result = `${confidenceLevels}. Hair length cannot be determined`;
        break;
    }
  } else {
    result = "Error: Hair length cannot be determined";
  }

  return result;
}

function friendlyresultsGlasses() {
  //A well formatted way to return the glasses confidence levels and the threshold value

  let result = "Please wait...";
  if (labelGlassesOff && labelGlassesOn) {
    let confidenceLevels = `${labelGlassesOff}: ${(confOff * 100).toFixed(
      0
    )}%, ${labelGlassesOn}: ${(confOn * 100).toFixed(0)}%`;

    switch (true) {
      case confOff >= 0.8:
        result = `${confidenceLevels}. Person is not wearing glasses`;
        break;
      case confOff >= 0.6:
        result = `${confidenceLevels}. Person is likely not wearing glasses`;
        break;
      case confOff > 0.5:
        result = `${confidenceLevels}. Person could be not be wearing glasses`;
        break;
      case confOn >= 0.8:
        result = `${confidenceLevels}. Person is wearing glasses`;
        break;
      case confOn >= 0.6:
        result = `${confidenceLevels}. Person is likely to be wearing glasses`;
        break;
      case confOn > 0.5:
        result = `${confidenceLevels}. Person could be wearing glasses`;
        break;
      default:
        result = `${confidenceLevels}. Cannot determine whether glasses are being worn`;
        break;
    }
  } else {
    result = "Error: Cannot determine whether glasses are being worn";
  }

  return result;
}

var labelMale = "",
  confMale = 0;
var labelFemale = "",
  confFemale = 0;

function friendlyresultsGender() {
  //A well formatted way to return the glasses confidence levels and the threshold value

  let result = "Please wait...";
  if (labelMale && labelFemale) {
    let confidenceLevels = `${labelMale}: ${(confMale * 100).toFixed(
      0
    )}%, ${labelFemale}: ${(confFemale * 100).toFixed(0)}%`;

    switch (true) {
      case confMale >= 0.8:
        result = `${confidenceLevels}. Person is a male`;
        break;
      case confMale >= 0.6:
        result = `${confidenceLevels}. Person is likely to be a male`;
        break;
      case confMale > 0.5:
        result = `${confidenceLevels}. Person could be a male`;
        break;
      case confFemale >= 0.8:
        result = `${confidenceLevels}. Person is a female`;
        break;
      case confFemale >= 0.6:
        result = `${confidenceLevels}. Person is likely to be a female`;
        break;
      case confFemale > 0.5:
        result = `${confidenceLevels}. Person could be a female`;
        break;
      default:
        result = `${confidenceLevels}. Cannot determine the gender`;
        break;
    }
  } else {
    result = "Error: Cannot determine the gender";
  }
  return result;
}

function draw() {
  //p5 function - this function is automatically called every frame
  background("#c0c0c0"); //set the canvas default back colour

  image(cam, 0, 0); //pass the video to the p5 canvas
  // image(img, 0, 0);
  document.getElementById("results").innerHTML = friendlyresultsHair(); //update the result string
  document.getElementById("results1").innerHTML = friendlyresultsGlasses(); //update the result string
  document.getElementById("results2").innerHTML = friendlyresultsGender(); //update the result string
}
