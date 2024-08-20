const asideNav = document.querySelectorAll("#aside-nav a");
const aicsNav = document.querySelectorAll("#aics-nav-container a");
const btnHome = document.querySelectorAll(".btn-home");

const dashboardSection = document.getElementById("dashboard-section");
const staffSection = document.getElementById("staff-section");
const soloParentSection = document.getElementById("solo-parent-section");
const pwdSection = document.getElementById("pwd-section");
const aicsSection = document.getElementById("aics-section");
const messageSection = document.getElementById("message-section");

if (!sessionStorage.getItem("activeNav")) {
  sessionStorage.setItem("activeNav", "0");
}

let activeNavIndex = parseInt(sessionStorage.getItem("activeNav"), 10);
let activeServiceNavIndex = parseInt(
  sessionStorage.getItem("activeServiceNav"),
  0
);

asideNav[activeNavIndex].classList.add("active");

handleDisplay(asideNav[activeNavIndex].id);

if (activeNavIndex == 2) {
  document.getElementById("services-container").classList.toggle("active");
  asideNav[activeServiceNavIndex].classList.add("services-active");

  if (
    document.getElementById("services-container").classList.contains("active")
  ) {
    document.getElementById("services-plus").src = "./../media/icons/minus.png";
  }

  if (activeServiceNavIndex == 3) {
    handleDisplay("btn-solo-parent");
  } else if (activeServiceNavIndex == 4) {
    handleDisplay("btn-aics");
  } else if (activeServiceNavIndex == 5) {
    handleDisplay("btn-pwd");
  }
}

aicsNav.forEach((nav) => {
  nav.addEventListener("click", () => {
    aicsNav.forEach((innerNav) => {
      if (nav === innerNav) {
        innerNav.classList.add("active");
      } else {
        innerNav.classList.remove("active");
      }
    });
  });
});

asideNav.forEach((nav, index) => {
  if (!nav.classList.contains("services-btn")) {
    nav.addEventListener("click", () => {
      asideNav.forEach((innerNav, innerIndex) => {
        if (nav === innerNav) {
          nav.classList.add("active");
          sessionStorage.setItem("activeNav", innerIndex.toString());
          handleDisplay(nav.id);
        } else {
          innerNav.classList.remove("active");
        }
      });

      if (nav.id === "btn-services") {
        document
          .getElementById("services-container")
          .classList.toggle("active");

        activeServiceNavIndex = parseInt(
          sessionStorage.getItem("activeServiceNav"),
          0
        );

        if (
          document
            .getElementById("services-container")
            .classList.contains("active")
        ) {
          document.getElementById("services-plus").src =
            "./../media/icons/minus.png";
        } else {
          document.getElementById("services-plus").src =
            "./../media/icons/plus.png";
        }

        if (activeServiceNavIndex == 3) {
          handleDisplay("btn-solo-parent");
        } else if (activeServiceNavIndex == 4) {
          handleDisplay("btn-aics");
        } else if (activeServiceNavIndex == 5) {
          handleDisplay("btn-pwd");
        }
      } else {
        document
          .getElementById("services-container")
          .classList.remove("active");
        document.getElementById("services-plus").src =
          "./../media/icons/plus.png";
      }
    });
  } else if (nav.classList.contains("services-btn")) {
    nav.addEventListener("click", () => {
      asideNav.forEach((innerNav, innerIndex) => {
        if (nav === innerNav) {
          nav.classList.add("services-active");
          sessionStorage.setItem("activeServiceNav", innerIndex.toString());
          handleDisplay(nav.id);
        } else {
          innerNav.classList.remove("services-active");
        }
      });
    });
  }
});

function handleDisplay(ID) {
  dashboardSection.style.display = "none";
  staffSection.style.display = "none";
  soloParentSection.style.display = "none";
  aicsSection.style.display = "none";
  pwdSection.style.display = "none";
  messageSection.style.display = "none";

  if (ID === "btn-dashboard") {
    dashboardSection.style.display = "block";
  } else if (ID === "btn-staff") {
    staffSection.style.display = "block";
  } else if (ID === "btn-solo-parent") {
    soloParentSection.style.display = "block";
  } else if (ID === "btn-aics") {
    aicsSection.style.display = "block";
  } else if (ID === "btn-pwd") {
    pwdSection.style.display = "block";
  } else if (ID === "btn-message") {
    messageSection.style.display = "block";
  }
}

document.getElementById("profile-img").addEventListener("click", () => {
  document.getElementById("logout-container").classList.toggle("active");
  document.querySelector("#logout-container p").textContent = document
    .getElementById("logout-container")
    .classList.contains("active")
    ? "Administrator"
    : "Welcome Admin";
});

// document.getElementById("btn-services").addEventListener("click", () => {
//   document.getElementById("services-container").classList.toggle("active");
// });
btnHome.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("btn-dashboard").click();
  });
});
