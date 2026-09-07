import {
  auth,
  db
} from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import {
  t
} from "./i18n.js";


/* =========================================================
   PROFIL PENSYARAH
========================================================= */

const lecturerName =
  document.getElementById("lecturerName");

const lecturerEmail =
  document.getElementById("lecturerEmail");

const welcomeName =
  document.getElementById("welcomeName");

const profilePhoto =
  document.getElementById("profilePhoto");

const logoutBtn =
  document.getElementById("logoutBtn");


/* =========================================================
   STATISTIK DASHBOARD
========================================================= */

const totalClasses =
  document.getElementById("totalClasses");

const activeSessions =
  document.getElementById("activeSessions");

const totalResponses =
  document.getElementById("totalResponses");


/* =========================================================
   SESI TERKINI
========================================================= */

const recentSessions =
  document.getElementById("recentSessions");


/* =========================================================
   DATA
========================================================= */

let currentLecturer = null;
let lecturerClasses = [];
let lecturerSessions = [];
let lecturerResponses = [];


/* =========================================================
   PAPAR PROFIL
========================================================= */

function displayLecturer(lecturer) {

  const fullName =
    lecturer.displayName ||
    "Pensyarah";

  const firstName =
    fullName
      .trim()
      .split(" ")[0];

  lecturerName.textContent =
    fullName;

  lecturerEmail.textContent =
    lecturer.email || "";

  if (welcomeName) {
    welcomeName.textContent =
      firstName;
  }

  if (lecturer.photoURL) {

    profilePhoto.src =
      lecturer.photoURL;

    profilePhoto.alt =
      `Gambar profil ${fullName}`;

  } else {

    profilePhoto.removeAttribute(
      "src"
    );
  }
}


/* =========================================================
   LABEL STATUS - DUAL LANGUAGE
========================================================= */

function getStatusLabel(status) {

  if (status === "active") {
    return t(
      "session.status.active",
      "Aktif"
    );
  }

  if (status === "draft") {
    return t(
      "session.status.draft",
      "Draf"
    );
  }

  if (status === "closed") {
    return t(
      "session.status.closed",
      "Ditutup"
    );
  }

  if (status === "archived") {
    return t(
      "session.status.archived",
      "Diarkib"
    );
  }

  return status || "-";
}


/* =========================================================
   KIRA RESPONS SESI
========================================================= */

function getSessionResponseCount(
  sessionId
) {

  return lecturerResponses.filter(
    (responseData) =>
      responseData.sessionId ===
      sessionId
  ).length;
}


/* =========================================================
   LABEL JUMLAH RESPONS
========================================================= */

function getResponseLabel(
  count
) {

  if (count === 1) {

    return `${count} ${t(
      "response.single",
      "respons"
    )}`;
  }

  return `${count} ${t(
    "response.plural",
    "respons"
  )}`;
}


/* =========================================================
   STATISTIK
========================================================= */

function updateDashboardStatistics() {

  const activeClassCount =
    lecturerClasses.filter(
      (classData) =>
        classData.isActive !== false
    ).length;

  const activeSessionCount =
    lecturerSessions.filter(
      (sessionData) =>
        sessionData.status === "active"
    ).length;

  const responseCount =
    lecturerResponses.length;

  if (totalClasses) {
    totalClasses.textContent =
      activeClassCount;
  }

  if (activeSessions) {
    activeSessions.textContent =
      activeSessionCount;
  }

  if (totalResponses) {
    totalResponses.textContent =
      responseCount;
  }
}


/* =========================================================
   KAD SESI TERKINI
========================================================= */

function createRecentSessionCard(
  sessionData
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "recent-session-item";


  const main =
    document.createElement(
      "div"
    );


  const title =
    document.createElement(
      "h3"
    );

  title.textContent =
    sessionData.topic ||
    "-";


  const meta =
    document.createElement(
      "p"
    );

  meta.textContent =
    [
      sessionData.courseCode,
      sessionData.className,
      sessionData.sessionCode
    ]
      .filter(Boolean)
      .join(" — ");


  main.append(
    title,
    meta
  );


  const side =
    document.createElement(
      "div"
    );

  side.className =
    "recent-session-side";


  const status =
    document.createElement(
      "span"
    );

  status.className =
    "session-status-badge";

  status.dataset.status =
    sessionData.status || "";

  status.textContent =
    getStatusLabel(
      sessionData.status
    );


  const responses =
    document.createElement(
      "small"
    );

  const responseCount =
    getSessionResponseCount(
      sessionData.id
    );

  responses.textContent =
    getResponseLabel(
      responseCount
    );


  side.append(
    status,
    responses
  );


  card.append(
    main,
    side
  );


  card.addEventListener(
    "click",
    () => {

      const url =
        new URL(
          "responses.html",
          window.location.href
        );

      url.searchParams.set(
        "session",
        sessionData.id
      );

      window.location.href =
        url.href;
    }
  );


  return card;
}


/* =========================================================
   PAPAR SESI TERKINI
========================================================= */

