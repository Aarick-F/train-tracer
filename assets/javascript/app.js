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

  console.log(database);
});