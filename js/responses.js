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
   RESPONS PELAJAR - SENARAI
========================================================= */

const responseListView =
  document.getElementById("responseListView");

const responseSearch =
  document.getElementById("responseSearch");

const noResponsesPanel =
  document.getElementById("noResponsesPanel");

const noSearchResultsPanel =
  document.getElementById("noSearchResultsPanel");

const responsesList =
  document.getElementById("responsesList");

const exportAllResponsesBtn =
  document.getElementById("exportAllResponsesBtn");

const exportSummaryBtn =
  document.getElementById("exportSummaryBtn");


/* =========================================================
   RESPONS PELAJAR - INDIVIDU
========================================================= */

const individualResponseView =
  document.getElementById("individualResponseView");

const backToResponseListBtn =
  document.getElementById("backToResponseListBtn");

const individualStudentSelect =
  document.getElementById("individualStudentSelect");

const individualResponseEyebrow =
  document.getElementById("individualResponseEyebrow");

const individualStudentName =
  document.getElementById("individualStudentName");

const individualStudentMatric =
  document.getElementById("individualStudentMatric");

const individualUnderstandingBadge =
  document.getElementById("individualUnderstandingBadge");

const individualClassLabel =
  document.getElementById("individualClassLabel");

const individualStudentClass =
  document.getElementById("individualStudentClass");

const individualSubmittedLabel =
  document.getElementById("individualSubmittedLabel");

const individualSubmittedAt =
  document.getElementById("individualSubmittedAt");

const individualUnderstoodTitle =
  document.getElementById("individualUnderstoodTitle");

const individualUnderstoodText =
  document.getElementById("individualUnderstoodText");

const individualNotUnderstoodTitle =
  document.getElementById("individualNotUnderstoodTitle");

const individualNotUnderstoodText =
  document.getElementById("individualNotUnderstoodText");

const individualQuestionAnswersTitle =
  document.getElementById("individualQuestionAnswersTitle");

const individualQuestionAnswers =
  document.getElementById("individualQuestionAnswers");

const previousResponseBtn =
  document.getElementById("previousResponseBtn");

const nextResponseBtn =
  document.getElementById("nextResponseBtn");

const responsePosition =
  document.getElementById("responsePosition");


/* =========================================================
   DATA GLOBAL
========================================================= */

let currentLecturer = null;

let lecturerSessions = [];

let lecturerResponses = [];

let selectedSessionId = "";

let individualResponses = [];

let selectedIndividualIndex = 0;


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
   BAHASA
========================================================= */

function isEnglish() {

  return (
    document.documentElement.lang ===
    "en"
  );
}


function updateDynamicLabels() {

  exportAllResponsesBtn.textContent =
    isEnglish()
      ? "Export All Responses (CSV)"
      : "Eksport Semua Respons (CSV)";


  exportSummaryBtn.textContent =
    isEnglish()
      ? "Export Summary (CSV)"
      : "Eksport Ringkasan (CSV)";


  backToResponseListBtn.textContent =
    isEnglish()
      ? "← Back to List"
      : "← Kembali ke Senarai";


  individualResponseEyebrow.textContent =
    isEnglish()
      ? "INDIVIDUAL RESPONSE"
      : "RESPONS INDIVIDU";


  individualClassLabel.textContent =
    isEnglish()
      ? "Class"
      : "Kelas";


  individualSubmittedLabel.textContent =
    isEnglish()
      ? "Submitted"
      : "Dihantar";


  individualUnderstoodTitle.textContent =
    isEnglish()
      ? "What the student understood"
      : "Apa yang telah difahami";


  individualNotUnderstoodTitle.textContent =
    isEnglish()
      ? "What is still not understood"
      : "Apa yang masih belum difahami";


  individualQuestionAnswersTitle.textContent =
    isEnglish()
      ? "Question Answers"
      : "Jawapan Soalan";


  previousResponseBtn.textContent =
    isEnglish()
      ? "← Previous"
      : "← Sebelumnya";


  nextResponseBtn.textContent =
    isEnglish()
      ? "Next →"
      : "Seterusnya →";


  const selectLabel =
    document.querySelector(
      'label[for="individualStudentSelect"]'
    );

  if (selectLabel) {

    selectLabel.textContent =
      isEnglish()
        ? "Select Student"
        : "Pilih Pelajar";
  }
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

function getDateFromTimestamp(
  timestamp
) {

  if (!timestamp) {
    return null;
  }

  try {

    if (
      typeof timestamp.toDate ===
      "function"
    ) {

      return timestamp.toDate();
    }

    const date =
      new Date(timestamp);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return null;
    }

    return date;

  } catch (error) {

    return null;
  }
}


