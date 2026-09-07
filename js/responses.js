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

const profilePhoto =
  document.getElementById("profilePhoto");

const logoutBtn =
  document.getElementById("logoutBtn");


/* =========================================================
   MESEJ
========================================================= */

const responseMessage =
  document.getElementById("responseMessage");


/* =========================================================
   RINGKASAN KESELURUHAN
========================================================= */

const overallSessionCount =
  document.getElementById("overallSessionCount");

const overallResponseCount =
  document.getElementById("overallResponseCount");


/* =========================================================
   PILIH SESI
========================================================= */

const sessionSelect =
  document.getElementById("sessionSelect");


/* =========================================================
   PANEL
========================================================= */

const responsesLoading =
  document.getElementById("responsesLoading");

const noResponseSessionsPanel =
  document.getElementById("noResponseSessionsPanel");

const responseAnalysisContent =
  document.getElementById("responseAnalysisContent");


/* =========================================================
   MAKLUMAT SESI
========================================================= */

const selectedSessionTopic =
  document.getElementById("selectedSessionTopic");

const selectedSessionClass =
  document.getElementById("selectedSessionClass");

const selectedSessionCourse =
  document.getElementById("selectedSessionCourse");

const selectedSessionCode =
  document.getElementById("selectedSessionCode");

const selectedSessionStatus =
  document.getElementById("selectedSessionStatus");

const selectedSessionResponseCount =
  document.getElementById("selectedSessionResponseCount");


/* =========================================================
   ANALISIS TAHAP KEFAHAMAN
========================================================= */

const understandCount =
  document.getElementById("understandCount");

const understandPercentage =
  document.getElementById("understandPercentage");

const partialCount =
  document.getElementById("partialCount");

const partialPercentage =
  document.getElementById("partialPercentage");

const notUnderstandCount =
  document.getElementById("notUnderstandCount");

const notUnderstandPercentage =
  document.getElementById("notUnderstandPercentage");


/* =========================================================
   BELUM DIFAHAMI
========================================================= */

const notUnderstoodSummary =
  document.getElementById("notUnderstoodSummary");

const noNotUnderstoodPanel =
  document.getElementById("noNotUnderstoodPanel");


/* =========================================================
   RESPONS PELAJAR
========================================================= */

const responseSearch =
  document.getElementById("responseSearch");

const noResponsesPanel =
  document.getElementById("noResponsesPanel");

const noSearchResultsPanel =
  document.getElementById("noSearchResultsPanel");

const responsesList =
  document.getElementById("responsesList");


/* =========================================================
   DATA GLOBAL
========================================================= */

let currentLecturer = null;

let lecturerSessions = [];

let lecturerResponses = [];

let selectedSessionId = "";


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

  responseMessage.textContent =
    text;

  responseMessage.className =
    `message show ${type}`;
}


function clearMessage() {

  responseMessage.textContent =
    "";

  responseMessage.className =
    "message";
}


/* =========================================================
   LABEL STATUS SESI
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
   LABEL KEFAHAMAN
========================================================= */

