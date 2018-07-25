// Initialize Firebase
var config = {
    apiKey: "AIzaSyAwsN2Wrp9wGYkwkwzWYlht2RpJRRoXMyw",
    authDomain: "train-scheduler-alex-bowen.firebaseapp.com",
    databaseURL: "https://train-scheduler-alex-bowen.firebaseio.com",
    projectId: "train-scheduler-alex-bowen",
    storageBucket: "train-scheduler-alex-bowen.appspot.com",
    messagingSenderId: "782417296585"
};

firebase.initializeApp(config);

var database = firebase.database();

// user-provided variables
var trainName;
var destination;
var firstTrainTime; 
var trainFrequency;

// calculated variables
var nextArrival = "test";
var minutesAway = "test";

$("#submit-button").on("click", function(){
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#train-time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency
    })

    $("#table-body").append(
        "<tr>" +
        "<td>" + trainName + "</td>" + 
        "<td>" + destination + "</td>" +
        "<td>" + trainFrequency + "</td>" +
        "<td>" + nextArrival + "</td>" +
        "<td>" + minutesAway + "</td>" +
        "</tr>");
// send info from form to train schedule table
// send info to database
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().trainFrequency);

    $("#table-body").append(
    "<tr>" +
    "<td>" + childSnapshot.val().trainName + "</td>" + 
    "<td>" + childSnapshot.val().destination + "</td>" +
    "<td>" + childSnapshot.val().trainFrequency + "</td>" +
    "<td>" + childSnapshot.val().nextArrival + "</td>" +
    "<td>" + childSnapshot.val().minutesAway + "</td>" +
    "</tr>");
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
   });