function formatTimestamp(
  timestamp
) {

  const date =
    getDateFromTimestamp(
      timestamp
    );

  if (!date) {
    return "-";
  }

  const locale =
    isEnglish()
      ? "en-MY"
      : "ms-MY";

  return new Intl.DateTimeFormat(
    locale,
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(date);
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
      sessionData.id ===
      selectedSessionId
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
   SUSUN RESPONS
========================================================= */

function sortResponsesByStudent(
  responses
) {

  return [...responses].sort(
    (
      firstResponse,
      secondResponse
    ) => {

      const firstName =
        (
          firstResponse.studentName ||
          ""
        ).trim();

      const secondName =
        (
          secondResponse.studentName ||
          ""
        ).trim();

      const nameResult =
        firstName.localeCompare(
          secondName,
          isEnglish()
            ? "en"
            : "ms",
          {
            sensitivity: "base"
          }
        );

      if (nameResult !== 0) {
        return nameResult;
      }

      return (
        firstResponse.studentMatric ||
        ""
      ).localeCompare(
        secondResponse.studentMatric ||
        ""
      );
    }
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
    document.createElement(
      "option"
    );

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
        sessionData.id ===
        currentValue
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
        (responseData) => ({
          studentName:
            responseData.studentName ||
            t(
              "responses.unknownStudent",
              "Pelajar"
            ),

          studentMatric:
            responseData.studentMatric ||
            "-",

          text:
            responseData.notUnderstoodText
              ?.trim()
        })
      )
      .filter(
        (item) =>
          item.text
      );


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
    (item, index) => {

      const article =
        document.createElement(
          "article"
        );

      article.className =
        "reflection-summary-item";


      const heading =
        document.createElement(
          "strong"
        );

      heading.textContent =
        `${index + 1}. ${item.studentName}`;


      const meta =
        document.createElement(
          "small"
        );

      meta.textContent =
        item.studentMatric;


      const content =
        document.createElement(
          "p"
        );

      content.textContent =
        item.text;


      article.append(
        heading,
        meta,
        content
      );


      notUnderstoodSummary.appendChild(
        article
      );
    }
  );
}


/* =========================================================
   CIPTA ITEM SENARAI RESPONS
========================================================= */

function createResponseListItem(
  responseData
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "response-list-card";

  card.dataset.level =
    responseData.understandingLevel ||
    "";


  const main =
    document.createElement(
      "div"
    );

  main.className =
    "response-list-main";


  const heading =
    document.createElement(
      "div"
    );

  heading.className =
    "response-list-heading";


  const name =
    document.createElement(
      "h3"
    );

  name.textContent =
    responseData.studentName ||
    t(
      "responses.unknownStudent",
      "Pelajar"
    );


  const badge =
    document.createElement(
      "span"
    );

  badge.className =
    "understanding-badge";

  badge.textContent =
    getUnderstandingLabel(
      responseData.understandingLevel
    );


  heading.append(
    name,
    badge
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


  const submitted =
    document.createElement(
      "small"
    );

  submitted.textContent =
    `${
      isEnglish()
        ? "Submitted"
        : "Dihantar"
    }: ${formatTimestamp(
      responseData.submittedAt
    )}`;


  main.append(
    heading,
    matric,
    submitted
  );


  const viewButton =
    document.createElement(
      "button"
    );

  viewButton.type =
    "button";

  viewButton.className =
    "primary-button response-view-button";

  viewButton.textContent =
    isEnglish()
      ? "View Response"
      : "Lihat Respons";


  viewButton.addEventListener(
    "click",
    () => {

      openIndividualResponse(
        responseData.id
      );
    }
  );


  card.append(
    main,
    viewButton
  );


  return card;
}


/* =========================================================
   PAPAR SENARAI RESPONS
========================================================= */

function displayResponses() {

  const sessionResponses =
    sortResponsesByStudent(
      getSelectedSessionResponses()
    );


  responsesList.innerHTML =
    "";


  noResponsesPanel
    .classList
    .add("hidden");


  noSearchResultsPanel
    .classList
    .add("hidden");


  exportAllResponsesBtn.disabled =
    sessionResponses.length === 0;

  exportSummaryBtn.disabled =
    sessionResponses.length === 0;


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


  filteredResponses.forEach(
    (responseData) => {

      responsesList.appendChild(
        createResponseListItem(
          responseData
        )
      );
    }
  );
}


/* =========================================================
   RESPONS INDIVIDU
========================================================= */

function prepareIndividualResponses() {

  individualResponses =
    sortResponsesByStudent(
      getSelectedSessionResponses()
    );
}


function renderIndividualStudentOptions() {

  individualStudentSelect.innerHTML =
    "";


  individualResponses.forEach(
    (
      responseData,
      index
    ) => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        String(index);

      option.textContent =
        [
          responseData.studentName ||
            t(
              "responses.unknownStudent",
              "Pelajar"
            ),

          responseData.studentMatric
        ]
          .filter(Boolean)
          .join(" — ");


      individualStudentSelect.appendChild(
        option
      );
    }
  );


  individualStudentSelect.value =
    String(
      selectedIndividualIndex
    );
}


function renderIndividualQuestionAnswers(
  responseData
) {

  individualQuestionAnswers.innerHTML =
    "";


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

    noAnswer.className =
      "individual-no-answer";

    noAnswer.textContent =
      isEnglish()
        ? "No question answers were submitted."
        : "Tiada jawapan soalan dihantar.";

    individualQuestionAnswers.appendChild(
      noAnswer
    );

    return;
  }


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
          `${
            isEnglish()
              ? "Question"
              : "Soalan"
          } ${index + 1}`;


        answerText.textContent =
          item.answer ||
          "-";

      } else {

        questionText.textContent =
          `${
            isEnglish()
              ? "Question"
              : "Soalan"
          } ${index + 1}`;


        answerText.textContent =
          String(
            item || "-"
          );
      }


      answerItem.append(
        questionText,
        answerText
      );


      individualQuestionAnswers.appendChild(
        answerItem
      );
    }
  );
}


