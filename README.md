# Train Scheduler
#### https://alex-bowen.github.io/train-scheduler/

### This web app imitates a transportation scheduling platform. A user may view scheduled trains (pulled from the firebase database): 

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

### or schedule new train line: 
     
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

#### Toolkit: HTML, JavaScript, jQuery, Bootstrap, Custom CSS, Moment JS, and a Firebase database. 


