import {
  auth,
  db
} from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
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
   BORANG SESI
========================================================= */

const sessionForm =
  document.getElementById("sessionForm");

const classSelect =
  document.getElementById("classSelect");

const selectedCourseInfo =
  document.getElementById("selectedCourseInfo");

const topic =
  document.getElementById("topic");

const subtopicContainer =
  document.getElementById("subtopicContainer");

const addSubtopicBtn =
  document.getElementById("addSubtopicBtn");

const questionContainer =
  document.getElementById("questionContainer");

const addQuestionBtn =
  document.getElementById("addQuestionBtn");

const sessionStatus =
  document.getElementById("sessionStatus");

const sessionFormMessage =
  document.getElementById("sessionFormMessage");

const saveSessionBtn =
  document.getElementById("saveSessionBtn");

const resetSessionBtn =
  document.getElementById("resetSessionBtn");


/* =========================================================
   KEPUTUSAN SESI
========================================================= */

const sessionResult =
  document.getElementById("sessionResult");

const sessionCodeDisplay =
  document.getElementById("sessionCodeDisplay");

const studentSessionLink =
  document.getElementById("studentSessionLink");

const copySessionLinkBtn =
  document.getElementById("copySessionLinkBtn");

const openStudentLink =
  document.getElementById("openStudentLink");


/* =========================================================
   DATA GLOBAL
========================================================= */

let currentLecturer = null;

let lecturerClasses = [];


/* =========================================================
   PAPAR MAKLUMAT PENSYARAH
========================================================= */