function getUnderstandingLabel(
  level
) {

  if (level === "faham") {

    return t(
      "responses.understand",
      "Faham"
    );
  }

  if (level === "sebahagian") {

    return t(
      "responses.partial",
      "Faham Sebahagian"
    );
  }

  if (level === "belum_faham") {

    return t(
      "responses.notUnderstand",
      "Belum Faham"
    );
  }

  return "-";
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
      typeof timestamp.toDate === "function"
        ? timestamp.toDate()
        : new Date(timestamp);

    const locale =
      document.documentElement.lang === "en"
        ? "en-MY"
        : "ms-MY";

    return new Intl.DateTimeFormat(
      locale,
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
   PERATUS
========================================================= */

function calculatePercentage(
  count,
  total
) {

  if (!total) {
    return 0;
  }

  return Math.round(
    (count / total) * 100
  );
}


/* =========================================================
   SESI DIPILIH
========================================================= */

function getSelectedSession() {

  return lecturerSessions.find(
    (sessionData) =>
      sessionData.id === selectedSessionId
  );
}


/* =========================================================
   RESPONS SESI DIPILIH
========================================================= */

function getSelectedSessionResponses() {

  if (!selectedSessionId) {
    return [];
  }

  return lecturerResponses.filter(
    (responseData) =>
      responseData.sessionId ===
      selectedSessionId
  );
}


/* =========================================================
   PAPAR OPTION SESI
========================================================= */

function renderSessionOptions() {

  const currentValue =
    selectedSessionId ||
    sessionSelect.value;

  sessionSelect.innerHTML =
    "";


  const defaultOption =
    document.createElement("option");

  defaultOption.value =
    "";

  defaultOption.textContent =
    t(
      "responses.selectSessionOption",
      "Pilih sesi Exit Ticket"
    );

  sessionSelect.appendChild(
    defaultOption
  );


  lecturerSessions.forEach(
    (sessionData) => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        sessionData.id;

      option.textContent =
        [
          sessionData.sessionCode,
          sessionData.className,
          sessionData.topic
        ]
          .filter(Boolean)
          .join(" — ");

      sessionSelect.appendChild(
        option
      );
    }
  );


  if (
    lecturerSessions.some(
      (sessionData) =>
        sessionData.id === currentValue
    )
  ) {

    sessionSelect.value =
      currentValue;

    selectedSessionId =
      currentValue;

  } else {

    sessionSelect.value =
      "";

    selectedSessionId =
      "";
  }
}


/* =========================================================
   PAPAR MAKLUMAT SESI
========================================================= */

function displaySelectedSessionInfo() {

  const sessionData =
    getSelectedSession();

  if (!sessionData) {

    selectedSessionTopic.textContent =
      "-";

    selectedSessionClass.textContent =
      "-";

    selectedSessionCourse.textContent =
      "-";

    selectedSessionCode.textContent =
      "-";

    selectedSessionStatus.textContent =
      "-";

    selectedSessionResponseCount.textContent =
      "0";

    return;
  }


  const sessionResponses =
    getSelectedSessionResponses();


  selectedSessionTopic.textContent =
    sessionData.topic ||
    "-";


  selectedSessionClass.textContent =
    sessionData.className ||
    "-";


  selectedSessionCourse.textContent =
    [
      sessionData.courseCode,
      sessionData.courseName
    ]
      .filter(Boolean)
      .join(" — ") ||
    "-";


  selectedSessionCode.textContent =
    sessionData.sessionCode ||
    "-";


  selectedSessionStatus.textContent =
    getStatusLabel(
      sessionData.status
    );


  selectedSessionResponseCount.textContent =
    sessionResponses.length;
}


/* =========================================================
   ANALISIS KEFAHAMAN
========================================================= */

function displayUnderstandingAnalysis() {

  const sessionResponses =
    getSelectedSessionResponses();


  const total =
    sessionResponses.length;


  const understood =
    sessionResponses.filter(
      (responseData) =>
        responseData.understandingLevel ===
        "faham"
    ).length;


  const partial =
    sessionResponses.filter(
      (responseData) =>
        responseData.understandingLevel ===
        "sebahagian"
    ).length;


  const notUnderstood =
    sessionResponses.filter(
      (responseData) =>
        responseData.understandingLevel ===
        "belum_faham"
    ).length;


  understandCount.textContent =
    understood;

  partialCount.textContent =
    partial;

  notUnderstandCount.textContent =
    notUnderstood;


  understandPercentage.textContent =
    `${calculatePercentage(
      understood,
      total
    )}%`;


  partialPercentage.textContent =
    `${calculatePercentage(
      partial,
      total
    )}%`;


  notUnderstandPercentage.textContent =
    `${calculatePercentage(
      notUnderstood,
      total
    )}%`;
}


/* =========================================================
   PERKARA BELUM DIFAHAMI
========================================================= */

function displayNotUnderstoodSummary() {

  const sessionResponses =
    getSelectedSessionResponses();


  const items =
    sessionResponses
      .map(
        (responseData) =>
          responseData.notUnderstoodText
            ?.trim()
      )
      .filter(Boolean);


  notUnderstoodSummary.innerHTML =
    "";


  if (
    items.length === 0
  ) {

    noNotUnderstoodPanel
      .classList
      .remove("hidden");

    return;
  }


  noNotUnderstoodPanel
    .classList
    .add("hidden");


  items.forEach(
    (text, index) => {

      const item =
        document.createElement(
          "article"
        );

      item.className =
        "reflection-summary-item";


      const number =
        document.createElement(
          "span"
        );

      number.textContent =
        index + 1;


      const content =
        document.createElement(
          "p"
        );

      content.textContent =
        text;


      item.append(
        number,
        content
      );


      notUnderstoodSummary.appendChild(
        item
      );
    }
  );
}


/* =========================================================
   CIPTA LABEL MAKLUMAT
========================================================= */

function createInfoItem(
  label,
  value
) {

  const wrapper =
    document.createElement(
      "div"
    );


  const labelElement =
    document.createElement(
      "span"
    );

  labelElement.textContent =
    label;


  const valueElement =
    document.createElement(
      "strong"
    );

  valueElement.textContent =
    value || "-";


  wrapper.append(
    labelElement,
    valueElement
  );


  return wrapper;
}


/* =========================================================
   CIPTA KAD RESPONS
========================================================= */

function createResponseCard(
  responseData
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "response-card";

  card.dataset.level =
    responseData.understandingLevel ||
    "";


  /* -----------------------------------------
     HEADER
  ----------------------------------------- */

  const header =
    document.createElement(
      "div"
    );

  header.className =
    "response-card-header";


  const studentArea =
    document.createElement(
      "div"
    );


  const studentName =
    document.createElement(
      "h3"
    );

  studentName.textContent =
    responseData.studentName ||
    t(
      "responses.unknownStudent",
      "Pelajar"
    );


  const matric =
    document.createElement(
      "p"
    );

  matric.textContent =
    `${t(
      "student.matricNumber",
      "Nombor Matrik"
    )}: ${
      responseData.studentMatric ||
      "-"
    }`;


  studentArea.append(
    studentName,
    matric
  );


  const badge =
    document.createElement(
      "span"
    );

  badge.className =
    "understanding-badge";

  badge.dataset.level =
    responseData.understandingLevel ||
    "";

  badge.textContent =
    getUnderstandingLabel(
      responseData.understandingLevel
    );


  header.append(
    studentArea,
    badge
  );


  /* -----------------------------------------
     INFO RINGKAS
  ----------------------------------------- */

  const info =
    document.createElement(
      "div"
    );

  info.className =
    "response-session-info";


  info.append(
    createInfoItem(
      t(
        "responses.submittedAt",
        "Dihantar"
      ),
      formatTimestamp(
        responseData.submittedAt
      )
    )
  );


  /* -----------------------------------------
     REFLEKSI
  ----------------------------------------- */

  const reflectionGrid =
    document.createElement(
      "div"
    );

  reflectionGrid.className =
    "response-reflection-grid";


  const understoodBlock =
    document.createElement(
      "div"
    );


  const understoodTitle =
    document.createElement(
      "strong"
    );

  understoodTitle.textContent =
    t(
      "responses.whatUnderstood",
      "Apa yang telah difahami"
    );


  const understoodText =
    document.createElement(
      "p"
    );

  understoodText.textContent =
    responseData.understoodText ||
    "-";


  understoodBlock.append(
    understoodTitle,
    understoodText
  );


  const notUnderstoodBlock =
    document.createElement(
      "div"
    );


  const notUnderstoodTitle =
    document.createElement(
      "strong"
    );

  notUnderstoodTitle.textContent =
    t(
      "responses.whatNotUnderstood",
      "Apa yang masih belum difahami"
    );


  const notUnderstoodText =
    document.createElement(
      "p"
    );

  notUnderstoodText.textContent =
    responseData.notUnderstoodText ||
    "-";


  notUnderstoodBlock.append(
    notUnderstoodTitle,
    notUnderstoodText
  );


  reflectionGrid.append(
    understoodBlock,
    notUnderstoodBlock
  );


  /* -----------------------------------------
     JAWAPAN SOALAN
  ----------------------------------------- */

  const questionSection =
    document.createElement(
      "div"
    );

  questionSection.className =
    "response-question-answers";


  const questionHeading =
    document.createElement(
      "h4"
    );

  questionHeading.textContent =
    t(
      "responses.questionAnswers",
      "Jawapan Soalan"
    );


  questionSection.appendChild(
    questionHeading
  );


  const questionAnswers =
    Array.isArray(
      responseData.questionAnswers
    )
      ? responseData.questionAnswers
      : [];


  if (
    questionAnswers.length === 0
  ) {

    const noAnswer =
      document.createElement(
        "p"
      );

    noAnswer.textContent =
      t(
        "responses.noQuestionAnswers",
        "Tiada jawapan soalan."
      );

    questionSection.appendChild(
      noAnswer
    );

  } else {

    questionAnswers.forEach(
      (item, index) => {

        const answerItem =
          document.createElement(
            "div"
          );

        answerItem.className =
          "response-answer-item";


        const questionText =
          document.createElement(
            "strong"
          );


        const answerText =
          document.createElement(
            "p"
          );


        if (
          typeof item === "object" &&
          item !== null
        ) {

          questionText.textContent =
            item.question ||
            `${t(
              "responses.question",
              "Soalan"
            )} ${index + 1}`;


          answerText.textContent =
            item.answer ||
            "-";

        } else {

          questionText.textContent =
            `${t(
              "responses.question",
              "Soalan"
            )} ${index + 1}`;


          answerText.textContent =
            String(item || "-");
        }


        answerItem.append(
          questionText,
          answerText
        );


        questionSection.appendChild(
          answerItem
        );
      }
    );
  }


  /* -----------------------------------------
     MASUKKAN KANDUNGAN
  ----------------------------------------- */

  card.append(
    header,
    info,
    reflectionGrid,
    questionSection
  );


  return card;
}


/* =========================================================
   PAPAR RESPONS
========================================================= */

function displayResponses() {

  const sessionResponses =
    getSelectedSessionResponses();


  responsesList.innerHTML =
    "";


  noResponsesPanel
    .classList
    .add("hidden");


  noSearchResultsPanel
    .classList
    .add("hidden");


  if (
    sessionResponses.length === 0
  ) {

    noResponsesPanel
      .classList
      .remove("hidden");

    return;
  }


  const searchValue =
    responseSearch.value
      .trim()
      .toLowerCase();


  const filteredResponses =
    sessionResponses.filter(
      (responseData) => {

        const searchable =
          [
            responseData.studentName,
            responseData.studentMatric
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


        return (
          !searchValue ||
          searchable.includes(
            searchValue
          )
        );
      }
    );


  if (
    filteredResponses.length === 0
  ) {

    noSearchResultsPanel
      .classList
      .remove("hidden");

    return;
  }


  filteredResponses
    .sort(
      (
        firstResponse,
        secondResponse
      ) => {

        const firstTime =
          firstResponse.submittedAt
            ?.seconds || 0;

        const secondTime =
          secondResponse.submittedAt
            ?.seconds || 0;

        return (
          secondTime -
          firstTime
        );
      }
    )
    .forEach(
      (responseData) => {

        responsesList.appendChild(
          createResponseCard(
            responseData
          )
        );
      }
    );
}


/* =========================================================
   PAPAR ANALISIS SESI
========================================================= */

function displaySelectedSessionAnalysis() {

  if (
    !selectedSessionId
  ) {

    responseAnalysisContent
      .classList
      .add("hidden");

    return;
  }


  responseAnalysisContent
    .classList
    .remove("hidden");


  displaySelectedSessionInfo();

  displayUnderstandingAnalysis();

  displayNotUnderstoodSummary();

  displayResponses();
}


/* =========================================================
   DAPATKAN PARAMETER SESI
========================================================= */

function getRequestedSessionId() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return (
    params.get("session") ||
    ""
  );
}


/* =========================================================
   SET SESI AWAL
========================================================= */

function setInitialSession() {

  const requestedSessionId =
    getRequestedSessionId();


  if (
    requestedSessionId &&
    lecturerSessions.some(
      (sessionData) =>
        sessionData.id ===
        requestedSessionId
    )
  ) {

    selectedSessionId =
      requestedSessionId;

  } else if (
    lecturerSessions.length > 0
  ) {

    selectedSessionId =
      lecturerSessions[0].id;

  } else {

    selectedSessionId =
      "";
  }


  renderSessionOptions();


  sessionSelect.value =
    selectedSessionId;


  displaySelectedSessionAnalysis();
}


/* =========================================================
   DAPATKAN RESPONS
========================================================= */

async function loadLecturerResponses(
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
   DAPATKAN SESI
========================================================= */

async function loadLecturerSessions(
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
   LOAD SEMUA DATA
========================================================= */

async function loadPageData(
  lecturerId
) {

  responsesLoading
    .classList
    .remove("hidden");


  noResponseSessionsPanel
    .classList
    .add("hidden");


  responseAnalysisContent
    .classList
    .add("hidden");


  clearMessage();


  try {

    /*
      Ambil respons dan sesi.
    */

    await loadLecturerResponses(
      lecturerId
    );


    await loadLecturerSessions(
      lecturerId
    );


    overallSessionCount.textContent =
      lecturerSessions.length;


    overallResponseCount.textContent =
      lecturerResponses.length;


    if (
      lecturerSessions.length === 0
    ) {

      noResponseSessionsPanel
        .classList
        .remove("hidden");

      renderSessionOptions();

      return;
    }


    setInitialSession();


  } catch (error) {

    console.error(
      "Respons dan analisis gagal dimuatkan:",
      error
    );


    showMessage(
      t(
        "responses.loadError",
        "Respons dan analisis gagal dimuatkan. Sila cuba semula."
      ),
      "error"
    );


  } finally {

    responsesLoading
      .classList
      .add("hidden");
  }
}


/* =========================================================
   EVENT PILIH SESI
========================================================= */

sessionSelect.addEventListener(
  "change",
  () => {

    selectedSessionId =
      sessionSelect.value;


    responseSearch.value =
      "";


    displaySelectedSessionAnalysis();
  }
);


/* =========================================================
   EVENT CARI PELAJAR
========================================================= */

responseSearch.addEventListener(
  "input",
  displayResponses
);


/* =========================================================
   APABILA BAHASA BERUBAH
========================================================= */

document.addEventListener(
  "languagechange",
  () => {

    /*
      Profil.
    */

    if (
      currentLecturer
    ) {

      displayLecturer(
        currentLecturer
      );
    }


    /*
      Dropdown sesi dijana menggunakan JS.
    */

    renderSessionOptions();


    if (
      selectedSessionId
    ) {

      sessionSelect.value =
        selectedSessionId;
    }


    /*
      Status, tarikh dan kad respons
      perlu dibina semula.
    */

    displaySelectedSessionAnalysis();
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


    await loadPageData(
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
        t(
          "message.logoutError",
          "Log keluar tidak berjaya. Sila cuba semula."
        )
      );
    }
  }
);