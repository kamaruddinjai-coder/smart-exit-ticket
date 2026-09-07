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
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
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

const profilePhoto =
  document.getElementById("profilePhoto");

const logoutBtn =
  document.getElementById("logoutBtn");


/* =========================================================
   MESEJ
========================================================= */

const sessionManagementMessage =
  document.getElementById(
    "sessionManagementMessage"
  );


/* =========================================================
   RINGKASAN SESI
========================================================= */

const totalSessionCount =
  document.getElementById(
    "totalSessionCount"
  );

const activeSessionCount =
  document.getElementById(
    "activeSessionCount"
  );

const draftSessionCount =
  document.getElementById(
    "draftSessionCount"
  );

const closedSessionCount =
  document.getElementById(
    "closedSessionCount"
  );

const archivedSessionCount =
  document.getElementById(
    "archivedSessionCount"
  );


/* =========================================================
   PENAPIS
========================================================= */

const sessionStatusFilter =
  document.getElementById(
    "sessionStatusFilter"
  );

const sessionSearch =
  document.getElementById(
    "sessionSearch"
  );


/* =========================================================
   SENARAI SESI
========================================================= */

const sessionsLoading =
  document.getElementById(
    "sessionsLoading"
  );

const noSessionsPanel =
  document.getElementById(
    "noSessionsPanel"
  );

const sessionListSection =
  document.getElementById(
    "sessionListSection"
  );

const sessionManagementList =
  document.getElementById(
    "sessionManagementList"
  );


/* =========================================================
   DATA GLOBAL
========================================================= */

let currentLecturer = null;

let lecturerSessions = [];

let lecturerResponses = [];


/* =========================================================
   PROFIL PENSYARAH
========================================================= */

function displayLecturer(
  lecturer
) {

  const fullName =
    lecturer.displayName ||
    t(
      "common.lecturer",
      "Pensyarah"
    );

  lecturerName.textContent =
    fullName;

  lecturerEmail.textContent =
    lecturer.email || "";

  if (lecturer.photoURL) {

    profilePhoto.src =
      lecturer.photoURL;

    profilePhoto.alt =
      `${t(
        "common.profilePhoto",
        "Gambar profil"
      )} ${fullName}`;

  } else {

    profilePhoto.removeAttribute(
      "src"
    );
  }
}


/* =========================================================
   MESEJ
========================================================= */

function showMessage(
  text,
  type
) {

  sessionManagementMessage.textContent =
    text;

  sessionManagementMessage.className =
    `message show ${type}`;
}


function clearMessage() {

  sessionManagementMessage.textContent =
    "";

  sessionManagementMessage.className =
    "message";
}


/* =========================================================
   LABEL STATUS
========================================================= */

