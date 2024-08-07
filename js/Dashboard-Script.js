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

// =================================================================================================================================================

auth.onAuthStateChanged((user) => {
  if (!user) {
    // const userRef = ref(database, "users/" + user.uid);
    // get(userRef).then((snapshot) => {
    // if (!snapshot.exists()) {
    // const snapshotData = snapshot.val();
    displayGraph();

    async function displayGraph() {
      let aicsCount = 0;
      let pwdCount = 0;
      let soloParentCount = 0;

      let burialCount = 0;
      let medicalCount = 0;
      let educationalCount = 0;
      let financialCount = 0;

      const snapshot = await get(ref(database, "form"));
      const snapshotData = snapshot.val();

      for (const ID in snapshotData) {
        const data = snapshotData[ID];

        if (data.typeOfAssistance === "AICS") {
          aicsCount++;

          if (data.assistance === "Burial") {
            burialCount++;
          } else if (data.assistance === "Medical") {
            medicalCount++;
          } else if (data.assistance === "Educational") {
            educationalCount++;
          } else if (data.assistance === "Financial") {
            financialCount++;
          }
        } else if (data.typeOfAssistance === "PWD") {
          pwdCount++;
        } else if (data.typeOfAssistance === "Solo Parent") {
          soloParentCount++;
        }
      }

      const labels = ["AICS", "PWD", "Solo Parent"];
      const votes = [aicsCount, pwdCount, soloParentCount];

      const labels1 = ["Burial", "Medical", "Educational", "Financial"];
      const votes1 = [
        burialCount,
        medicalCount,
        educationalCount,
        financialCount,
      ];

      function getCSSVariableValue(variableName) {
        return getComputedStyle(document.documentElement).getPropertyValue(
          variableName
        );
      }

      const colorGraph1 = getCSSVariableValue("--color-graph-1");
      const colorGraph2 = getCSSVariableValue("--color-graph-2");
      const colorGraph3 = getCSSVariableValue("--color-graph-3");
      const colorGraph4 = getCSSVariableValue("--color-graph-4");
      const colorGraph5 = getCSSVariableValue("--color-graph-5");
      const colorGraph6 = getCSSVariableValue("--color-graph-6");
      const colorGraph7 = getCSSVariableValue("--color-graph-7");

      const colorArray1 = [colorGraph1, colorGraph2, colorGraph3];
      const colorArray2 = [colorGraph4, colorGraph5, colorGraph6, colorGraph7];

      document.querySelectorAll("#chart-colors span").forEach((span, index) => {
        span.style.backgroundColor = colorArray1[index];
      });

      document
        .querySelectorAll("#AICS-chart-colors span")
        .forEach((span, index) => {
          span.style.backgroundColor = colorArray2[index];
        });

      const ctx = document.getElementById("chart").getContext("2d");
      const mainChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              data: votes,
              backgroundColor: [colorGraph1, colorGraph2, colorGraph3],
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 20,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 16,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          onClick: function (event, activeElements) {
            const points = mainChart.getElementsAtEventForMode(
              event,
              "nearest",
              { intersect: true },
              false
            );
            if (points.length > 0) {
              const firstPoint = points[0];
              const label = mainChart.data.labels[firstPoint.index];

              if (label === "AICS") {
                const aicsChartWrapper =
                  document.getElementById("AICS-chart-wrapper");
                if (aicsChartWrapper.style.display === "none") {
                  aicsChartWrapper.style.display = "block";
                } else {
                  aicsChartWrapper.style.display = "none";
                }
              }
            }
          },
        },
      });

      const ctx1 = document.getElementById("AICS-chart").getContext("2d");
      new Chart(ctx1, {
        type: "bar",
        data: {
          labels: labels1,
          datasets: [
            {
              data: votes1,
              backgroundColor: [
                colorGraph4,
                colorGraph5,
                colorGraph6,
                colorGraph7,
              ],
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 20,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 16,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // =================================================================================================================================================

    const applicantTBody = document.getElementById("applicant-tbody");

    displayPending();

    async function displayPending() {
      applicantTBody.innerHTML = "";

      const snapshot = await get(ref(database, "form"));
      const snapshotData = snapshot.val();

      for (const ID in snapshotData) {
        const data = snapshotData[ID];

        if (data.approved === false) {
          const tr = document.createElement("tr");

          const name = document.createElement("td");
          name.textContent = data.userName;

          const type = document.createElement("td");

          if (data.typeOfAssistance === "AICS") {
            type.textContent = `${data.assistance} (${data.typeOfAssistance})`;
          } else {
            type.textContent = data.typeOfAssistance;
          }

          let totalApproved = 0;

          for (const ID1 in snapshotData) {
            const data1 = snapshotData[ID1];

            if (data.userID === data1.userID && data1.approved === true) {
              totalApproved++;
            }
          }

          const total = document.createElement("td");
          total.textContent = totalApproved;

          const actions = document.createElement("td");

          const btnMessage = document.createElement("button");
          const img1 = document.createElement("img");
          img1.src = "./../media/icons/action-message.png";
          img1.alt = "Message";
          btnMessage.appendChild(img1);

          const btnApprove = document.createElement("button");
          const img2 = document.createElement("img");
          img2.src = "./../media/icons/action-approve.png";
          img2.alt = "Approve";
          btnApprove.appendChild(img2);

          const btnDecline = document.createElement("button");
          const img3 = document.createElement("img");
          img3.src = "./../media/icons/action-Decline.png";
          img3.alt = "Decline";
          btnDecline.appendChild(img3);

          actions.appendChild(btnMessage);
          actions.appendChild(btnApprove);
          actions.appendChild(btnDecline);

          tr.appendChild(name);
          tr.appendChild(type);
          tr.appendChild(total);
          tr.appendChild(actions);

          applicantTBody.appendChild(tr);

          btnApprove.addEventListener("click", () => {
            update(ref(database, `form/${ID}`), {
              approved: true,
            }).then(() => {
              displayPending();
            });
          });

          btnDecline.addEventListener("click", () => {
            const c = confirm("This will delete the applicant form, proceed?");
            if (c) {
              remove(ref(database, `form/${ID}`)).then(() => {
                applicantTBody.removeChild(tr);
              });
            }
          });
        }
      }
    }
    // }
    // });
  } else {
    window.location.href = "./../index.html";
  }
});