function displayRecentSessions() {

  if (!recentSessions) {
    return;
  }

  recentSessions.innerHTML =
    "";

  const visibleSessions =
    lecturerSessions
      .filter(
        (sessionData) =>
          sessionData.status !==
          "archived"
      )
      .slice(0, 5);


  if (
    visibleSessions.length === 0
  ) {

    recentSessions.innerHTML = `
      <div class="empty-dashboard-state">

        <div class="empty-dashboard-icon">
          +
        </div>

        <strong>
          ${t(
            "dashboard.noSessions",
            "Belum ada sesi"
          )}
        </strong>

        <p>
          ${t(
            "dashboard.noSessionsDescription",
            "Cipta kelas dan sesi Exit Ticket pertama untuk mula menerima respons pelajar."
          )}
        </p>

      </div>
    `;

    return;
  }


  visibleSessions.forEach(
    (sessionData) => {

      recentSessions.appendChild(
        createRecentSessionCard(
          sessionData
        )
      );
    }
  );
}


/* =========================================================
   KELAS
========================================================= */

async function loadClasses(
  lecturerId
) {

  const classesQuery =
    query(
      collection(
        db,
        "classes"
      ),
      where(
        "lecturerId",
        "==",
        lecturerId
      )
    );


  const snapshot =
    await getDocs(
      classesQuery
    );


  lecturerClasses =
    snapshot.docs.map(
      (classDocument) => ({
        id:
          classDocument.id,

        ...classDocument.data()
      })
    );
}


/* =========================================================
   SESI
========================================================= */

async function loadSessions(
  lecturerId
) {

  const sessionsQuery =
    query(
      collection(
        db,
        "sessions"
      ),
      where(
        "lecturerId",
        "==",
        lecturerId
      )
    );


  const snapshot =
    await getDocs(
      sessionsQuery
    );


  lecturerSessions =
    snapshot.docs.map(
      (sessionDocument) => ({
        id:
          sessionDocument.id,

        ...sessionDocument.data()
      })
    );


  lecturerSessions.sort(
    (
      firstSession,
      secondSession
    ) => {

      const firstTime =
        firstSession.createdAt
          ?.seconds || 0;

      const secondTime =
        secondSession.createdAt
          ?.seconds || 0;

      return (
        secondTime -
        firstTime
      );
    }
  );
}


/* =========================================================
   RESPONS
========================================================= */

async function loadResponses(
  lecturerId
) {

  const responsesQuery =
    query(
      collection(
        db,
        "responses"
      ),
      where(
        "lecturerId",
        "==",
        lecturerId
      )
    );


  const snapshot =
    await getDocs(
      responsesQuery
    );


  lecturerResponses =
    snapshot.docs.map(
      (responseDocument) => ({
        id:
          responseDocument.id,

        ...responseDocument.data()
      })
    );
}


/* =========================================================
   LOAD DASHBOARD
========================================================= */

async function loadDashboard(
  lecturerId
) {

  try {

    await Promise.all([
      loadClasses(
        lecturerId
      ),

      loadSessions(
        lecturerId
      ),

      loadResponses(
        lecturerId
      )
    ]);


    updateDashboardStatistics();

    displayRecentSessions();


  } catch (error) {

    console.error(
      "Dashboard gagal dimuatkan:",
      error
    );


    if (totalClasses) {
      totalClasses.textContent =
        "-";
    }

    if (activeSessions) {
      activeSessions.textContent =
        "-";
    }

    if (totalResponses) {
      totalResponses.textContent =
        "-";
    }
  }
}


/* =========================================================
   BILA BAHASA BERUBAH
========================================================= */

document.addEventListener(
  "languagechange",
  () => {

    /*
      HTML statik diterjemah oleh i18n.js.

      Kita hanya perlu membina semula
      kandungan dinamik.
    */

    displayRecentSessions();
  }
);


/* =========================================================
   AUTHENTICATION
========================================================= */

onAuthStateChanged(
  auth,
  async (lecturer) => {

    if (!lecturer) {

      window.location.replace(
        "index.html"
      );

      return;
    }


    const isGoogle =
      lecturer.providerData
        ?.some(
          (providerData) =>
            providerData.providerId ===
            "google.com"
        );


    if (!isGoogle) {

      await signOut(auth);

      window.location.replace(
        "index.html"
      );

      return;
    }


    currentLecturer =
      lecturer;


    displayLecturer(
      lecturer
    );


    await loadDashboard(
      lecturer.uid
    );
  }
);


/* =========================================================
   LOG KELUAR
========================================================= */

logoutBtn.addEventListener(
  "click",
  async () => {

    const confirmed =
      window.confirm(
        t(
          "message.logoutConfirm",
          "Adakah anda mahu log keluar?"
        )
      );


    if (!confirmed) {
      return;
    }


    try {

      await signOut(auth);

      window.location.replace(
        "index.html"
      );

    } catch (error) {

      console.error(
        "Ralat log keluar:",
        error
      );


      window.alert(
        "Log keluar tidak berjaya. Sila cuba semula."
      );
    }
  }
);