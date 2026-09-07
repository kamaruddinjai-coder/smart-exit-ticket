import {
  auth,
  db
} from "./firebase-config.js";

import {
  onAuthStateChanged,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import {
  t
} from "./i18n.js";


/* =========================================================
   PANEL UTAMA
========================================================= */

const studentLoading =
  document.getElementById("studentLoading");

const studentError =
  document.getElementById("studentError");

const studentErrorTitle =
  document.getElementById("studentErrorTitle");

const studentErrorText =
  document.getElementById("studentErrorText");

const studentSessionContent =
  document.getElementById("studentSessionContent");

const studentSuccess =
  document.getElementById("studentSuccess");


/* =========================================================
   MAKLUMAT SESI
========================================================= */

const studentTopic =
  document.getElementById("studentTopic");

const studentCourse =
  document.getElementById("studentCourse");

const studentClass =
  document.getElementById("studentClass");

const studentSessionCode =
  document.getElementById("studentSessionCode");

const studentSubtopicList =
  document.getElementById("studentSubtopicList");

const studentQuestionContainer =
  document.getElementById("studentQuestionContainer");


/* =========================================================
   BORANG PELAJAR
========================================================= */

const studentResponseForm =
  document.getElementById("studentResponseForm");

const studentName =
  document.getElementById("studentName");

const studentMatric =
  document.getElementById("studentMatric");

const understoodText =
  document.getElementById("understoodText");

const notUnderstoodText =
  document.getElementById("notUnderstoodText");

const studentFormMessage =
  document.getElementById("studentFormMessage");

const automaticFeedback =
  document.getElementById("automaticFeedback");

const submitResponseBtn =
  document.getElementById("submitResponseBtn");

const studentSuccessFeedback =
  document.getElementById("studentSuccessFeedback");


/* =========================================================
   DATA GLOBAL
========================================================= */

let currentStudent = null;

let currentSessionId = "";

let currentSessionData = null;


/* =========================================================
   PARAMETER SESI
========================================================= */

function getSessionIdFromURL() {

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
   NORMALISASI MATRIK
========================================================= */

function normalizeMatric(
  value
) {

  return value
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9]/g, "");
}


/* =========================================================
   CIPTA ID RESPONS
   1 MATRIK = 1 RESPONS PER SESI
========================================================= */

function createResponseId(
  sessionId,
  matric
) {

  return `${sessionId}_${matric}`;
}


/* =========================================================
   MESEJ BORANG
========================================================= */

function showFormMessage(
  text,
  type
) {

  studentFormMessage.textContent =
    text;

  studentFormMessage.className =
    `message show ${type}`;
}


function clearFormMessage() {

  studentFormMessage.textContent =
    "";

  studentFormMessage.className =
    "message";
}


/* =========================================================
   PAPAR ERROR
========================================================= */

function showStudentError(
  title,
  message
) {

  studentLoading
    .classList
    .add("hidden");

  studentSessionContent
    .classList
    .add("hidden");

  studentSuccess
    .classList
    .add("hidden");

  studentError
    .classList
    .remove("hidden");


  studentErrorTitle.textContent =
    title;

  studentErrorText.textContent =
    message;
}


/* =========================================================
   PAPAR SESI
========================================================= */

function showSessionContent() {

  studentLoading
    .classList
    .add("hidden");

  studentError
    .classList
    .add("hidden");

  studentSuccess
    .classList
    .add("hidden");

  studentSessionContent
    .classList
    .remove("hidden");
}


/* =========================================================
   LABEL STATUS
========================================================= */

