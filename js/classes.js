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
   BUTANG & BORANG
========================================================= */

const showClassFormBtn =
  document.getElementById("showClassFormBtn");

const classFormPanel =
  document.getElementById("classFormPanel");

const classForm =
  document.getElementById("classForm");

const classFormTitle =
  document.getElementById("classFormTitle");

const editingClassId =
  document.getElementById("editingClassId");

const className =
  document.getElementById("className");

const courseCode =
  document.getElementById("courseCode");

const courseName =
  document.getElementById("courseName");

const classStatus =
  document.getElementById("classStatus");

const cancelClassBtn =
  document.getElementById("cancelClassBtn");

const saveClassBtn =
  document.getElementById("saveClassBtn");

const classMessage =
  document.getElementById("classMessage");


/* =========================================================
   RINGKASAN
========================================================= */

const totalClassCount =
  document.getElementById("totalClassCount");

const activeClassCount =
  document.getElementById("activeClassCount");

const inactiveClassCount =
  document.getElementById("inactiveClassCount");


/* =========================================================
   SENARAI KELAS
========================================================= */

const classesLoading =
  document.getElementById("classesLoading");

const noClassesPanel =
  document.getElementById("noClassesPanel");

const classList =
  document.getElementById("classList");


/* =========================================================
   DATA GLOBAL
========================================================= */

let currentLecturer = null;

let lecturerClasses = [];


/* =========================================================
   PAPAR PROFIL PENSYARAH
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
   MESEJ
========================================================= */

function showMessage(
  text,
  type
) {

  classMessage.textContent =
    text;

  classMessage.className =
    `message show ${type}`;
}


function clearMessage() {

  classMessage.textContent =
    "";

  classMessage.className =
    "message";
}


/* =========================================================
   STATUS KELAS
========================================================= */

function getClassStatusLabel(
  isActive
) {

  return isActive
    ? t(
        "classes.statusActive",
        "Aktif"
      )
    : t(
        "classes.statusInactive",
        "Tidak Aktif"
      );
}


/* =========================================================
   PAPAR / SEMBUNYI BORANG
========================================================= */

function openClassForm(
  mode = "add"
) {

  clearMessage();

  classFormPanel.classList.remove(
    "hidden"
  );

  if (mode === "add") {

    classForm.reset();

    editingClassId.value =
      "";

    classStatus.value =
      "active";

    classFormTitle.textContent =
      t(
        "classes.formAddTitle",
        "Tambah Kelas"
      );

    saveClassBtn.textContent =
      t(
        "classes.saveClass",
        "Simpan Kelas"
      );

  }

  className.focus();

  classFormPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


function closeClassForm() {

  classForm.reset();

  editingClassId.value =
    "";

  classStatus.value =
    "active";

  classFormPanel.classList.add(
    "hidden"
  );

  clearMessage();
}


/* =========================================================
   KEMAS KINI RINGKASAN
========================================================= */

function updateClassSummary() {

  const total =
    lecturerClasses.length;

  const active =
    lecturerClasses.filter(
      (classData) =>
        classData.isActive !== false
    ).length;

  const inactive =
    lecturerClasses.filter(
      (classData) =>
        classData.isActive === false
    ).length;


  totalClassCount.textContent =
    total;

  activeClassCount.textContent =
    active;

  inactiveClassCount.textContent =
    inactive;
}


/* =========================================================
   CIPTA KAD KELAS
========================================================= */

function createClassCard(
  classData
) {

  const card =
    document.createElement(
      "article"
    );

  card.className =
    "class-card";

  card.dataset.status =
    classData.isActive !== false
      ? "active"
      : "inactive";


  /* -----------------------------------------
     HEADER
  ----------------------------------------- */

  const header =
    document.createElement(
      "div"
    );

  header.className =
    "class-card-header";


  const titleArea =
    document.createElement(
      "div"
    );


  const title =
    document.createElement(
      "h3"
    );

  title.textContent =
    classData.className ||
    "-";


  const subtitle =
    document.createElement(
      "p"
    );

  subtitle.textContent =
    [
      classData.courseCode,
      classData.courseName
    ]
      .filter(Boolean)
      .join(" — ");


  titleArea.append(
    title,
    subtitle
  );


  const statusBadge =
    document.createElement(
      "span"
    );

  statusBadge.className =
    "class-status-badge";

  statusBadge.dataset.status =
    classData.isActive !== false
      ? "active"
      : "inactive";

  statusBadge.textContent =
    getClassStatusLabel(
      classData.isActive !== false
    );


  header.append(
    titleArea,
    statusBadge
  );


  /* -----------------------------------------
     MAKLUMAT
  ----------------------------------------- */

  const info =
    document.createElement(
      "div"
    );

  info.className =
    "class-card-info";


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
      "classes.courseCode",
      "Kod Kursus"
    );

  const codeValue =
    document.createElement(
      "strong"
    );

  codeValue.textContent =
    classData.courseCode ||
    "-";

  codeBlock.append(
    codeLabel,
    codeValue
  );


  const courseBlock =
    document.createElement(
      "div"
    );

  const courseLabel =
    document.createElement(
      "span"
    );

  courseLabel.textContent =
    t(
      "classes.courseName",
      "Nama Kursus"
    );

  const courseValue =
    document.createElement(
      "strong"
    );

  courseValue.textContent =
    classData.courseName ||
    "-";

  courseBlock.append(
    courseLabel,
    courseValue
  );


  info.append(
    codeBlock,
    courseBlock
  );


  /* -----------------------------------------
     ACTIONS
  ----------------------------------------- */

  const actions =
    document.createElement(
      "div"
    );

  actions.className =
    "class-card-actions";


  const editButton =
    document.createElement(
      "button"
    );

  editButton.type =
    "button";

  editButton.className =
    "secondary-button";

  editButton.textContent =
    t(
      "classes.edit",
      "Edit"
    );

  editButton.addEventListener(
    "click",
    () => {

      startEditClass(
        classData
      );
    }
  );


  const deleteButton =
    document.createElement(
      "button"
    );

  deleteButton.type =
    "button";

  deleteButton.className =
    "danger-button";

  deleteButton.textContent =
    t(
      "common.delete",
      "Padam"
    );

  deleteButton.addEventListener(
    "click",
    () => {

      deleteClass(
        classData
      );
    }
  );


  actions.append(
    editButton,
    deleteButton
  );


  card.append(
    header,
    info,
    actions
  );


  return card;
}