function displayIndividualResponse() {

  if (
    individualResponses.length === 0
  ) {

    showResponseList();

    return;
  }


  if (
    selectedIndividualIndex < 0
  ) {

    selectedIndividualIndex =
      0;
  }


  if (
    selectedIndividualIndex >=
    individualResponses.length
  ) {

    selectedIndividualIndex =
      individualResponses.length - 1;
  }


  const responseData =
    individualResponses[
      selectedIndividualIndex
    ];


  individualStudentSelect.value =
    String(
      selectedIndividualIndex
    );


  individualStudentName.textContent =
    responseData.studentName ||
    t(
      "responses.unknownStudent",
      "Pelajar"
    );


  individualStudentMatric.textContent =
    `${t(
      "student.matricNumber",
      "Nombor Matrik"
    )}: ${
      responseData.studentMatric ||
      "-"
    }`;


  individualUnderstandingBadge.textContent =
    getUnderstandingLabel(
      responseData.understandingLevel
    );

  individualUnderstandingBadge.dataset.level =
    responseData.understandingLevel ||
    "";


  const selectedSession =
    getSelectedSession();


  individualStudentClass.textContent =
    responseData.className ||
    selectedSession?.className ||
    "-";


  individualSubmittedAt.textContent =
    formatTimestamp(
      responseData.submittedAt
    );


  individualUnderstoodText.textContent =
    responseData.understoodText ||
    "-";


  individualNotUnderstoodText.textContent =
    responseData.notUnderstoodText ||
    "-";


  renderIndividualQuestionAnswers(
    responseData
  );


  responsePosition.textContent =
    `${selectedIndividualIndex + 1} / ${
      individualResponses.length
    }`;


  previousResponseBtn.disabled =
    selectedIndividualIndex === 0;


  nextResponseBtn.disabled =
    selectedIndividualIndex ===
    individualResponses.length - 1;
}