function getSessionStatusLabel(
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
   PAPAR SUBTOPIK
========================================================= */

function displaySubtopics() {

  studentSubtopicList.innerHTML =
    "";


  const subtopics =
    Array.isArray(
      currentSessionData?.subtopics
    )
      ? currentSessionData.subtopics
      : [];


  if (
    subtopics.length === 0
  ) {

    const item =
      document.createElement(
        "li"
      );

    item.textContent =
      t(
        "student.noSubtopics",
        "Tiada subtopik."
      );

    studentSubtopicList
      .appendChild(
        item
      );

    return;
  }


  subtopics.forEach(
    (subtopic) => {

      const item =
        document.createElement(
          "li"
        );

      item.textContent =
        subtopic;

      studentSubtopicList
        .appendChild(
          item
        );
    }
  );
}


/* =========================================================
   PAPAR SOALAN PENSYARAH
========================================================= */

function displayLecturerQuestions() {

  studentQuestionContainer.innerHTML =
    "";


  const questions =
    Array.isArray(
      currentSessionData?.questions
    )
      ? currentSessionData.questions
      : [];


  if (
    questions.length === 0
  ) {

    const noQuestions =
      document.createElement(
        "div"
      );

    noQuestions.className =
      "student-status-card";


    const title =
      document.createElement(
        "h3"
      );

    title.textContent =
      t(
        "student.noLecturerQuestions",
        "Tiada soalan tambahan"
      );


    const description =
      document.createElement(
        "p"
      );

    description.textContent =
      t(
        "student.noLecturerQuestionsDescription",
        "Pensyarah tidak menyediakan soalan tambahan untuk sesi ini."
      );


    noQuestions.append(
      title,
      description
    );


    studentQuestionContainer
      .appendChild(
        noQuestions
      );

    return;
  }


  questions.forEach(
    (question, index) => {

      const questionCard =
        document.createElement(
          "div"
        );

      questionCard.className =
        "student-question-item";


      const label =
        document.createElement(
          "label"
        );


      const questionNumber =
        document.createElement(
          "strong"
        );

      questionNumber.textContent =
        `${t(
          "student.question",
          "Soalan"
        )} ${index + 1}`;


      const questionText =
        document.createElement(
          "span"
        );

      questionText.textContent =
        question;


      label.append(
        questionNumber,
        questionText
      );


      const textarea =
        document.createElement(
          "textarea"
        );

      textarea.className =
        "student-question-answer";

      textarea.dataset.question =
        question;

      textarea.dataset.questionIndex =
        index;

      textarea.maxLength =
        1000;

      textarea.required =
        true;

      textarea.placeholder =
        t(
          "student.answerPlaceholder",
          "Taip jawapan anda..."
        );

      textarea.setAttribute(
        "aria-label",
        `${t(
          "student.answerFor",
          "Jawapan bagi"
        )} ${t(
          "student.question",
          "Soalan"
        )} ${index + 1}`
      );


      questionCard.append(
        label,
        textarea
      );


      studentQuestionContainer
        .appendChild(
          questionCard
        );
    }
  );
}


/* =========================================================
   PAPAR MAKLUMAT SESI
========================================================= */

function displaySessionInformation() {

  if (!currentSessionData) {
    return;
  }


  studentTopic.textContent =
    currentSessionData.topic ||
    "-";


  studentCourse.textContent =
    [
      currentSessionData.courseCode,
      currentSessionData.courseName
    ]
      .filter(Boolean)
      .join(" — ") ||
    "-";


  studentClass.textContent =
    currentSessionData.className ||
    "-";


  studentSessionCode.textContent =
    currentSessionData.sessionCode ||
    "-";


  displaySubtopics();

  displayLecturerQuestions();
}


/* =========================================================
   DAPATKAN RADIO KEFAHAMAN
========================================================= */

function getSelectedUnderstandingLevel() {

  const selected =
    document.querySelector(
      'input[name="understandingLevel"]:checked'
    );

  return selected
    ? selected.value
    : "";
}


/* =========================================================
   DAPATKAN JAWAPAN SOALAN
========================================================= */

function getQuestionAnswers() {

  return [
    ...document.querySelectorAll(
      ".student-question-answer"
    )
  ].map(
    (textarea, index) => ({
      question:
        textarea.dataset.question ||
        `${t(
          "student.question",
          "Soalan"
        )} ${index + 1}`,

      answer:
        textarea.value.trim()
    })
  );
}


/* =========================================================
   AUTOMATIC FEEDBACK
========================================================= */

function getAutomaticFeedback(
  understandingLevel
) {

  if (
    understandingLevel ===
    "faham"
  ) {

    return t(
      "student.feedbackUnderstand",
      "Bagus. Teruskan mengukuhkan kefahaman anda dengan membuat latihan dan menghubungkan konsep yang dipelajari."
    );
  }


  if (
    understandingLevel ===
    "sebahagian"
  ) {

    return t(
      "student.feedbackPartial",
      "Anda telah memahami sebahagian pembelajaran. Semak semula bahagian yang masih kurang jelas dan dapatkan penjelasan lanjut jika perlu."
    );
  }


  if (
    understandingLevel ===
    "belum_faham"
  ) {

    return t(
      "student.feedbackNotUnderstand",
      "Kenal pasti bahagian yang paling mengelirukan dan bincangkannya dengan Pensyarah atau rakan sebelum meneruskan ke topik seterusnya."
    );
  }


  return t(
    "student.feedbackDefault",
    "Terima kasih atas refleksi anda."
  );
}


/* =========================================================
   PAPAR FEEDBACK AUTOMATIK
========================================================= */

function updateAutomaticFeedback() {

  const understandingLevel =
    getSelectedUnderstandingLevel();


  if (!understandingLevel) {

    automaticFeedback.textContent =
      "";

    automaticFeedback
      .classList
      .add("hidden");

    return;
  }


  automaticFeedback.textContent =
    getAutomaticFeedback(
      understandingLevel
    );


  automaticFeedback
    .classList
    .remove("hidden");
}


/* =========================================================
   EVENT RADIO KEFAHAMAN
========================================================= */

document
  .querySelectorAll(
    'input[name="understandingLevel"]'
  )
  .forEach(
    (radio) => {

      radio.addEventListener(
        "change",
        updateAutomaticFeedback
      );
    }
  );


/* =========================================================
   BACA SESI FIRESTORE
========================================================= */

async function loadSession() {

  currentSessionId =
    getSessionIdFromURL();


  if (
    !currentSessionId
  ) {

    showStudentError(
      t(
        "student.errorNoSessionTitle",
        "Pautan sesi tidak lengkap"
      ),
      t(
        "student.errorNoSessionText",
        "ID sesi Exit Ticket tidak ditemui dalam pautan ini."
      )
    );

    return;
  }


  try {

    const sessionReference =
      doc(
        db,
        "sessions",
        currentSessionId
      );


    const sessionSnapshot =
      await getDoc(
        sessionReference
      );


    if (
      !sessionSnapshot.exists()
    ) {

      showStudentError(
        t(
          "student.errorNotFoundTitle",
          "Sesi tidak ditemui"
        ),
        t(
          "student.errorNotFoundText",
          "Sesi Exit Ticket ini tidak wujud atau pautan tidak sah."
        )
      );

      return;
    }


    currentSessionData =
      {
        id:
          sessionSnapshot.id,

        ...sessionSnapshot.data()
      };


    /* -----------------------------------------------------
       STATUS DRAF
    ----------------------------------------------------- */

    if (
      currentSessionData.status ===
      "draft"
    ) {

      showStudentError(
        t(
          "student.errorDraftTitle",
          "Sesi belum dibuka"
        ),
        t(
          "student.errorDraftText",
          "Pensyarah belum mengaktifkan sesi Exit Ticket ini."
        )
      );

      return;
    }


    /* -----------------------------------------------------
       STATUS CLOSED
    ----------------------------------------------------- */

    if (
      currentSessionData.status ===
      "closed"
    ) {

      showStudentError(
        t(
          "student.errorClosedTitle",
          "Sesi telah ditutup"
        ),
        t(
          "student.errorClosedText",
          "Sesi Exit Ticket ini tidak lagi menerima respons."
        )
      );

      return;
    }


    /* -----------------------------------------------------
       STATUS ARCHIVED
    ----------------------------------------------------- */

    if (
      currentSessionData.status ===
      "archived"
    ) {

      showStudentError(
        t(
          "student.errorArchivedTitle",
          "Sesi telah diarkibkan"
        ),
        t(
          "student.errorArchivedText",
          "Sesi Exit Ticket ini telah diarkibkan dan tidak lagi menerima respons."
        )
      );

      return;
    }


    /* -----------------------------------------------------
       STATUS TIDAK SAH
    ----------------------------------------------------- */

    if (
      currentSessionData.status !==
      "active"
    ) {

      showStudentError(
        t(
          "student.errorUnavailableTitle",
          "Sesi tidak tersedia"
        ),
        t(
          "student.errorUnavailableText",
          "Sesi Exit Ticket ini tidak tersedia untuk dijawab."
        )
      );

      return;
    }


    displaySessionInformation();

    showSessionContent();


  } catch (error) {

    console.error(
      "Sesi gagal dimuatkan:",
      error
    );


    if (
      error.code ===
      "permission-denied"
    ) {

      showStudentError(
        t(
          "student.errorPermissionTitle",
          "Sesi tidak dapat dibuka"
        ),
        t(
          "student.errorPermissionText",
          "Sesi ini mungkin tidak aktif atau akses telah ditutup oleh Pensyarah."
        )
      );

    } else {

      showStudentError(
        t(
          "student.errorLoadTitle",
          "Sesi gagal dimuatkan"
        ),
        t(
          "student.errorLoadText",
          "Sila semak sambungan internet dan cuba semula."
        )
      );
    }
  }
}


/* =========================================================
   RESET BORANG SELEPAS BERJAYA
========================================================= */

function resetStudentForm() {

  studentResponseForm.reset();

  clearFormMessage();


  automaticFeedback.textContent =
    "";

  automaticFeedback
    .classList
    .add("hidden");
}


/* =========================================================
   PAPAR BERJAYA
========================================================= */

function showSuccess(
  understandingLevel
) {

  studentLoading
    .classList
    .add("hidden");

  studentError
    .classList
    .add("hidden");

  studentSessionContent
    .classList
    .add("hidden");

  studentSuccess
    .classList
    .remove("hidden");


  if (
    studentSuccessFeedback
  ) {

    studentSuccessFeedback.textContent =
      getAutomaticFeedback(
        understandingLevel
      );
  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   HANTAR RESPONS
========================================================= */

studentResponseForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    clearFormMessage();


    if (
      !currentStudent ||
      !currentSessionData ||
      !currentSessionId
    ) {

      showFormMessage(
        t(
          "student.sessionNotReady",
          "Sesi belum bersedia. Sila muat semula halaman."
        ),
        "error"
      );

      return;
    }


    if (
      currentSessionData.status !==
      "active"
    ) {

      showFormMessage(
        t(
          "student.sessionNotActive",
          "Sesi ini tidak lagi menerima respons."
        ),
        "error"
      );

      return;
    }


    const nameValue =
      studentName.value.trim();


    const matricValue =
      normalizeMatric(
        studentMatric.value
      );


    const understandingLevel =
      getSelectedUnderstandingLevel();


    const understoodValue =
      understoodText.value.trim();


    const notUnderstoodValue =
      notUnderstoodText.value.trim();


    const questionAnswers =
      getQuestionAnswers();


    /* -----------------------------------------------------
       VALIDASI NAMA
    ----------------------------------------------------- */

    if (
      !nameValue
    ) {

      showFormMessage(
        t(
          "student.nameRequired",
          "Sila masukkan nama penuh."
        ),
        "error"
      );

      studentName.focus();

      return;
    }


    /* -----------------------------------------------------
       VALIDASI MATRIK
    ----------------------------------------------------- */

    if (
      !matricValue
    ) {

      showFormMessage(
        t(
          "student.matricRequired",
          "Sila masukkan nombor matrik."
        ),
        "error"
      );

      studentMatric.focus();

      return;
    }


    studentMatric.value =
      matricValue;


    /* -----------------------------------------------------
       VALIDASI KEFAHAMAN
    ----------------------------------------------------- */

    if (
      !understandingLevel
    ) {

      showFormMessage(
        t(
          "student.understandingRequired",
          "Sila pilih tahap kefahaman."
        ),
        "error"
      );

      return;
    }


    /* -----------------------------------------------------
       VALIDASI REFLEKSI
    ----------------------------------------------------- */

    if (
      !understoodValue
    ) {

      showFormMessage(
        t(
          "student.understoodRequired",
          "Sila nyatakan perkara yang telah anda fahami."
        ),
        "error"
      );

      understoodText.focus();

      return;
    }


    if (
      !notUnderstoodValue
    ) {

      showFormMessage(
        t(
          "student.notUnderstoodRequired",
          "Sila nyatakan perkara yang masih belum anda fahami."
        ),
        "error"
      );

      notUnderstoodText.focus();

      return;
    }


    /* -----------------------------------------------------
       VALIDASI SOALAN
    ----------------------------------------------------- */

    const emptyAnswerIndex =
      questionAnswers.findIndex(
        (item) =>
          !item.answer
      );


    if (
      emptyAnswerIndex !== -1
    ) {

      showFormMessage(
        t(
          "student.questionRequired",
          "Sila jawab semua soalan Pensyarah."
        ),
        "error"
      );


      const questionFields =
        document.querySelectorAll(
          ".student-question-answer"
        );


      questionFields[
        emptyAnswerIndex
      ]?.focus();


      return;
    }


    submitResponseBtn.disabled =
      true;


    submitResponseBtn.textContent =
      t(
        "student.submitting",
        "Sedang menghantar..."
      );


    try {

      const responseId =
        createResponseId(
          currentSessionId,
          matricValue
        );


      const responseReference =
        doc(
          db,
          "responses",
          responseId
        );


      await setDoc(
        responseReference,
        {

          sessionId:
            currentSessionId,

          sessionCode:
            currentSessionData.sessionCode ||
            "",

          lecturerId:
            currentSessionData.lecturerId,

          classId:
            currentSessionData.classId,

          className:
            currentSessionData.className ||
            "",

          courseCode:
            currentSessionData.courseCode ||
            "",

          courseName:
            currentSessionData.courseName ||
            "",

          topic:
            currentSessionData.topic ||
            "",

          subtopics:
            Array.isArray(
              currentSessionData.subtopics
            )
              ? currentSessionData.subtopics
              : [],

          studentUid:
            currentStudent.uid,

          studentName:
            nameValue,

          studentMatric:
            matricValue,

          understandingLevel:
            understandingLevel,

          understoodText:
            understoodValue,

          notUnderstoodText:
            notUnderstoodValue,

          questionAnswers:
            questionAnswers,

          submittedAt:
            serverTimestamp()
        }
      );


      resetStudentForm();

      showSuccess(
        understandingLevel
      );


  } catch (error) {

      console.error(
        "Respons gagal dihantar:",
        error
      );


      /*
        Dengan Security Rules kita:
        - response ID mesti unik
        - update tidak dibenarkan
        - sesi mesti active

        Jadi percubaan kedua dengan nombor matrik
        yang sama akan mendapat permission-denied.
      */

      if (
        error.code ===
        "permission-denied"
      ) {

        showFormMessage(
          t(
            "student.duplicateOrClosed",
            "Nombor matrik ini telah menghantar Exit Ticket untuk sesi ini, atau sesi tidak lagi menerima respons."
          ),
          "error"
        );

      } else {

        showFormMessage(
          t(
            "student.submitError",
            "Respons gagal dihantar. Sila semak sambungan internet dan cuba semula."
          ),
          "error"
        );
      }


    } finally {

      submitResponseBtn.disabled =
        false;


      submitResponseBtn.textContent =
        t(
          "student.submit",
          "Hantar Exit Ticket"
        );
    }
  }
);


/* =========================================================
   APABILA BAHASA BERUBAH
========================================================= */

document.addEventListener(
  "languagechange",
  () => {

    /*
      Soalan dan subtopik adalah kandungan dinamik.
    */

    if (
      currentSessionData &&
      currentSessionData.status ===
        "active"
    ) {

      displaySubtopics();

      displayLecturerQuestions();
    }


    /*
      Automatic feedback.
    */

    updateAutomaticFeedback();


    /*
      Jika halaman success sedang dipaparkan,
      tukarkan feedback kepada bahasa semasa.
    */

    if (
      studentSuccess &&
      !studentSuccess.classList.contains(
        "hidden"
      ) &&
      studentSuccessFeedback
    ) {

      /*
        Selepas form reset, radio sudah tiada pilihan.
        Jadi jangan kosongkan feedback success.
        Gunakan data terakhir jika ada melalui
        dataset pada success panel.
      */

      const lastLevel =
        studentSuccess.dataset
          .understandingLevel;


      if (lastLevel) {

        studentSuccessFeedback.textContent =
          getAutomaticFeedback(
            lastLevel
          );
      }
    }


    /*
      Butang submit.
    */

    if (
      !submitResponseBtn.disabled
    ) {

      submitResponseBtn.textContent =
        t(
          "student.submit",
          "Hantar Exit Ticket"
        );
    }


    /*
      Jika halaman sedang menunjukkan error,
      baca semula sesi untuk menghasilkan
      mesej error dalam bahasa semasa.
    */

    if (
      !studentError.classList.contains(
        "hidden"
      )
    ) {

      loadSession();
    }
  }
);


/* =========================================================
   AUTH ANONYMOUS
========================================================= */

onAuthStateChanged(
  auth,
  async (user) => {

    if (user) {

      /*
        Pelajar sepatutnya menggunakan
        Anonymous Authentication.
      */

      const providerId =
        user.providerData?.[0]
          ?.providerId || "";


      if (
        user.isAnonymous ||
        providerId === "anonymous"
      ) {

        currentStudent =
          user;


        await loadSession();

        return;
      }
    }


    try {

      const credential =
        await signInAnonymously(
          auth
        );


      currentStudent =
        credential.user;


      await loadSession();


    } catch (error) {

      console.error(
        "Anonymous Authentication gagal:",
        error
      );


      showStudentError(
        t(
          "student.authErrorTitle",
          "Sambungan tidak berjaya"
        ),
        t(
          "student.authErrorText",
          "Sistem tidak dapat memulakan sesi Pelajar. Sila cuba semula."
        )
      );
    }
  }
);


/* =========================================================
   SIMPAN LEVEL TERAKHIR UNTUK SUCCESS FEEDBACK
========================================================= */

studentResponseForm.addEventListener(
  "submit",
  () => {

    const level =
      getSelectedUnderstandingLevel();


    if (
      level &&
      studentSuccess
    ) {

      studentSuccess.dataset
        .understandingLevel =
        level;
    }
  },
  true
);