function displayLecturer(lecturer) {

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
   MESEJ STATUS
========================================================= */

function showMessage(
  text,
  type
) {

  sessionFormMessage.textContent =
    text;

  sessionFormMessage.className =
    `message show ${type}`;
}


function clearMessage() {

  sessionFormMessage.textContent =
    "";

  sessionFormMessage.className =
    "message";
}


/* =========================================================
   OPTION KELAS
========================================================= */

function createOption(classData) {

  const option =
    document.createElement(
      "option"
    );

  option.value =
    classData.id;

  option.textContent =
    `${classData.className} — ${classData.courseCode}`;

  return option;
}


/* =========================================================
   PAPAR SEMULA OPTION KELAS
========================================================= */

function renderClassOptions() {

  const currentValue =
    classSelect.value;

  classSelect.innerHTML =
    "";


  const defaultOption =
    document.createElement(
      "option"
    );

  defaultOption.value =
    "";

  defaultOption.textContent =
    t(
      "createSession.selectClass",
      "Pilih kelas"
    );

  classSelect.appendChild(
    defaultOption
  );


  lecturerClasses.forEach(
    (classData) => {

      classSelect.appendChild(
        createOption(
          classData
        )
      );
    }
  );


  if (
    lecturerClasses.length === 0
  ) {

    defaultOption.textContent =
      t(
        "createSession.noClasses",
        "Tiada kelas tersedia"
      );

    selectedCourseInfo.textContent =
      t(
        "createSession.createClassFirst",
        "Cipta kelas terlebih dahulu melalui Kelas Saya."
      );

    return;
  }


  if (
    lecturerClasses.some(
      (classData) =>
        classData.id ===
        currentValue
    )
  ) {

    classSelect.value =
      currentValue;

  } else {

    classSelect.value =
      "";
  }


  updateSelectedCourseInfo();
}


/* =========================================================
   DAPATKAN SENARAI KELAS
========================================================= */

async function loadLecturerClasses(
  lecturerId
) {

  classSelect.disabled =
    true;

  classSelect.innerHTML = `
    <option value="">
      ${t(
        "createSession.loadingClasses",
        "Sedang mendapatkan kelas..."
      )}
    </option>
  `;


  try {

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
      snapshot.docs
        .map(
          (classDocument) => ({
            id:
              classDocument.id,

            ...classDocument.data()
          })
        )
        .filter(
          (classData) =>
            classData.isActive !== false
        )
        .sort(
          (
            firstClass,
            secondClass
          ) =>
            (
              firstClass.className ||
              ""
            ).localeCompare(
              secondClass.className ||
              ""
            )
        );


    renderClassOptions();


  } catch (error) {

    console.error(
      "Kelas gagal diperoleh:",
      error
    );


    classSelect.innerHTML = `
      <option value="">
        ${t(
          "createSession.classesLoadFailed",
          "Kelas gagal diperoleh"
        )}
      </option>
    `;


    showMessage(
      t(
        "createSession.classesLoadError",
        "Kelas gagal diperoleh. Sila cuba semula."
      ),
      "error"
    );


  } finally {

    classSelect.disabled =
      false;
  }
}


/* =========================================================
   DAPATKAN KELAS YANG DIPILIH
========================================================= */

function getSelectedClass() {

  return lecturerClasses.find(
    (classData) =>
      classData.id ===
      classSelect.value
  );
}


/* =========================================================
   INFO KURSUS TERPILIH
========================================================= */

function updateSelectedCourseInfo() {

  const selectedClass =
    getSelectedClass();


  if (!selectedClass) {

    selectedCourseInfo.textContent =
      t(
        "createSession.courseInfoHelp",
        "Kod dan nama kursus akan diambil daripada kelas yang dipilih."
      );

    return;
  }


  selectedCourseInfo.textContent =
    `${selectedClass.courseCode || ""} — ` +
    `${selectedClass.courseName || ""}`;
}


/* =========================================================
   CIPTA MEDAN DINAMIK
========================================================= */

function createDynamicField(
  fieldType,
  className,
  placeholderKey,
  fallbackPlaceholder
) {

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    "dynamic-field";


  const field =
    document.createElement(
      fieldType
    );

  field.className =
    className;

  field.placeholder =
    t(
      placeholderKey,
      fallbackPlaceholder
    );

  field.dataset.i18nPlaceholder =
    placeholderKey;

  field.maxLength =
    fieldType === "textarea"
      ? 300
      : 150;

  field.required =
    false;


  const removeButton =
    document.createElement(
      "button"
    );

  removeButton.type =
    "button";

  removeButton.className =
    "remove-field-button";

  removeButton.textContent =
    "×";

  removeButton.setAttribute(
    "aria-label",
    t(
      "createSession.removeField",
      "Buang medan"
    )
  );


  removeButton.addEventListener(
    "click",
    () => {

      wrapper.remove();
    }
  );


  wrapper.append(
    field,
    removeButton
  );


  return wrapper;
}


/* =========================================================
   NILAI MEDAN DINAMIK
========================================================= */

function getFieldValues(
  selector
) {

  return [
    ...document.querySelectorAll(
      selector
    )
  ]
    .map(
      (field) =>
        field.value.trim()
    )
    .filter(Boolean);
}


/* =========================================================
   JANA KOD SESI
========================================================= */

function generateSessionCode(
  courseCodeValue,
  classNameValue
) {

  const randomCode =
    Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase();


  const cleanCourse =
    (courseCodeValue || "")
      .replace(
        /[^a-zA-Z0-9]/g,
        ""
      )
      .toUpperCase();


  const cleanClass =
    (classNameValue || "")
      .replace(
        /[^a-zA-Z0-9]/g,
        ""
      )
      .toUpperCase();


  return (
    `${cleanCourse}-` +
    `${cleanClass}-` +
    `${randomCode}`
  );
}


/* =========================================================
   CIPTA PAUTAN PELAJAR
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
   RESET MEDAN DINAMIK
========================================================= */

function resetDynamicFields() {

  subtopicContainer.innerHTML =
    "";


  const subtopicWrapper =
    document.createElement(
      "div"
    );

  subtopicWrapper.className =
    "dynamic-field";


  const subtopicInput =
    document.createElement(
      "input"
    );

  subtopicInput.type =
    "text";

  subtopicInput.className =
    "subtopic-input";

  subtopicInput.maxLength =
    150;

  subtopicInput.required =
    true;

  subtopicInput.placeholder =
    t(
      "createSession.subtopicPlaceholder",
      "Contoh: Data Integrity"
    );

  subtopicInput.dataset.i18nPlaceholder =
    "createSession.subtopicPlaceholder";


  subtopicWrapper.appendChild(
    subtopicInput
  );


  subtopicContainer.appendChild(
    subtopicWrapper
  );


  questionContainer.innerHTML =
    "";


  const questionWrapper =
    document.createElement(
      "div"
    );

  questionWrapper.className =
    "dynamic-field";


  const questionInput =
    document.createElement(
      "textarea"
    );

  questionInput.className =
    "question-input";

  questionInput.maxLength =
    300;

  questionInput.required =
    true;

  questionInput.placeholder =
    t(
      "createSession.questionPlaceholder",
      "Contoh: Terangkan maksud data integrity."
    );

  questionInput.dataset.i18nPlaceholder =
    "createSession.questionPlaceholder";


  questionWrapper.appendChild(
    questionInput
  );


  questionContainer.appendChild(
    questionWrapper
  );
}


/* =========================================================
   EVENT PILIH KELAS
========================================================= */

classSelect.addEventListener(
  "change",
  updateSelectedCourseInfo
);


/* =========================================================
   TAMBAH SUBTOPIK
========================================================= */

addSubtopicBtn.addEventListener(
  "click",
  () => {

    const totalSubtopics =
      document.querySelectorAll(
        ".subtopic-input"
      ).length;


    if (
      totalSubtopics >= 5
    ) {

      window.alert(
        t(
          "createSession.maxSubtopics",
          "Maksimum lima subtopik bagi satu sesi."
        )
      );

      return;
    }


    const field =
      createDynamicField(
        "input",
        "subtopic-input",
        "createSession.extraSubtopicPlaceholder",
        "Masukkan subtopik tambahan"
      );


    subtopicContainer.appendChild(
      field
    );


    field
      .querySelector("input")
      .focus();
  }
);


/* =========================================================
   TAMBAH SOALAN
========================================================= */

addQuestionBtn.addEventListener(
  "click",
  () => {

    const totalQuestions =
      document.querySelectorAll(
        ".question-input"
      ).length;


    if (
      totalQuestions >= 5
    ) {

      window.alert(
        t(
          "createSession.maxQuestions",
          "Maksimum lima soalan bagi satu sesi."
        )
      );

      return;
    }


    const field =
      createDynamicField(
        "textarea",
        "question-input",
        "createSession.extraQuestionPlaceholder",
        "Masukkan soalan tambahan"
      );


    questionContainer.appendChild(
      field
    );


    field
      .querySelector(
        "textarea"
      )
      .focus();
  }
);


/* =========================================================
   RESET BORANG
========================================================= */

resetSessionBtn.addEventListener(
  "click",
  () => {

    window.setTimeout(
      () => {

        resetDynamicFields();

        clearMessage();

        sessionResult
          .classList
          .add("hidden");


        selectedCourseInfo.textContent =
          t(
            "createSession.courseInfoHelp",
            "Kod dan nama kursus akan diambil daripada kelas yang dipilih."
          );


        sessionStatus.value =
          "active";

      },
      0
    );
  }
);


/* =========================================================
   CIPTA SESI
========================================================= */

sessionForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    clearMessage();


    if (
      !currentLecturer
    ) {

      showMessage(
        t(
          "createSession.noLecturerSession",
          "Sesi log masuk Pensyarah tidak ditemui."
        ),
        "error"
      );

      return;
    }


    const selectedClass =
      getSelectedClass();


    if (
      !selectedClass
    ) {

      showMessage(
        t(
          "createSession.selectClassError",
          "Sila pilih kelas."
        ),
        "error"
      );

      return;
    }


    const topicValue =
      topic.value.trim();


    if (
      !topicValue
    ) {

      showMessage(
        t(
          "createSession.topicRequired",
          "Sila masukkan topik."
        ),
        "error"
      );

      topic.focus();

      return;
    }


    const subtopics =
      getFieldValues(
        ".subtopic-input"
      );


    const questions =
      getFieldValues(
        ".question-input"
      );


    if (
      subtopics.length === 0
    ) {

      showMessage(
        t(
          "createSession.subtopicRequired",
          "Masukkan sekurang-kurangnya satu subtopik."
        ),
        "error"
      );

      return;
    }


    if (
      questions.length === 0
    ) {

      showMessage(
        t(
          "createSession.questionRequired",
          "Masukkan sekurang-kurangnya satu soalan."
        ),
        "error"
      );

      return;
    }


    if (
      ![
        "draft",
        "active"
      ].includes(
        sessionStatus.value
      )
    ) {

      showMessage(
        t(
          "createSession.invalidStatus",
          "Status sesi tidak sah."
        ),
        "error"
      );

      return;
    }


    saveSessionBtn.disabled =
      true;


    saveSessionBtn.textContent =
      t(
        "createSession.creating",
        "Sedang mencipta sesi..."
      );


    try {

      const sessionCode =
        generateSessionCode(
          selectedClass.courseCode,
          selectedClass.className
        );


      const sessionDocument =
        await addDoc(
          collection(
            db,
            "sessions"
          ),
          {

            lecturerId:
              currentLecturer.uid,

            lecturerName:
              currentLecturer.displayName ||
              t(
                "common.lecturer",
                "Pensyarah"
              ),

            classId:
              selectedClass.id,

            className:
              selectedClass.className,

            courseCode:
              selectedClass.courseCode,

            courseName:
              selectedClass.courseName,

            topic:
              topicValue,

            subtopics:
              subtopics,

            questions:
              questions,

            sessionCode:
              sessionCode,

            status:
              sessionStatus.value,

            responseCount:
              0,

            createdAt:
              serverTimestamp(),

            updatedAt:
              serverTimestamp()
          }
        );


      const studentLink =
        createStudentLink(
          sessionDocument.id
        );


      sessionCodeDisplay.textContent =
        sessionCode;


      studentSessionLink.value =
        studentLink;


      openStudentLink.href =
        studentLink;


      sessionResult
        .classList
        .remove("hidden");


      showMessage(
        t(
          "createSession.createdSuccess",
          "Sesi Exit Ticket berjaya dicipta."
        ),
        "success"
      );


      sessionResult.scrollIntoView({
        behavior:
          "smooth",

        block:
          "start"
      });


    } catch (error) {

      console.error(
        "Sesi gagal dicipta:",
        error
      );


      if (
        error.code ===
        "permission-denied"
      ) {

        showMessage(
          t(
            "createSession.permissionError",
            "Sesi tidak dapat dicipta kerana Firestore Security Rules menolak permintaan."
          ),
          "error"
        );

      } else {

        showMessage(
          `${t(
            "createSession.createError",
            "Sesi gagal dicipta"
          )}: ${
            error.code ||
            t(
              "common.error",
              "ralat"
            )
          }`,
          "error"
        );
      }


    } finally {

      saveSessionBtn.disabled =
        false;


      saveSessionBtn.textContent =
        t(
          "createSession.createButton",
          "Cipta Sesi"
        );
    }
  }
);


