// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmLxDM8KEU0fIRypRLPu9ZWLmJbg-vdzY",
  authDomain: "class-c14b7.firebaseapp.com",
  databaseURL: "https://class-c14b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "class-c14b7",
  storageBucket: "class-c14b7.appspot.com",
  messagingSenderId: "358425338966",
  appId: "1:358425338966:web:f615d436ff976ce840c7f7",
  measurementId: "G-NW4XKCG003"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("podaj nazwe niepelnosprawny spermoludku gejuszku");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

    //auto scroll to bottom
    document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username} </span><a style="text-decoration: none;" href= "${messages.message}" target="_blank">${messages.message}</a></li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