/* =========================================================
   PAPAR SENARAI KELAS
========================================================= */

function displayClasses() {

  classList.innerHTML =
    "";


  if (
    lecturerClasses.length === 0
  ) {

    noClassesPanel.classList.remove(
      "hidden"
    );

    return;
  }


  noClassesPanel.classList.add(
    "hidden"
  );


  lecturerClasses.forEach(
    (classData) => {

      classList.appendChild(
        createClassCard(
          classData
        )
      );
    }
  );
}


/* =========================================================
   DAPATKAN KELAS DARIPADA FIRESTORE
========================================================= */

async function loadClasses(
  lecturerId
) {

  classesLoading.classList.remove(
    "hidden"
  );

  noClassesPanel.classList.add(
    "hidden"
  );

  classList.innerHTML =
    "";


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
      snapshot.docs.map(
        (classDocument) => ({
          id:
            classDocument.id,

          ...classDocument.data()
        })
      );


    lecturerClasses.sort(
      (firstClass, secondClass) => {

        const firstName =
          firstClass.className || "";

        const secondName =
          secondClass.className || "";

        return firstName.localeCompare(
          secondName
        );
      }
    );


    updateClassSummary();

    displayClasses();


  } catch (error) {

    console.error(
      "Kelas gagal diperoleh:",
      error
    );


    showMessage(
      t(
        "classes.loadError",
        "Kelas gagal diperoleh."
      ),
      "error"
    );


  } finally {

    classesLoading.classList.add(
      "hidden"
    );
  }
}


/* =========================================================
   TAMBAH KELAS
========================================================= */

async function createNewClass() {

  const classNameValue =
    className.value.trim();

  const courseCodeValue =
    courseCode.value
      .trim()
      .toUpperCase();

  const courseNameValue =
    courseName.value.trim();

  const isActive =
    classStatus.value ===
    "active";


  const classDocument =
    await addDoc(
      collection(
        db,
        "classes"
      ),
      {
        lecturerId:
          currentLecturer.uid,

        className:
          classNameValue,

        courseCode:
          courseCodeValue,

        courseName:
          courseNameValue,

        isActive:
          isActive,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp()
      }
    );


  lecturerClasses.push(
    {
      id:
        classDocument.id,

      lecturerId:
        currentLecturer.uid,

      className:
        classNameValue,

      courseCode:
        courseCodeValue,

      courseName:
        courseNameValue,

      isActive:
        isActive
    }
  );


  lecturerClasses.sort(
    (firstClass, secondClass) =>
      firstClass.className.localeCompare(
        secondClass.className
      )
  );


  updateClassSummary();

  displayClasses();


  closeClassForm();


  showMessage(
    t(
      "classes.createSuccess",
      "Kelas berjaya ditambah."
    ),
    "success"
  );
}


/* =========================================================
   MULAKAN EDIT
========================================================= */

function startEditClass(
  classData
) {

  clearMessage();


  editingClassId.value =
    classData.id;


  className.value =
    classData.className ||
    "";


  courseCode.value =
    classData.courseCode ||
    "";


  courseName.value =
    classData.courseName ||
    "";


  classStatus.value =
    classData.isActive === false
      ? "inactive"
      : "active";


  classFormTitle.textContent =
    t(
      "classes.formEditTitle",
      "Edit Kelas"
    );


  saveClassBtn.textContent =
    t(
      "classes.updateClass",
      "Kemas Kini Kelas"
    );


  classFormPanel.classList.remove(
    "hidden"
  );


  classFormPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  className.focus();
}


/* =========================================================
   KEMAS KINI KELAS
========================================================= */