/* =========================================================
   SALIN PAUTAN SESI
========================================================= */

copySessionLinkBtn.addEventListener(
  "click",
  async () => {

    const link =
      studentSessionLink.value;


    if (!link) {
      return;
    }


    try {

      await navigator
        .clipboard
        .writeText(
          link
        );


      copySessionLinkBtn.textContent =
        t(
          "common.copied",
          "Sudah Disalin"
        );


      window.setTimeout(
        () => {

          copySessionLinkBtn.textContent =
            t(
              "createSession.copyLink",
              "Salin Pautan"
            );

        },
        1800
      );


    } catch (error) {

      studentSessionLink.select();


      document.execCommand(
        "copy"
      );


      copySessionLinkBtn.textContent =
        t(
          "common.copied",
          "Sudah Disalin"
        );


      window.setTimeout(
        () => {

          copySessionLinkBtn.textContent =
            t(
              "createSession.copyLink",
              "Salin Pautan"
            );

        },
        1800
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
      Update profil kerana alt gambar
      mengandungi teks bahasa.
    */

    if (currentLecturer) {

      displayLecturer(
        currentLecturer
      );
    }


    /*
      Dropdown kelas ialah kandungan
      yang dijana JavaScript.
    */

    renderClassOptions();


    /*
      Placeholder pada medan dinamik
      yang ditambah selepas halaman dimuat.
    */

    document
      .querySelectorAll(
        ".subtopic-input"
      )
      .forEach(
        (field, index) => {

          if (
            index === 0
          ) {

            field.placeholder =
              t(
                "createSession.subtopicPlaceholder",
                "Contoh: Data Integrity"
              );

          } else {

            field.placeholder =
              t(
                "createSession.extraSubtopicPlaceholder",
                "Masukkan subtopik tambahan"
              );
          }
        }
      );


    document
      .querySelectorAll(
        ".question-input"
      )
      .forEach(
        (field, index) => {

          if (
            index === 0
          ) {

            field.placeholder =
              t(
                "createSession.questionPlaceholder",
                "Contoh: Terangkan maksud data integrity."
              );

          } else {

            field.placeholder =
              t(
                "createSession.extraQuestionPlaceholder",
                "Masukkan soalan tambahan"
              );
          }
        }
      );


    /*
      Butang remove bagi medan dinamik.
    */

    document
      .querySelectorAll(
        ".remove-field-button"
      )
      .forEach(
        (button) => {

          button.setAttribute(
            "aria-label",
            t(
              "createSession.removeField",
              "Buang medan"
            )
          );
        }
      );


    /*
      Jika butang tidak sedang dalam
      keadaan loading.
    */

    if (
      !saveSessionBtn.disabled
    ) {

      saveSessionBtn.textContent =
        t(
          "createSession.createButton",
          "Cipta Sesi"
        );
    }


    if (
      copySessionLinkBtn.textContent !==
      t(
        "common.copied",
        "Sudah Disalin"
      )
    ) {

      copySessionLinkBtn.textContent =
        t(
          "createSession.copyLink",
          "Salin Pautan"
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


    await loadLecturerClasses(
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