function openIndividualResponse(
  responseId
) {

  prepareIndividualResponses();


  const index =
    individualResponses.findIndex(
      (responseData) =>
        responseData.id ===
        responseId
    );


  selectedIndividualIndex =
    index >= 0
      ? index
      : 0;


  renderIndividualStudentOptions();


  responseListView
    .classList
    .add("hidden");


  individualResponseView
    .classList
    .remove("hidden");


  displayIndividualResponse();


  individualResponseView.scrollIntoView(
    {
      behavior: "smooth",
      block: "start"
    }
  );
}


function showResponseList() {

  individualResponseView
    .classList
    .add("hidden");


  responseListView
    .classList
    .remove("hidden");
}


/* =========================================================
   CSV - UTILITI
========================================================= */

function protectCsvValue(
  value
) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";
  }


  let text =
    String(value);


  /*
    Elakkan Excel/Sheets mentafsir
    nilai pengguna sebagai formula.
  */

  if (
    /^[=+\-@]/.test(
      text.trimStart()
    )
  ) {

    text =
      `'${text}`;
  }


  return text;
}


function csvEscape(
  value
) {

  const text =
    protectCsvValue(
      value
    );


  return `"${text.replace(
    /"/g,
    '""'
  )}"`;
}


function rowsToCsv(
  rows
) {

  return rows
    .map(
      (row) =>
        row
          .map(csvEscape)
          .join(",")
    )
    .join("\r\n");
}


function sanitiseFilename(
  value
) {

  return String(
    value || "session"
  )
    .trim()
    .replace(
      /[<>:"/\\|?*\u0000-\u001F]/g,
      "-"
    )
    .replace(
      /\s+/g,
      "_"
    )
    .slice(
      0,
      80
    ) ||
    "session";
}


function downloadCsv(
  filename,
  rows
) {

  const csvContent =
    "\uFEFF" +
    rowsToCsv(
      rows
    );


  const blob =
    new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    filename;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );
}


/* =========================================================
   CSV - SOALAN
========================================================= */

function getQuestionAnswerPair(
  item,
  index
) {

  if (
    typeof item === "object" &&
    item !== null
  ) {

    return {
      question:
        item.question ||
        `${
          isEnglish()
            ? "Question"
            : "Soalan"
        } ${index + 1}`,

      answer:
        item.answer ||
        ""
    };
  }


  return {
    question:
      `${
        isEnglish()
          ? "Question"
          : "Soalan"
      } ${index + 1}`,

    answer:
      String(
        item || ""
      )
  };
}


function getMaximumQuestionCount(
  responses
) {

  return Math.max(
    0,
    ...responses.map(
      (responseData) =>
        Array.isArray(
          responseData.questionAnswers
        )
          ? responseData
              .questionAnswers
              .length
          : 0
    )
  );
}


/* =========================================================
   EXPORT SEMUA RESPONS
========================================================= */

