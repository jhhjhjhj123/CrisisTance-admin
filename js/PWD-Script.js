import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGaBLqJWekqWUeCvUIhVjDl4w8Qu1dMFU",
  authDomain: "crisistance-157ef.firebaseapp.com",
  databaseURL: "https://crisistance-157ef-default-rtdb.firebaseio.com",
  projectId: "crisistance-157ef",
  storageBucket: "crisistance-157ef.appspot.com",
  messagingSenderId: "159519194778",
  appId: "1:159519194778:web:e4838dd17b008b4c9ce923",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase();

auth.onAuthStateChanged((user) => {
  if (!user) {
    // const userRef = ref(database, "users/" + user.uid);
    // get(userRef).then((snapshot) => {
    // if (!snapshot.exists()) {
    // const snapshotData = snapshot.val();

    const pwdBody = document.getElementById("pwd-tbody");

    document.getElementById("btn-pwd").addEventListener("click", displayStaffs);

    displayStaffs();

    async function displayStaffs() {
      pwdBody.innerHTML = "";

      const snapshot = await get(ref(database, "form"));
      const snapshotData = snapshot.val();

      for (const ID in snapshotData) {
        const data = snapshotData[ID];

        if (data.typeOfAssistance === "PWD" && data.approved === true) {
          const tr = document.createElement("tr");

          const tdName = document.createElement("td");
          tdName.textContent = data.userName;

          tr.appendChild(tdName);

          pwdBody.appendChild(tr);
        }
      }
    }

    // }
    // });
  } else {
    window.location.href = "./../index.html";
  }
});