function getStatusLabel(
  status
) {

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
   FORMAT TARIKH
========================================================= */

function formatTimestamp(
  timestamp
) {

  if (!timestamp) {
    return "-";
  }

  try {

    const date =
      typeof timestamp.toDate ===
      "function"
        ? timestamp.toDate()
        : new Date(timestamp);

    const language =
      document.documentElement.lang ===
      "en"
        ? "en-MY"
        : "ms-MY";

    return new Intl.DateTimeFormat(
      language,
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    ).format(date);

  } catch (error) {

    return "-";
  }
}


/* =========================================================
   JANA PAUTAN PELAJAR
========================================================= */

function createStudentLink(
  sessionId
) {

  const studentURL =
    new URL(
      "student.html",
      window.location.href
    );

  studentURL.searchParams.set(
    "session",
    sessionId
  );

  return studentURL.href;
}


/* =========================================================
   KIRA RESPONS BAGI SESI
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

function getResponseCountLabel(
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
   KEMAS KINI RINGKASAN
========================================================= */

function updateSummary() {

  totalSessionCount.textContent =
    lecturerSessions.length;

  activeSessionCount.textContent =
    lecturerSessions.filter(
      (sessionData) =>
        sessionData.status ===
        "active"
    ).length;

  draftSessionCount.textContent =
    lecturerSessions.filter(
      (sessionData) =>
        sessionData.status ===
        "draft"
    ).length;

  closedSessionCount.textContent =
    lecturerSessions.filter(
      (sessionData) =>
        sessionData.status ===
        "closed"
    ).length;

  archivedSessionCount.textContent =
    lecturerSessions.filter(
      (sessionData) =>
        sessionData.status ===
        "archived"
    ).length;
}


/* =========================================================
   CIPTA BUTANG
========================================================= */

function createActionButton(
  label,
  className,
  handler
) {

  const button =
    document.createElement(
      "button"
    );

  button.type =
    "button";

  button.className =
    className;

  button.textContent =
    label;

  button.addEventListener(
    "click",
    handler
  );

  return button;
}


/* =========================================================
   SALIN PAUTAN
========================================================= */

async function copyStudentLink(
  studentLink,
  input,
  button
) {

  try {

    await navigator
      .clipboard
      .writeText(
        studentLink
      );

    button.textContent =
      t(
        "common.copied",
        "Sudah Disalin"
      );

    window.setTimeout(
      () => {

        button.textContent =
          t(
            "manageSessions.copyLink",
            "Salin Pautan"
          );

      },
      1800
    );

  } catch (error) {

    input.select();

    document.execCommand(
      "copy"
    );

    button.textContent =
      t(
        "common.copied",
        "Sudah Disalin"
      );

    window.setTimeout(
      () => {

        button.textContent =
          t(
            "manageSessions.copyLink",
            "Salin Pautan"
          );

      },
      1800
    );
  }
}


/* =========================================================
   TUKAR STATUS SESI
========================================================= */

async function changeSessionStatus(
  sessionData,
  newStatus
) {

  clearMessage();

  const oldStatus =
    sessionData.status;

  if (
    oldStatus === newStatus
  ) {
    return;
  }


  const confirmationText =
    t(
      "manageSessions.changeStatusConfirm",
      "Tukar status sesi \"{topic}\" daripada {oldStatus} kepada {newStatus}?"
    )
      .replace(
        "{topic}",
        sessionData.topic || "-"
      )
      .replace(
        "{oldStatus}",
        getStatusLabel(oldStatus)
      )
      .replace(
        "{newStatus}",
        getStatusLabel(newStatus)
      );


  const confirmed =
    window.confirm(
      confirmationText
    );


  if (!confirmed) {
    return;
  }


  try {

    await updateDoc(
      doc(
        db,
        "sessions",
        sessionData.id
      ),
      {
        status:
          newStatus,

        updatedAt:
          serverTimestamp()
      }
    );


    sessionData.status =
      newStatus;


    showMessage(
      t(
        "manageSessions.statusUpdateSuccess",
        "Status sesi berjaya ditukar kepada {status}."
      ).replace(
        "{status}",
        getStatusLabel(
          newStatus
        )
      ),
      "success"
    );


    updateSummary();

    renderFilteredSessions();


  } catch (error) {

    console.error(
      "Status sesi gagal dikemas kini:",
      error
    );


    showMessage(
      t(
        "manageSessions.statusUpdateError",
        "Status sesi gagal dikemas kini."
      ),
      "error"
    );
  }
}


/* =========================================================
   PADAM SESI
========================================================= */

async function deleteSession(
  sessionData
) {

  clearMessage();


  const responseCount =
    getSessionResponseCount(
      sessionData.id
    );


  let warningMessage =
    t(
      "manageSessions.deleteConfirm",
      "Adakah anda pasti mahu memadam sesi \"{topic}\"?"
    ).replace(
      "{topic}",
      sessionData.topic || "-"
    );


  if (
    responseCount > 0
  ) {

    warningMessage +=
      "\n\n" +
      t(
        "manageSessions.deleteResponseWarning",
        "Sesi ini mempunyai {count} respons Pelajar. Respons tersebut TIDAK akan dipadam secara automatik."
      ).replace(
        "{count}",
        responseCount
      );
  }


  warningMessage +=
    "\n\n" +
    t(
      "manageSessions.deleteIrreversible",
      "Tindakan ini tidak boleh dibatalkan."
    );


  const firstConfirmation =
    window.confirm(
      warningMessage
    );


  if (!firstConfirmation) {
    return;
  }


  const secondConfirmation =
    window.confirm(
      t(
        "manageSessions.deleteFinalConfirm",
        "Pengesahan akhir: Adakah anda benar-benar mahu memadam sesi ini?"
      )
    );


  if (!secondConfirmation) {
    return;
  }


  try {

    await deleteDoc(
      doc(
        db,
        "sessions",
        sessionData.id
      )
    );


    lecturerSessions =
      lecturerSessions.filter(
        (item) =>
          item.id !==
          sessionData.id
      );


    updateSummary();

    renderFilteredSessions();


    showMessage(
      t(
        "manageSessions.deleteSuccess",
        "Sesi berjaya dipadam."
      ),
      "success"
    );


  } catch (error) {

    console.error(
      "Sesi gagal dipadam:",
      error
    );


    showMessage(
      t(
        "manageSessions.deleteError",
        "Sesi gagal dipadam."
      ),
      "error"
    );
  }
}


/* =========================================================
   BUKA ANALISIS SESI
========================================================= */

function openSessionAnalysis(
  sessionData
) {

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


/* =========================================================
   CIPTA KAD SESI
========================================================= */

function createSessionCard(
  sessionData
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "session-management-card";

  card.dataset.status =
    sessionData.status || "";


  /* -----------------------------------------
     HEADER
  ----------------------------------------- */

  const header =
    document.createElement(
      "div"
    );

  header.className =
    "session-management-header";


  const titleArea =
    document.createElement(
      "div"
    );


  const topic =
    document.createElement(
      "h3"
    );

  topic.textContent =
    sessionData.topic ||
    t(
      "manageSessions.noTopic",
      "Tanpa topik"
    );


  const subtitle =
    document.createElement(
      "p"
    );

  subtitle.textContent =
    [
      sessionData.courseCode,
      sessionData.className
    ]
      .filter(Boolean)
      .join(" — ");


  titleArea.append(
    topic,
    subtitle
  );


  const statusBadge =
    document.createElement(
      "span"
    );

  statusBadge.className =
    "session-status-badge";

  statusBadge.dataset.status =
    sessionData.status || "";

  statusBadge.textContent =
    getStatusLabel(
      sessionData.status
    );


  header.append(
    titleArea,
    statusBadge
  );


  /* -----------------------------------------
     MAKLUMAT SESI
  ----------------------------------------- */

  const information =
    document.createElement(
      "div"
    );

  information.className =
    "session-management-info";


  const codeBlock =
    document.createElement(
      "div"
    );

  const codeLabel =
    document.createElement(
      "span"
    );

  codeLabel.textContent =
    t(
      "manageSessions.sessionCode",
      "Kod Sesi"
    );

  const codeValue =
    document.createElement(
      "strong"
    );

  codeValue.textContent =
    sessionData.sessionCode ||
    "-";

  codeBlock.append(
    codeLabel,
    codeValue
  );


  const responseBlock =
    document.createElement(
      "div"
    );

  const responseLabel =
    document.createElement(
      "span"
    );

  responseLabel.textContent =
    t(
      "manageSessions.totalResponses",
      "Jumlah Respons"
    );

  const responseCount =
    getSessionResponseCount(
      sessionData.id
    );

  const responseValue =
    document.createElement(
      "strong"
    );

  responseValue.textContent =
    responseCount;

  responseValue.title =
    getResponseCountLabel(
      responseCount
    );

  responseBlock.append(
    responseLabel,
    responseValue
  );


  const createdBlock =
    document.createElement(
      "div"
    );

  const createdLabel =
    document.createElement(
      "span"
    );

  createdLabel.textContent =
    t(
      "manageSessions.createdAt",
      "Dicipta"
    );

  const createdValue =
    document.createElement(
      "strong"
    );

  createdValue.textContent =
    formatTimestamp(
      sessionData.createdAt
    );

  createdBlock.append(
    createdLabel,
    createdValue
  );


  information.append(
    codeBlock,
    responseBlock,
    createdBlock
  );


  /* -----------------------------------------
     SUBTOPIK
  ----------------------------------------- */

  const subtopicSection =
    document.createElement(
      "div"
    );

  subtopicSection.className =
    "session-subtopic-summary";


  const subtopicTitle =
    document.createElement(
      "strong"
    );

  subtopicTitle.textContent =
    t(
      "manageSessions.subtopic",
      "Subtopik"
    );


  const subtopicText =
    document.createElement(
      "p"
    );


  const subtopics =
    Array.isArray(
      sessionData.subtopics
    )
      ? sessionData.subtopics
      : [];


  subtopicText.textContent =
    subtopics.length > 0
      ? subtopics.join(", ")
      : "-";


  subtopicSection.append(
    subtopicTitle,
    subtopicText
  );


  /* -----------------------------------------
     PAUTAN PELAJAR
  ----------------------------------------- */

  const studentLinkSection =
    document.createElement(
      "div"
    );

  studentLinkSection.className =
    "session-student-link";


  const studentLinkTitle =
    document.createElement(
      "strong"
    );

  studentLinkTitle.textContent =
    t(
      "manageSessions.studentLink",
      "Pautan Pelajar"
    );


  const studentLink =
    createStudentLink(
      sessionData.id
    );


  const linkRow =
    document.createElement(
      "div"
    );

  linkRow.className =
    "session-link-row";


  const linkInput =
    document.createElement(
      "input"
    );

  linkInput.type =
    "text";

  linkInput.value =
    studentLink;

  linkInput.readOnly =
    true;

  linkInput.setAttribute(
    "aria-label",
    t(
      "manageSessions.studentLink",
      "Pautan Pelajar"
    )
  );


  const copyButton =
    createActionButton(
      t(
        "manageSessions.copyLink",
        "Salin Pautan"
      ),
      "secondary-button",
      () => {

        copyStudentLink(
          studentLink,
          linkInput,
          copyButton
        );
      }
    );


  const openStudentButton =
    createActionButton(
      t(
        "manageSessions.openStudentForm",
        "Buka Borang Pelajar"
      ),
      "secondary-button",
      () => {

        window.open(
          studentLink,
          "_blank",
          "noopener,noreferrer"
        );
      }
    );


  linkRow.append(
    linkInput,
    copyButton,
    openStudentButton
  );


  studentLinkSection.append(
    studentLinkTitle,
    linkRow
  );


  /* -----------------------------------------
     ACTIONS
  ----------------------------------------- */

  const actions =
    document.createElement(
      "div"
    );

  actions.className =
    "session-management-actions";


  /* LIHAT ANALISIS */

  actions.appendChild(
    createActionButton(
      t(
        "manageSessions.viewAnalysis",
        "Lihat Analisis"
      ),
      "secondary-button",
      () => {

        openSessionAnalysis(
          sessionData
        );
      }
    )
  );


  /* ACTIVE */

  if (
    sessionData.status ===
    "active"
  ) {

    actions.appendChild(
      createActionButton(
        t(
          "manageSessions.closeSession",
          "Tutup Sesi"
        ),
        "secondary-button",
        () => {

          changeSessionStatus(
            sessionData,
            "closed"
          );
        }
      )
    );
  }


  /* DRAFT */

  if (
    sessionData.status ===
    "draft"
  ) {

    actions.appendChild(
      createActionButton(
        t(
          "manageSessions.activate",
          "Aktifkan"
        ),
        "primary-button",
        () => {

          changeSessionStatus(
            sessionData,
            "active"
          );
        }
      )
    );
  }


  /* CLOSED */

  if (
    sessionData.status ===
    "closed"
  ) {

    actions.appendChild(
      createActionButton(
        t(
          "manageSessions.reactivate",
          "Aktifkan Semula"
        ),
        "secondary-button",
        () => {

          changeSessionStatus(
            sessionData,
            "active"
          );
        }
      )
    );


    actions.appendChild(
      createActionButton(
        t(
          "manageSessions.archive",
          "Arkibkan"
        ),
        "secondary-button",
        () => {

          changeSessionStatus(
            sessionData,
            "archived"
          );
        }
      )
    );
  }


  /* ARCHIVED */

  if (
    sessionData.status ===
    "archived"
  ) {

    actions.appendChild(
      createActionButton(
        t(
          "manageSessions.unarchive",
          "Keluarkan dari Arkib"
        ),
        "secondary-button",
        () => {

          changeSessionStatus(
            sessionData,
            "closed"
          );
        }
      )
    );
  }


  /* DELETE */

  actions.appendChild(
    createActionButton(
      t(
        "manageSessions.delete",
        "Padam"
      ),
      "danger-button",
      () => {

        deleteSession(
          sessionData
        );
      }
    )
  );


  /* -----------------------------------------
     MASUKKAN SEMUA KE KAD
  ----------------------------------------- */

  card.append(
    header,
    information,
    subtopicSection,
    studentLinkSection,
    actions
  );


  return card;
}


/* =========================================================
   PAPAR SENARAI SESI
========================================================= */

function displaySessions(
  sessions
) {

  sessionManagementList.innerHTML =
    "";


  if (
    sessions.length === 0
  ) {

    noSessionsPanel
      .classList
      .remove("hidden");

    sessionListSection
      .classList
      .add("hidden");

    return;
  }


  noSessionsPanel
    .classList
    .add("hidden");


  sessionListSection
    .classList
    .remove("hidden");


  sessions.forEach(
    (sessionData) => {

      sessionManagementList
        .appendChild(
          createSessionCard(
            sessionData
          )
        );
    }
  );
}


/* =========================================================
   TAPIS DAN CARI SESI
========================================================= */

function renderFilteredSessions() {

  const statusValue =
    sessionStatusFilter.value;


  const searchValue =
    sessionSearch.value
      .trim()
      .toLowerCase();


  const filtered =
    lecturerSessions.filter(
      (sessionData) => {

        const statusMatch =
          statusValue === "all" ||
          sessionData.status ===
            statusValue;


        const searchableText =
          [
            sessionData.topic,
            sessionData.className,
            sessionData.courseCode,
            sessionData.courseName,
            sessionData.sessionCode,
            ...(Array.isArray(
              sessionData.subtopics
            )
              ? sessionData.subtopics
              : [])
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


        const searchMatch =
          !searchValue ||
          searchableText.includes(
            searchValue
          );


        return (
          statusMatch &&
          searchMatch
        );
      }
    );


  displaySessions(
    filtered
  );
}


/* =========================================================
   DAPATKAN RESPONS
========================================================= */

async function loadLecturerResponses(
  lecturerId
) {

  try {

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


  } catch (error) {

    console.error(
      "Respons gagal diperoleh:",
      error
    );


    lecturerResponses =
      [];
  }
}


/* =========================================================
   DAPATKAN SESI
========================================================= */

async function loadLecturerSessions(
  lecturerId
) {

  sessionsLoading
    .classList
    .remove("hidden");


  noSessionsPanel
    .classList
    .add("hidden");


  sessionListSection
    .classList
    .add("hidden");


  try {

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


    updateSummary();

    renderFilteredSessions();


  } catch (error) {

    console.error(
      "Sesi gagal diperoleh:",
      error
    );


    showMessage(
      t(
        "manageSessions.loadError",
        "Sesi gagal diperoleh."
      ),
      "error"
    );


  } finally {

    sessionsLoading
      .classList
      .add("hidden");
  }
}


/* =========================================================
   EVENT PENAPIS
========================================================= */

sessionStatusFilter.addEventListener(
  "change",
  renderFilteredSessions
);


sessionSearch.addEventListener(
  "input",
  renderFilteredSessions
);


/* =========================================================
   APABILA BAHASA BERUBAH
========================================================= */

document.addEventListener(
  "languagechange",
  () => {

    /*
      Kad sesi adalah dinamik.
      Jadi bina semula semuanya.
    */

    renderFilteredSessions();


    /*
      Profil / alt text juga dikemas kini.
    */

    if (currentLecturer) {

      displayLecturer(
        currentLecturer
      );
    }
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


    try {

      await loadLecturerResponses(
        lecturer.uid
      );


      await loadLecturerSessions(
        lecturer.uid
      );


    } catch (error) {

      console.error(
        "Pengurusan sesi gagal dimulakan:",
        error
      );


      showMessage(
        t(
          "manageSessions.initialiseError",
          "Maklumat sesi gagal diperoleh."
        ),
        "error"
      );
    }
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
        t(
          "message.logoutError",
          "Log keluar tidak berjaya. Sila cuba semula."
        )
      );
    }
  }
);