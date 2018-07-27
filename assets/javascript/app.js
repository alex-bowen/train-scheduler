$(document).ready(function () {

    var currentTime = moment();
    // display somewhere?

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

    var trainName;
    var destination;
    var firstTrainTime;
    var trainFrequency;


    $("#submit-button").on("click", function () {
        event.preventDefault();

        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#train-time-input").val().trim();
        trainFrequency = $("#frequency-input").val().trim();

        // Clears input upon submission.
        $(".form-control").val("");

        // Pushes data to firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            trainFrequency: trainFrequency,
        });

    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        trainName = childSnapshot.val().trainName;
        destination = childSnapshot.val().destination;
        firstTrainTime = childSnapshot.val().firstTrainTime;
        trainFrequency = childSnapshot.val().trainFrequency;

        var firstTrainConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        var difference = moment().diff(moment(firstTrainConverted), "minutes");
        var timeLeft = difference % trainFrequency;
        var timeTilNextTrain = trainFrequency - timeLeft;
        var nextTrainMeasure = moment().add(timeTilNextTrain, "minutes");
        var nextTrainTime = moment(nextTrainMeasure).format("hh:mm");
    


        // Grabs code from database and appends to table.
        $("#table-body").append(
            "<tr>" +
            "<td>" + trainName + "</td>" +
            "<td>" + destination + "</td>" +
            "<td>" + trainFrequency + "</td>" +
            "<td>" + nextTrainTime + "</td>" +
            "<td>" + timeTilNextTrain + "</td>" +
            "</tr>");

    });
});