async function updateExistingClass(
  classId
) {

  const classData =
    lecturerClasses.find(
      (item) =>
        item.id ===
        classId
    );


  if (!classData) {

    throw new Error(
      "class-not-found"
    );
  }


  const classNameValue =
    className.value.trim();

  const courseCodeValue =
    courseCode.value
      .trim()
      .toUpperCase();

  const courseNameValue =
    courseName.value.trim();

  const isActive =
    classStatus.value ===
    "active";


  await updateDoc(
    doc(
      db,
      "classes",
      classId
    ),
    {
      className:
        classNameValue,

      courseCode:
        courseCodeValue,

      courseName:
        courseNameValue,

      isActive:
        isActive,

      updatedAt:
        serverTimestamp()
    }
  );


  classData.className =
    classNameValue;

  classData.courseCode =
    courseCodeValue;

  classData.courseName =
    courseNameValue;

  classData.isActive =
    isActive;


  lecturerClasses.sort(
    (firstClass, secondClass) =>
      firstClass.className.localeCompare(
        secondClass.className
      )
  );


  updateClassSummary();

  displayClasses();


  closeClassForm();


  showMessage(
    t(
      "classes.updateSuccess",
      "Kelas berjaya dikemas kini."
    ),
    "success"
  );
}


/* =========================================================
   SIMPAN BORANG
========================================================= */

classForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    clearMessage();


    if (!currentLecturer) {

      showMessage(
        t(
          "classes.noLecturerSession",
          "Sesi log masuk Pensyarah tidak ditemui."
        ),
        "error"
      );

      return;
    }


    const classNameValue =
      className.value.trim();

    const courseCodeValue =
      courseCode.value.trim();

    const courseNameValue =
      courseName.value.trim();


    if (
      !classNameValue ||
      !courseCodeValue ||
      !courseNameValue
    ) {

      showMessage(
        t(
          "classes.requiredFields",
          "Sila lengkapkan semua maklumat kelas."
        ),
        "error"
      );

      return;
    }


    saveClassBtn.disabled =
      true;


    saveClassBtn.textContent =
      t(
        "classes.saving",
        "Sedang menyimpan..."
      );


    try {

      const classId =
        editingClassId.value;


      if (classId) {

        await updateExistingClass(
          classId
        );

      } else {

        await createNewClass();
      }


    } catch (error) {

      console.error(
        "Kelas gagal disimpan:",
        error
      );


      showMessage(
        t(
          "classes.saveError",
          "Kelas gagal disimpan. Sila cuba semula."
        ),
        "error"
      );


    } finally {

      saveClassBtn.disabled =
        false;


      if (
        editingClassId.value
      ) {

        saveClassBtn.textContent =
          t(
            "classes.updateClass",
            "Kemas Kini Kelas"
          );

      } else {

        saveClassBtn.textContent =
          t(
            "classes.saveClass",
            "Simpan Kelas"
          );
      }
    }
  }
);


/* =========================================================
   PADAM KELAS
========================================================= */

async function deleteClass(
  classData
) {

  clearMessage();


  const confirmed =
    window.confirm(
      t(
        "classes.deleteConfirm",
        `Adakah anda pasti mahu memadam kelas "${classData.className}"?`
      ).replace(
        "{className}",
        classData.className
      )
    );


  if (!confirmed) {
    return;
  }


  try {

    await deleteDoc(
      doc(
        db,
        "classes",
        classData.id
      )
    );


    lecturerClasses =
      lecturerClasses.filter(
        (item) =>
          item.id !==
          classData.id
      );


    updateClassSummary();

    displayClasses();


    showMessage(
      t(
        "classes.deleteSuccess",
        "Kelas berjaya dipadam."
      ),
      "success"
    );


  } catch (error) {

    console.error(
      "Kelas gagal dipadam:",
      error
    );


    showMessage(
      t(
        "classes.deleteError",
        "Kelas gagal dipadam."
      ),
      "error"
    );
  }
}


/* =========================================================
   EVENT BUTANG
========================================================= */

showClassFormBtn.addEventListener(
  "click",
  () => {

    openClassForm(
      "add"
    );
  }
);


cancelClassBtn.addEventListener(
  "click",
  () => {

    closeClassForm();
  }
);


/* =========================================================
   APABILA BAHASA BERUBAH
========================================================= */

document.addEventListener(
  "languagechange",
  () => {

    /*
      Kad kelas ialah kandungan dinamik.
      Jadi bina semula apabila bahasa berubah.
    */

    displayClasses();


    /*
      Pastikan tajuk dan butang borang
      ikut mode semasa.
    */

    if (
      editingClassId.value
    ) {

      classFormTitle.textContent =
        t(
          "classes.formEditTitle",
          "Edit Kelas"
        );

      saveClassBtn.textContent =
        t(
          "classes.updateClass",
          "Kemas Kini Kelas"
        );

    } else {

      classFormTitle.textContent =
        t(
          "classes.formAddTitle",
          "Tambah Kelas"
        );

      saveClassBtn.textContent =
        t(
          "classes.saveClass",
          "Simpan Kelas"
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


    await loadClasses(
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