function exportAllResponses() {

  const sessionData =
    getSelectedSession();

  const responses =
    sortResponsesByStudent(
      getSelectedSessionResponses()
    );


  if (
    !sessionData ||
    responses.length === 0
  ) {

    showMessage(
      isEnglish()
        ? "There are no responses to export."
        : "Tiada respons untuk dieksport.",
      "error"
    );

    return;
  }


  clearMessage();


  const maxQuestionCount =
    getMaximumQuestionCount(
      responses
    );


  const header =
    [
      isEnglish()
        ? "No."
        : "Bil",

      isEnglish()
        ? "Student Name"
        : "Nama Pelajar",

      isEnglish()
        ? "Matric Number"
        : "Nombor Matrik",

      isEnglish()
        ? "Class"
        : "Kelas",

      isEnglish()
        ? "Course"
        : "Kursus",

      isEnglish()
        ? "Topic"
        : "Topik",

      isEnglish()
        ? "Session Code"
        : "Kod Sesi",

      isEnglish()
        ? "Understanding Level"
        : "Tahap Kefahaman",

      isEnglish()
        ? "What Was Understood"
        : "Apa yang Difahami",

      isEnglish()
        ? "What Is Still Not Understood"
        : "Apa yang Masih Belum Difahami"
    ];


  for (
    let index = 0;
    index < maxQuestionCount;
    index += 1
  ) {

    header.push(
      `${
        isEnglish()
          ? "Question"
          : "Soalan"
      } ${index + 1}`
    );

    header.push(
      `${
        isEnglish()
          ? "Answer"
          : "Jawapan"
      } ${index + 1}`
    );
  }


  header.push(
    isEnglish()
      ? "Submitted At"
      : "Tarikh/Masa Hantar"
  );


  const course =
    [
      sessionData.courseCode,
      sessionData.courseName
    ]
      .filter(Boolean)
      .join(" — ");


  const rows =
    [header];


  responses.forEach(
    (
      responseData,
      responseIndex
    ) => {

      const row =
        [
          responseIndex + 1,
          responseData.studentName || "",
          responseData.studentMatric || "",
          responseData.className ||
            sessionData.className ||
            "",
          course,
          sessionData.topic || "",
          sessionData.sessionCode || "",
          getUnderstandingLabel(
            responseData.understandingLevel
          ),
          responseData.understoodText || "",
          responseData.notUnderstoodText || ""
        ];


      const answers =
        Array.isArray(
          responseData.questionAnswers
        )
          ? responseData.questionAnswers
          : [];


      for (
        let index = 0;
        index < maxQuestionCount;
        index += 1
      ) {

        if (
          answers[index] !==
          undefined
        ) {

          const pair =
            getQuestionAnswerPair(
              answers[index],
              index
            );


          row.push(
            pair.question,
            pair.answer
          );

        } else {

          row.push(
            "",
            ""
          );
        }
      }


      row.push(
        formatTimestamp(
          responseData.submittedAt
        )
      );


      rows.push(
        row
      );
    }
  );


  const filename =
    `${
      sanitiseFilename(
        sessionData.sessionCode ||
        sessionData.topic
      )
    }_all_responses.csv`;


  downloadCsv(
    filename,
    rows
  );


  showMessage(
    isEnglish()
      ? "All responses CSV has been downloaded."
      : "Fail CSV semua respons telah dimuat turun.",
    "success"
  );
}


/* =========================================================
   EXPORT RINGKASAN
========================================================= */

