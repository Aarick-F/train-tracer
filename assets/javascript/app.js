$(document).ready(() => {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAvzhfkga7Mmxvp736MdMpIoICH7fwBgPw",
    authDomain: "train-tracer.firebaseapp.com",
    databaseURL: "https://train-tracer.firebaseio.com",
    projectId: "train-tracer",
    storageBucket: "",
    messagingSenderId: "965841708606"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Variables
  let name, destination, firstTime, frequency, timeDifference, minutesLeft, nextArrival;

  $("#addTrain").on("click", function() {
    name = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    firstTime = $("#trainTime").val().trim();
    frequency = $("#trainFrequency").val().trim();

    // Takes input first time, subtracts it from the current time provided by moment
    timeDifference = moment().diff(moment(firstTime, "HHmm"), "minutes");
    leftOverTime = timeDifference % frequency;
    minutesLeft = frequency - leftOverTime;
    nextArrival = moment().add(minutesLeft, "minutes").format("h:mm A");

    // Push info to database
    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      nextArrival: nextArrival,
      minutesLeft: minutesLeft
    });

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
    console.log(minutesLeft);
  });

  // When data is pushed into our database:
  database.ref().on("child_added", function(snapshot) {
    let newRow = $("<ul class='listRow'><li>" + snapshot.val().name + "</li>" +
                  "<li>" + snapshot.val().destination + "</li>" +
                  "<li>" + snapshot.val().frequency + "</li>" +
                  "<li>" + snapshot.val().nextArrival + "</li>" +
                  "<li>" + snapshot.val().minutesLeft + "</li></ul>");
    $("#display").append(newRow);
  });
});