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

      let approvedCount = 0;
      let notApprovedCount = 0;

      let aicsLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let pwdLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let soloParentLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let approvedApplicant = {
        aicsMale: 0,
        aicsFemale: 0,
        soloParentMale: 0,
        soloParentFemale: 0,
        PWDMale: 0,
        PWDFemale: 0,
      };

      let notApprovedApplicant = {
        aicsMale: 1,
        aicsFemale: 0,
        soloParentMale: 0,
        soloParentFemale: 0,
        PWDMale: 0,
        PWDFemale: 0,
      };

      const snapshot = await get(ref(database, "form"));
      const snapshotData = snapshot.val();

      for (const ID in snapshotData) {
        const data = snapshotData[ID];

        const monthIndex = MONTHS.indexOf(data.month);

        if (monthIndex !== -1) {
          data.approved ? approvedCount++ : notApprovedCount++;

          if (data.typeOfAssistance === "AICS") {
            aicsCount++;

            if (data.approved) {
              aicsLine[monthIndex]++;
            }

            data.approved
              ? data.sex === "M"
                ? approvedApplicant.aicsMale++
                : approvedApplicant.aicsFemale++
              : data.sex === "M"
              ? notApprovedApplicant.aicsMale++
              : notApprovedApplicant.aicsFemale++;

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

            if (data.approved) {
              pwdLine[monthIndex]++;
            }

            data.approved
              ? data.sex === "M"
                ? approvedApplicant.PWDMale++
                : approvedApplicant.PWDFemale++
              : data.sex === "M"
              ? notApprovedApplicant.PWDMale++
              : notApprovedApplicant.PWDFemale++;
          } else if (data.typeOfAssistance === "Solo Parent") {
            soloParentCount++;

            if (data.approved) {
              soloParentLine[monthIndex]++;
            }

            data.approved
              ? data.sex === "M"
                ? approvedApplicant.soloParentMale++
                : approvedApplicant.soloParentFemale++
              : data.sex === "M"
              ? notApprovedApplicant.soloParentMale++
              : notApprovedApplicant.soloParentFemale++;
          }
        }
      }

      const labels = ["AICS", "PWD", "Solo Parent"];
      const votes = [aicsCount, pwdCount, soloParentCount];

      const labels1 = ["Burial", "Medical", "Educational", "Financial"];
      const labels2 = [
        "Approved (Male)",
        "Not Approved (Male)",
        "Approved (Female)",
        "Not Approved (Female)",
      ];
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

      const colorGraph8 = getCSSVariableValue("--color-graph-8");
      const colorGraph9 = getCSSVariableValue("--color-graph-9");
      const colorGraph10 = getCSSVariableValue("--color-graph-10");
      const colorGraph11 = getCSSVariableValue("--color-graph-11");

      const colorArray1 = [colorGraph1, colorGraph2, colorGraph3];
      const colorArray2 = [colorGraph4, colorGraph5, colorGraph6, colorGraph7];

      displayPendingGraph();
      function displayPendingGraph() {
        var myColor = ["#39ca74", "#e54d42"];
        var myData = [approvedCount, notApprovedCount];
        var myLabel = ["Approved", "Pending"];

        function getTotal() {
          var myTotal = 0;
          for (var j = 0; j < myData.length; j++) {
            myTotal += typeof myData[j] == "number" ? myData[j] : 0;
          }
          return myTotal;
        }

        function plotData() {
          var canvas;
          var ctx;
          var lastend = 0;
          var myTotal = getTotal();
          var doc;
          canvas = document.getElementById("pending-graph");
          var x = canvas.width / 2;
          var y = canvas.height / 2;
          var r = 150;

          ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (var i = 0; i < myData.length; i++) {
            ctx.fillStyle = myColor[i];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(
              x,
              y,
              r,
              lastend,
              lastend + Math.PI * 2 * (myData[i] / myTotal),
              false
            );
            ctx.lineTo(x, y);
            ctx.fill();

            ctx.beginPath();
            var start = [];
            var end = [];
            var last = 0;
            var flip = 0;
            var textOffset = 0;
            var precentage = (myData[i] / myTotal) * 100;
            start = getPoint(
              x,
              y,
              r - 20,
              lastend + (Math.PI * 2 * (myData[i] / myTotal)) / 2
            );
            end = getPoint(
              x,
              y,
              r + 20,
              lastend + (Math.PI * 2 * (myData[i] / myTotal)) / 2
            );
            if (start[0] <= x) {
              flip = -1;
              textOffset = -110;
            } else {
              flip = 1;
              textOffset = 10;
            }
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.lineTo(end[0] + 120 * flip, end[1]);
            ctx.strokeStyle = "#bdc3c7";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.font = "17px Arial";
            ctx.fillText(
              myLabel[i] + " " + precentage.toFixed(2) + "%",
              end[0] + textOffset,
              end[1] - 4
            );
            lastend += Math.PI * 2 * (myData[i] / myTotal);
          }
        }
        function getPoint(c1, c2, radius, angle) {
          return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
        }
        plotData();
      }

      const aicsCtx = document.getElementById("aics-graph").getContext("2d");
      new Chart(aicsCtx, {
        type: "bar",
        data: {
          labels: labels2,
          datasets: [
            {
              data: [
                approvedApplicant.aicsMale,
                notApprovedApplicant.aicsMale,
                approvedApplicant.aicsFemale,
                notApprovedApplicant.aicsFemale,
              ],
              backgroundColor: [
                colorGraph9,
                colorGraph8,
                colorGraph9,
                colorGraph8,
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
                  size: 12,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "AICS",
              font: {
                size: 18,
              },
              padding: {
                top: 10,
                bottom: 30,
              },
              color: "#000",
            },
          },
        },
      });

      const soloParentCtx = document
        .getElementById("solo-parent-graph")
        .getContext("2d");
      new Chart(soloParentCtx, {
        type: "bar",
        data: {
          labels: labels2,
          datasets: [
            {
              data: [
                approvedApplicant.soloParentMale,
                notApprovedApplicant.soloParentMale,
                approvedApplicant.soloParentFemale,
                notApprovedApplicant.soloParentFemale,
              ],
              backgroundColor: [
                colorGraph10,
                colorGraph8,
                colorGraph10,
                colorGraph8,
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
                  size: 12,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "SOLO PARENT",
              font: {
                size: 18,
              },
              padding: {
                top: 10,
                bottom: 30,
              },
              color: "#000",
            },
          },
        },
      });

      const pwdCtx = document.getElementById("pwd-graph").getContext("2d");
      new Chart(pwdCtx, {
        type: "bar",
        data: {
          labels: labels2,
          datasets: [
            {
              data: [
                approvedApplicant.pwdMale,
                notApprovedApplicant.pwdMale,
                approvedApplicant.pwdFemale,
                notApprovedApplicant.pwdFemale,
              ],
              backgroundColor: [
                colorGraph11,
                colorGraph8,
                colorGraph11,
                colorGraph8,
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
                  size: 12,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "PWD",
              font: {
                size: 18,
              },
              padding: {
                top: 10,
                bottom: 30,
              },
              color: "#000",
            },
          },
        },
      });

      const lineGraphWrapper = document.getElementById("line-graph-wrapper");
      const monthsContainer = document.getElementById("months-container");
      const monthText = document.getElementById("month-text");

      var ctxLine = document.getElementById("line-graph").getContext("2d");
      var myLine = new Chart(ctxLine, {
        type: "line",
        data: {
          labels: MONTHS,
          datasets: [
            {
              label: "AICS",
              backgroundColor: colorGraph1,
              borderColor: colorGraph1,
              data: aicsLine,
              fill: false,
            },
            {
              label: "Solo Parent",
              fill: false,
              backgroundColor: colorGraph2,
              borderColor: colorGraph2,
              data: soloParentLine,
            },
            {
              label: "PWD",
              fill: false,
              backgroundColor: colorGraph3,
              borderColor: colorGraph3,
              data: pwdLine,
            },
          ],
        },
        options: {
          responsive: true,
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            x: {
              grid: {
                display: true,
              },
              ticks: {
                font: {
                  size: 16,
                },
              },
            },
            y: {
              grid: {
                display: true,
              },
              ticks: {
                font: {
                  size: 16,
                },
              },
            },
          },
          onClick: function (event) {
            let label;

            let intersectingPoints = myLine.getElementsAtEventForMode(
              event,
              "nearest",
              { intersect: true },
              false
            );

            if (intersectingPoints.length > 0) {
              const firstPoint = intersectingPoints[0];
              label = myLine.data.labels[firstPoint.index];
            } else {
              let nonIntersectingPoints = myLine.getElementsAtEventForMode(
                event,
                "index",
                { intersect: false },
                false
              );

              if (nonIntersectingPoints.length > 0) {
                const firstPoint = nonIntersectingPoints[0];
                label = myLine.data.labels[firstPoint.index];
              } else {
              }
            }

            if (label) {
              monthText.textContent = label;
              displayMonthsApplicant(label);
            }

            lineGraphWrapper.classList.toggle("active");
            monthsContainer.classList.toggle("active");
          },
        },
      });

      // document
      //   .getElementById("line-graph")
      //   .addEventListener("click", function (event) {
      //     const rect = event.target.getBoundingClientRect();
      //     const x = event.clientX - rect.left;

      //     const xScale = myLine.scales["x"];

      //     xScale.ticks.forEach((value, index) => {
      //       const labelPosition = xScale.getPixelForTick(index);

      //       if (Math.abs(x - labelPosition) < 10) {
      //         const label = myLine.data.labels[index];
      //         monthText.textContent = label;
      //         lineGraphWrapper.classList.toggle("active");
      //         monthsContainer.classList.toggle("active");
      //         // console.log(index);
      //         displayMonthsApplicant(label);
      //       }
      //     });
      //   });

      document
        .getElementById("btn-month-back")
        .addEventListener("click", () => {
          lineGraphWrapper.classList.toggle("active");
          monthsContainer.classList.toggle("active");
        });

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

    const monthTbody = document.getElementById("month-tbody");

    async function displayMonthsApplicant(month) {
      monthTbody.innerHTML = "";
      const snapshot = await get(ref(database, "form"));
      const snapshotData = snapshot.val();

      if (!snapshotData) {
        return;
      }

      const newData = [];

      for (const ID in snapshotData) {
        const data = snapshotData[ID];

        if (data.approved && data.month.toLowerCase() === month.toLowerCase()) {
          const existingEntry = newData.find(
            (entry) => entry.userID === data.userID
          );

          if (existingEntry) {
            existingEntry.aics =
              data.typeOfAssistance === "AICS" ? true : existingEntry.aics;
            existingEntry.soloParent =
              data.typeOfAssistance === "Solo Parent"
                ? true
                : existingEntry.soloParent;
            existingEntry.pwd =
              data.typeOfAssistance === "PWD" ? true : existingEntry.pwd;
            existingEntry.totalApprove++;
          } else {
            newData.push({
              userName: data.userName,
              aics: data.typeOfAssistance === "AICS" ? true : false,
              soloParent:
                data.typeOfAssistance === "Solo Parent" ? true : false,
              pwd: data.typeOfAssistance === "PWD" ? true : false,
              userID: data.userID,
              totalApprove: 1,
            });
          }
        }
      }

      newData.forEach((data) => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = data.userName;

        const tdAICS = document.createElement("td");
        if (data.aics) {
          const img = document.createElement("img");
          img.src = "./../media/icons/icons8-check-mark-64 (1).png";
          tdAICS.appendChild(img);
        }

        const tdSoloParent = document.createElement("td");
        if (data.soloParent) {
          const img = document.createElement("img");
          img.src = "./../media/icons/icons8-check-mark-64 (1).png";
          tdSoloParent.appendChild(img);
        }

        const tdPWD = document.createElement("td");
        if (data.pwd) {
          const img = document.createElement("img");
          img.src = "./../media/icons/icons8-check-mark-64 (1).png";
          tdPWD.appendChild(img);
        }

        const tdTotal = document.createElement("td");
        tdTotal.textContent = data.totalApprove;

        tr.appendChild(tdName);
        tr.appendChild(tdAICS);
        tr.appendChild(tdSoloParent);
        tr.appendChild(tdPWD);
        tr.appendChild(tdTotal);

        monthTbody.appendChild(tr);
      });
    }
    // <tr>
    //   <td>Juan   Dela Cruz</td>
    //   <td>
    //     <img src="./../media/icons/icons8-check-mark-64 (1).png" alt="" />
    //   </td>
    //   <td></td>
    //   <td></td>
    //   <td>1</td>
    // </tr>;

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