function exportSummary() {

  const sessionData =
    getSelectedSession();

  const responses =
    sortResponsesByStudent(
      getSelectedSessionResponses()
    );


  if (
    !sessionData ||
    responses.length === 0
  ) {

    showMessage(
      isEnglish()
        ? "There are no responses to summarise."
        : "Tiada respons untuk diringkaskan.",
      "error"
    );

    return;
  }


  clearMessage();


  const total =
    responses.length;


  const understood =
    responses.filter(
      (responseData) =>
        responseData.understandingLevel ===
        "faham"
    ).length;


  const partial =
    responses.filter(
      (responseData) =>
        responseData.understandingLevel ===
        "sebahagian"
    ).length;


  const notUnderstood =
    responses.filter(
      (responseData) =>
        responseData.understandingLevel ===
        "belum_faham"
    ).length;


  const course =
    [
      sessionData.courseCode,
      sessionData.courseName
    ]
      .filter(Boolean)
      .join(" — ");


  const rows =
    [
      [
        isEnglish()
          ? "SMART EXIT TICKET - SESSION SUMMARY"
          : "SMART EXIT TICKET - RINGKASAN SESI"
      ],

      [],

      [
        isEnglish()
          ? "Session Information"
          : "Maklumat Sesi"
      ],

      [
        isEnglish()
          ? "Course"
          : "Kursus",
        course
      ],

      [
        isEnglish()
          ? "Class"
          : "Kelas",
        sessionData.className || ""
      ],

      [
        isEnglish()
          ? "Topic"
          : "Topik",
        sessionData.topic || ""
      ],

      [
        isEnglish()
          ? "Session Code"
          : "Kod Sesi",
        sessionData.sessionCode || ""
      ],

      [
        isEnglish()
          ? "Status"
          : "Status",
        getStatusLabel(
          sessionData.status
        )
      ],

      [
        isEnglish()
          ? "Total Responses"
          : "Jumlah Respons",
        total
      ],

      [],

      [
        isEnglish()
          ? "Understanding Summary"
          : "Ringkasan Kefahaman"
      ],

      [
        isEnglish()
          ? "Level"
          : "Tahap",
        isEnglish()
          ? "Number"
          : "Bilangan",
        isEnglish()
          ? "Percentage"
          : "Peratus"
      ],

      [
        getUnderstandingLabel(
          "faham"
        ),
        understood,
        `${calculatePercentage(
          understood,
          total
        )}%`
      ],

      [
        getUnderstandingLabel(
          "sebahagian"
        ),
        partial,
        `${calculatePercentage(
          partial,
          total
        )}%`
      ],

      [
        getUnderstandingLabel(
          "belum_faham"
        ),
        notUnderstood,
        `${calculatePercentage(
          notUnderstood,
          total
        )}%`
      ],

      [],

      [
        isEnglish()
          ? "Student Summary"
          : "Ringkasan Pelajar"
      ],

      [
        isEnglish()
          ? "No."
          : "Bil",

        isEnglish()
          ? "Student Name"
          : "Nama Pelajar",

        isEnglish()
          ? "Matric Number"
          : "Nombor Matrik",

        isEnglish()
          ? "Understanding Level"
          : "Tahap Kefahaman",

        isEnglish()
          ? "What Is Still Not Understood"
          : "Apa yang Masih Belum Difahami"
      ]
    ];


  responses.forEach(
    (
      responseData,
      index
    ) => {

      rows.push(
        [
          index + 1,
          responseData.studentName || "",
          responseData.studentMatric || "",
          getUnderstandingLabel(
            responseData.understandingLevel
          ),
          responseData.notUnderstoodText || ""
        ]
      );
    }
  );


  const filename =
    `${
      sanitiseFilename(
        sessionData.sessionCode ||
        sessionData.topic
      )
    }_summary.csv`;


  downloadCsv(
    filename,
    rows
  );


  showMessage(
    isEnglish()
      ? "Summary CSV has been downloaded."
      : "Fail CSV ringkasan telah dimuat turun.",
    "success"
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


  showResponseList();

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


    selectedIndividualIndex =
      0;


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
   EVENT VIEW INDIVIDU
========================================================= */

backToResponseListBtn.addEventListener(
  "click",
  showResponseList
);


individualStudentSelect.addEventListener(
  "change",
  () => {

    selectedIndividualIndex =
      Number(
        individualStudentSelect.value
      ) || 0;


    displayIndividualResponse();
  }
);


previousResponseBtn.addEventListener(
  "click",
  () => {

    if (
      selectedIndividualIndex > 0
    ) {

      selectedIndividualIndex -= 1;

      displayIndividualResponse();
    }
  }
);


nextResponseBtn.addEventListener(
  "click",
  () => {

    if (
      selectedIndividualIndex <
      individualResponses.length - 1
    ) {

      selectedIndividualIndex += 1;

      displayIndividualResponse();
    }
  }
);


/* =========================================================
   EVENT EXPORT CSV
========================================================= */

exportAllResponsesBtn.addEventListener(
  "click",
  exportAllResponses
);


exportSummaryBtn.addEventListener(
  "click",
  exportSummary
);


/* =========================================================
   APABILA BAHASA BERUBAH
========================================================= */

document.addEventListener(
  "languagechange",
  () => {

    updateDynamicLabels();


    if (
      currentLecturer
    ) {

      displayLecturer(
        currentLecturer
      );
    }


    renderSessionOptions();


    if (
      selectedSessionId
    ) {

      sessionSelect.value =
        selectedSessionId;
    }


    displaySelectedSessionInfo();

    displayUnderstandingAnalysis();

    displayNotUnderstoodSummary();

    displayResponses();


    if (
      !individualResponseView
        .classList
        .contains("hidden")
    ) {

      const currentId =
        individualResponses[
          selectedIndividualIndex
        ]?.id;


      prepareIndividualResponses();


      const updatedIndex =
        individualResponses.findIndex(
          (responseData) =>
            responseData.id ===
            currentId
        );


      selectedIndividualIndex =
        updatedIndex >= 0
          ? updatedIndex
          : 0;


      renderIndividualStudentOptions();

      displayIndividualResponse();
    }
  }
);


/* =========================================================
   AUTHENTICATION
========================================================= */

updateDynamicLabels();


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
