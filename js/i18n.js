/* =========================================================
   SMART EXIT TICKET - INTERNATIONALIZATION
   Bahasa Melayu + English
========================================================= */

const STORAGE_KEY =
  "smartExitTicketLanguage";

const DEFAULT_LANGUAGE =
  "ms";


/* =========================================================
   KAMUS TERJEMAHAN
========================================================= */

const translations = {

  /* =======================================================
     BAHASA MELAYU
  ======================================================= */

  ms: {

    /* -----------------------------------------------------
       APLIKASI
    ----------------------------------------------------- */

    "app.name":
      "Smart Exit Ticket",

    "app.lecturerPortal":
      "Portal Pensyarah",

    "app.studentPortal":
      "Portal Pelajar",


    /* -----------------------------------------------------
       HALAMAN UTAMA / INDEX
    ----------------------------------------------------- */

    "home.label":
      "REFLEKSI PEMBELAJARAN",

    "home.description":
      "Kenal pasti tahap kefahaman pelajar dengan cepat, tersusun dan berkesan.",

    "home.lecturerLoginTitle":
      "Log Masuk Pensyarah",

    "home.lecturerLoginDescription":
      "Gunakan akaun Google untuk mengurus kelas, mencipta sesi dan melihat analisis respons.",

    "home.continueGoogle":
      "Teruskan dengan Google",

    "home.studentTitle":
      "Untuk Pelajar",

    "home.studentDescription":
      "Imbas kod QR atau buka pautan yang diberikan oleh pensyarah untuk menjawab Exit Ticket.",


    /* -----------------------------------------------------
       BAHASA
    ----------------------------------------------------- */

    "language.ms":
      "BM",

    "language.en":
      "EN",


    /* -----------------------------------------------------
       NAVIGASI
    ----------------------------------------------------- */

    "nav.dashboard":
      "Dashboard",

    "nav.classes":
      "Kelas Saya",

    "nav.createSession":
      "Cipta Sesi",

    "nav.manageSessions":
      "Pengurusan Sesi",

    "nav.responses":
      "Respons dan Analisis",

    "nav.logout":
      "Log Keluar",


    /* -----------------------------------------------------
       UMUM
    ----------------------------------------------------- */

    "common.lecturer":
      "Pensyarah",

    "common.profilePhoto":
      "Gambar profil",

    "common.search":
      "Cari",

    "common.status":
      "Status",

    "common.active":
      "Aktif",

    "common.inactive":
      "Tidak Aktif",

    "common.draft":
      "Draf",

    "common.closed":
      "Ditutup",

    "common.archived":
      "Diarkib",

    "common.cancel":
      "Batal",

    "common.delete":
      "Padam",

    "common.edit":
      "Edit",

    "common.copy":
      "Salin",

    "common.copied":
      "Sudah Disalin",

    "common.loading":
      "Sedang memuatkan...",

    "common.error":
      "Ralat",

    "common.success":
      "Berjaya",

    "common.yes":
      "Ya",

    "common.no":
      "Tidak",

    "common.save":
      "Simpan",

    "common.update":
      "Kemas Kini",

    "common.view":
      "Lihat",

    "common.open":
      "Buka",


    /* -----------------------------------------------------
       STATUS SESI
    ----------------------------------------------------- */

    "session.status.active":
      "Aktif",

    "session.status.draft":
      "Draf",

    "session.status.closed":
      "Ditutup",

    "session.status.archived":
      "Diarkib",


    /* -----------------------------------------------------
       RESPONS
    ----------------------------------------------------- */

    "response.single":
      "respons",

    "response.plural":
      "respons",


    /* -----------------------------------------------------
       DASHBOARD
    ----------------------------------------------------- */

    "dashboard.label":
      "DASHBOARD",

    "dashboard.welcome":
      "Selamat datang",

    "dashboard.description":
      "Urus kelas dan pantau tahap kefahaman pelajar daripada satu tempat.",

    "dashboard.totalClasses":
      "Jumlah Kelas",

    "dashboard.activeSessions":
      "Sesi Aktif",

    "dashboard.totalResponses":
      "Jumlah Respons",

    "dashboard.recentSessions":
      "Sesi Terkini",

    "dashboard.recentDescription":
      "Paparan sehingga lima sesi Exit Ticket yang paling terkini.",

    "dashboard.viewAll":
      "Lihat semua",

    "dashboard.createNewSession":
      "+ Cipta Sesi Baharu",

    "dashboard.noSessions":
      "Belum ada sesi",

    "dashboard.noSessionsDescription":
      "Cipta kelas dan sesi Exit Ticket pertama untuk mula menerima respons pelajar.",


    /* -----------------------------------------------------
       KELAS SAYA
    ----------------------------------------------------- */

    "classes.label":
      "PENGURUSAN KELAS",

    "classes.title":
      "Kelas Saya",

    "classes.description":
      "Urus kelas yang digunakan untuk sesi Exit Ticket.",

    "classes.addClass":
      "+ Tambah Kelas",

    "classes.formAddTitle":
      "Tambah Kelas",

    "classes.formEditTitle":
      "Edit Kelas",

    "classes.formDescription":
      "Masukkan maklumat kelas yang akan digunakan dalam sesi Exit Ticket.",

    "classes.className":
      "Nama Kelas",

    "classes.classNamePlaceholder":
      "Contoh: D2T2",

    "classes.courseCode":
      "Kod Kursus",

    "classes.courseCodePlaceholder":
      "Contoh: DC014",

    "classes.courseName":
      "Nama Kursus",

    "classes.courseNamePlaceholder":
      "Contoh: Computer Science 1",

    "classes.classStatus":
      "Status Kelas",

    "classes.statusActive":
      "Aktif",

    "classes.statusInactive":
      "Tidak Aktif",

    "classes.statusHelp":
      "Kelas tidak aktif tidak akan dipaparkan semasa mencipta sesi baharu.",

    "classes.saveClass":
      "Simpan Kelas",

    "classes.updateClass":
      "Kemas Kini Kelas",

    "classes.totalClasses":
      "Jumlah Kelas",

    "classes.activeClasses":
      "Kelas Aktif",

    "classes.inactiveClasses":
      "Tidak Aktif",

    "classes.classList":
      "Senarai Kelas",

    "classes.classListDescription":
      "Lihat, edit atau padam kelas yang telah dicipta.",

    "classes.loading":
      "Sedang mendapatkan kelas",

    "classes.noClasses":
      "Belum ada kelas",

    "classes.noClassesDescription":
      "Tambah kelas pertama untuk mula mencipta sesi Exit Ticket.",

    "classes.edit":
      "Edit",

    "classes.saving":
      "Sedang menyimpan...",

    "classes.loadError":
      "Kelas gagal diperoleh.",

    "classes.createSuccess":
      "Kelas berjaya ditambah.",

    "classes.updateSuccess":
      "Kelas berjaya dikemas kini.",

    "classes.deleteSuccess":
      "Kelas berjaya dipadam.",

    "classes.saveError":
      "Kelas gagal disimpan. Sila cuba semula.",

    "classes.deleteError":
      "Kelas gagal dipadam.",

    "classes.noLecturerSession":
      "Sesi log masuk Pensyarah tidak ditemui.",

    "classes.requiredFields":
      "Sila lengkapkan semua maklumat kelas.",

    "classes.deleteConfirm":
      "Adakah anda pasti mahu memadam kelas \"{className}\"?",


    /* -----------------------------------------------------
       CIPTA SESI
    ----------------------------------------------------- */

    "createSession.label":
      "EXIT TICKET",

    "createSession.title":
      "Cipta Sesi Baharu",

    "createSession.description":
      "Tetapkan kelas, topik dan soalan sebelum berkongsi pautan dengan pelajar.",

    "createSession.createButton":
      "Cipta Sesi",

    "createSession.clearButton":
      "Kosongkan Borang",

    "createSession.classInfo":
      "Maklumat Kelas",

    "createSession.classInfoDescription":
      "Pilih kelas untuk sesi ini.",

    "createSession.classLabel":
      "Kelas",

    "createSession.selectClass":
      "Pilih kelas",

    "createSession.loadingClasses":
      "Sedang mendapatkan kelas...",

    "createSession.noClasses":
      "Tiada kelas tersedia",

    "createSession.createClassFirst":
      "Cipta kelas terlebih dahulu melalui Kelas Saya.",

    "createSession.classesLoadFailed":
      "Kelas gagal diperoleh",

    "createSession.classesLoadError":
      "Kelas gagal diperoleh. Sila cuba semula.",

    "createSession.courseInfoHelp":
      "Kod dan nama kursus akan diambil daripada kelas yang dipilih.",

    "createSession.topicSection":
      "Topik Pembelajaran",

    "createSession.topicDescription":
      "Nyatakan topik dan subtopik yang telah dipelajari.",

    "createSession.topic":
      "Topik",

    "createSession.topicPlaceholder":
      "Contoh: Fundamental of Database System",

    "createSession.subtopic":
      "Subtopik",

    "createSession.subtopicPlaceholder":
      "Contoh: Data Integrity",

    "createSession.extraSubtopicPlaceholder":
      "Masukkan subtopik tambahan",

    "createSession.addSubtopic":
      "+ Tambah Subtopik",

    "createSession.questionsSection":
      "Soalan Pensyarah",

    "createSession.questionsDescription":
      "Tambahkan soalan ringkas untuk dijawab oleh pelajar.",

    "createSession.additionalQuestion":
      "Soalan Tambahan",

    "createSession.questionPlaceholder":
      "Contoh: Terangkan maksud data integrity.",

    "createSession.extraQuestionPlaceholder":
      "Masukkan soalan tambahan",

    "createSession.addQuestion":
      "+ Tambah Soalan",

    "createSession.systemQuestionsInfo":
      "Sistem juga akan bertanya tahap kefahaman, perkara yang telah difahami dan perkara yang masih belum difahami.",

    "createSession.sessionStatus":
      "Status Sesi",

    "createSession.statusDescription":
      "Tentukan sama ada sesi boleh dijawab oleh Pelajar.",

    "createSession.statusActive":
      "Aktif — Pelajar boleh menjawab",

    "createSession.statusDraft":
      "Draf — belum dibuka kepada Pelajar",

    "createSession.statusHelp":
      "Sesi aktif boleh dijawab sebaik sahaja pautan atau kod QR dikongsikan. Tutup sesi selepas semua Pelajar selesai menjawab.",

    "createSession.removeField":
      "Buang medan",

    "createSession.maxSubtopics":
      "Maksimum lima subtopik bagi satu sesi.",

    "createSession.maxQuestions":
      "Maksimum lima soalan bagi satu sesi.",

    "createSession.noLecturerSession":
      "Sesi log masuk Pensyarah tidak ditemui.",

    "createSession.selectClassError":
      "Sila pilih kelas.",

    "createSession.topicRequired":
      "Sila masukkan topik.",

    "createSession.subtopicRequired":
      "Masukkan sekurang-kurangnya satu subtopik.",

    "createSession.questionRequired":
      "Masukkan sekurang-kurangnya satu soalan.",

    "createSession.invalidStatus":
      "Status sesi tidak sah.",

    "createSession.creating":
      "Sedang mencipta sesi...",

    "createSession.createdSuccess":
      "Sesi Exit Ticket berjaya dicipta.",

    "createSession.permissionError":
      "Sesi tidak dapat dicipta kerana Firestore Security Rules menolak permintaan.",

    "createSession.createError":
      "Sesi gagal dicipta",

    "createSession.successLabel":
      "SESI BERJAYA DICIPTA",

    "createSession.studentLinkTitle":
      "Pautan Exit Ticket Pelajar",

    "createSession.studentLinkDescription":
      "Kongsi pautan ini dengan pelajar melalui Google Classroom atau kod QR.",

    "createSession.sessionCode":
      "Kod Sesi",

    "createSession.copyLink":
      "Salin Pautan",

    "createSession.openStudentForm":
      "Lihat Borang Pelajar",


    /* -----------------------------------------------------
       PENGURUSAN SESI
    ----------------------------------------------------- */

    "manageSessions.label":
      "PENGURUSAN SESI",

    "manageSessions.title":
      "Urus Sesi Exit Ticket",

    "manageSessions.description":
      "Aktifkan, tutup, arkib atau padam sesi Exit Ticket yang telah dicipta.",

    "manageSessions.createNew":
      "+ Cipta Sesi Baharu",

    "manageSessions.filter":
      "Tapis Sesi",

    "manageSessions.filterDescription":
      "Pilih status atau cari sesi tertentu.",

    "manageSessions.sessionList":
      "Senarai Sesi",

    "manageSessions.sessionListDescription":
      "Urus setiap sesi daripada senarai di bawah.",

    "manageSessions.allSessions":
      "Semua Sesi",

    "manageSessions.active":
      "Aktif",

    "manageSessions.draft":
      "Draf",

    "manageSessions.closed":
      "Ditutup",

    "manageSessions.archived":
      "Diarkib",

    "manageSessions.searchPlaceholder":
      "Cari topik, kelas atau kod sesi...",

    "manageSessions.totalSessions":
      "Jumlah Sesi",

    "manageSessions.activeSessions":
      "Aktif",

    "manageSessions.draftSessions":
      "Draf",

    "manageSessions.closedSessions":
      "Ditutup",

    "manageSessions.archivedSessions":
      "Diarkib",

    "manageSessions.loadingTitle":
      "Sedang mendapatkan sesi",

    "manageSessions.noSessions":
      "Tiada sesi ditemui",

    "manageSessions.noSessionsDescription":
      "Tiada sesi yang sepadan dengan pilihan atau carian anda.",

    "manageSessions.sessionCode":
      "Kod Sesi",

    "manageSessions.totalResponses":
      "Jumlah Respons",

    "manageSessions.createdAt":
      "Dicipta",

    "manageSessions.subtopic":
      "Subtopik",

    "manageSessions.studentLink":
      "Pautan Pelajar",

    "manageSessions.copyLink":
      "Salin Pautan",

    "manageSessions.openStudentForm":
      "Buka Borang Pelajar",

    "manageSessions.viewAnalysis":
      "Lihat Analisis",

    "manageSessions.closeSession":
      "Tutup Sesi",

    "manageSessions.activate":
      "Aktifkan",

    "manageSessions.reactivate":
      "Aktifkan Semula",

    "manageSessions.archive":
      "Arkibkan",

    "manageSessions.unarchive":
      "Keluarkan dari Arkib",

    "manageSessions.delete":
      "Padam",

    "manageSessions.noTopic":
      "Tanpa topik",

    "manageSessions.changeStatusConfirm":
      "Tukar status sesi \"{topic}\" daripada {oldStatus} kepada {newStatus}?",

    "manageSessions.statusUpdateSuccess":
      "Status sesi berjaya ditukar kepada {status}.",

    "manageSessions.statusUpdateError":
      "Status sesi gagal dikemas kini.",

    "manageSessions.deleteConfirm":
      "Adakah anda pasti mahu memadam sesi \"{topic}\"?",

    "manageSessions.deleteResponseWarning":
      "Sesi ini mempunyai {count} respons Pelajar. Respons tersebut TIDAK akan dipadam secara automatik.",

    "manageSessions.deleteIrreversible":
      "Tindakan ini tidak boleh dibatalkan.",

    "manageSessions.deleteFinalConfirm":
      "Pengesahan akhir: Adakah anda benar-benar mahu memadam sesi ini?",

    "manageSessions.deleteSuccess":
      "Sesi berjaya dipadam.",

    "manageSessions.deleteError":
      "Sesi gagal dipadam.",

    "manageSessions.loadError":
      "Sesi gagal diperoleh.",

    "manageSessions.initialiseError":
      "Maklumat sesi gagal diperoleh.",


    /* -----------------------------------------------------
       RESPONS DAN ANALISIS
    ----------------------------------------------------- */

    "responses.label":
      "ANALISIS EXIT TICKET",

    "responses.title":
      "Respons dan Analisis",

    "responses.description":
      "Pantau tahap kefahaman pelajar berdasarkan respons Exit Ticket yang telah dihantar.",

    "responses.totalSessions":
      "Jumlah Sesi",

    "responses.totalResponses":
      "Jumlah Respons",

    "responses.selectSession":
      "Pilih Sesi",

    "responses.selectSessionDescription":
      "Pilih sesi Exit Ticket untuk melihat analisis dan respons pelajar.",

    "responses.selectSessionOption":
      "Pilih sesi Exit Ticket",

    "responses.loadingTitle":
      "Sedang mendapatkan respons",

    "responses.noSessions":
      "Tiada sesi ditemui",

    "responses.noSessionsDescription":
      "Cipta sesi Exit Ticket terlebih dahulu untuk melihat respons dan analisis.",

    "responses.sessionInfo":
      "Maklumat Sesi",

    "responses.sessionInfoDescription":
      "Ringkasan sesi Exit Ticket yang sedang dipilih.",

    "responses.topic":
      "Topik",

    "responses.class":
      "Kelas",

    "responses.course":
      "Kursus",

    "responses.sessionCode":
      "Kod Sesi",

    "responses.analysis":
      "Analisis Tahap Kefahaman",

    "responses.analysisDescription":
      "Ringkasan tahap kefahaman berdasarkan respons pelajar.",

    "responses.understand":
      "Faham",

    "responses.partial":
      "Faham Sebahagian",

    "responses.notUnderstand":
      "Belum Faham",

    "responses.notUnderstood":
      "Perkara yang Masih Belum Difahami",

    "responses.notUnderstoodDescription":
      "Refleksi pelajar tentang perkara yang masih memerlukan penjelasan.",

    "responses.noNotUnderstood":
      "Tiada isu utama direkodkan",

    "responses.noNotUnderstoodDescription":
      "Tiada refleksi berkaitan perkara yang masih belum difahami untuk sesi ini.",

    "responses.studentResponses":
      "Respons Pelajar",

    "responses.studentResponsesDescription":
      "Lihat jawapan individu yang dihantar oleh pelajar.",

    "responses.searchStudent":
      "Cari Pelajar",

    "responses.searchPlaceholder":
      "Cari nama atau nombor matrik...",

    "responses.noResponses":
      "Belum ada respons",

    "responses.noResponsesDescription":
      "Belum ada pelajar menghantar Exit Ticket untuk sesi ini.",

    "responses.noSearchResults":
      "Tiada pelajar ditemui",

    "responses.noSearchResultsDescription":
      "Tiada respons yang sepadan dengan carian anda.",

    "responses.unknownStudent":
      "Pelajar",

    "responses.submittedAt":
      "Dihantar",

    "responses.whatUnderstood":
      "Apa yang telah difahami",

    "responses.whatNotUnderstood":
      "Apa yang masih belum difahami",

    "responses.questionAnswers":
      "Jawapan Soalan",

    "responses.question":
      "Soalan",

    "responses.noQuestionAnswers":
      "Tiada jawapan soalan.",

    "responses.loadError":
      "Respons dan analisis gagal dimuatkan. Sila cuba semula.",


    /* -----------------------------------------------------
       PELAJAR
    ----------------------------------------------------- */

    "student.exitTicket":
      "EXIT TICKET",

    "student.pageTitle":
      "Refleksi Pembelajaran",

    "student.pageDescription":
      "Lengkapkan Exit Ticket ini sebelum meninggalkan sesi pembelajaran.",

    "student.loadingTitle":
      "Sedang mendapatkan sesi",

    "student.loadingDescription":
      "Sila tunggu sebentar...",

    "student.sessionInformation":
      "MAKLUMAT SESI",

    "student.course":
      "Kursus",

    "student.class":
      "Kelas",

    "student.sessionCode":
      "Kod Sesi",

    "student.subtopics":
      "Subtopik",

    "student.noSubtopics":
      "Tiada subtopik.",

    "student.studentInfo":
      "Maklumat Pelajar",

    "student.studentInfoDescription":
      "Masukkan nama dan nombor matrik anda.",

    "student.fullName":
      "Nama Penuh",

    "student.fullNamePlaceholder":
      "Masukkan nama penuh",

    "student.matricNumber":
      "Nombor Matrik",

    "student.matricPlaceholder":
      "Contoh: MS2512345678",

    "student.matricHelp":
      "Pastikan nombor matrik betul. Setiap nombor matrik hanya boleh menghantar satu respons bagi sesi ini.",

    "student.understandingLevel":
      "Tahap Kefahaman",

    "student.understandingDescription":
      "Pilih tahap kefahaman anda selepas sesi pembelajaran ini.",

    "student.understand":
      "Saya faham",

    "student.understandDescription":
      "Saya dapat memahami kandungan pembelajaran dengan baik.",

    "student.partial":
      "Faham sebahagian",

    "student.partialDescription":
      "Saya memahami sebahagian kandungan tetapi masih memerlukan penjelasan.",

    "student.notUnderstand":
      "Belum faham",

    "student.notUnderstandDescription":
      "Saya masih memerlukan penerangan dan bimbingan lanjut.",

    "student.reflection":
      "Refleksi Pembelajaran",

    "student.reflectionDescription":
      "Nyatakan perkara yang telah difahami dan perkara yang masih memerlukan penjelasan.",

    "student.understood":
      "Apakah yang telah anda fahami?",

    "student.understoodPlaceholder":
      "Tuliskan perkara utama yang telah anda fahami...",

    "student.notUnderstood":
      "Apakah yang masih belum anda fahami?",

    "student.notUnderstoodPlaceholder":
      "Tuliskan perkara yang masih mengelirukan atau memerlukan penjelasan...",

    "student.lecturerQuestions":
      "Soalan Pensyarah",

    "student.lecturerQuestionsDescription":
      "Jawab soalan ringkas yang disediakan oleh Pensyarah.",

    "student.noLecturerQuestions":
      "Tiada soalan tambahan",

    "student.noLecturerQuestionsDescription":
      "Pensyarah tidak menyediakan soalan tambahan untuk sesi ini.",

    "student.question":
      "Soalan",

    "student.answerPlaceholder":
      "Taip jawapan anda...",

    "student.answerFor":
      "Jawapan bagi",

    "student.submit":
      "Hantar Exit Ticket",

    "student.submitting":
      "Sedang menghantar...",

    "student.success":
      "Respons berjaya dihantar",

    "student.successLabel":
      "EXIT TICKET BERJAYA DIHANTAR",

    "student.thankYou":
      "Terima kasih",

    "student.successDescription":
      "Respons anda telah berjaya direkodkan. Maklum balas ini akan membantu Pensyarah memahami tahap kefahaman kelas.",

    "student.footer":
      "Refleksi ringkas untuk pembelajaran yang lebih bermakna.",

    "student.feedbackUnderstand":
      "Bagus. Teruskan mengukuhkan kefahaman anda dengan membuat latihan dan menghubungkan konsep yang dipelajari.",

    "student.feedbackPartial":
      "Anda telah memahami sebahagian pembelajaran. Semak semula bahagian yang masih kurang jelas dan dapatkan penjelasan lanjut jika perlu.",

    "student.feedbackNotUnderstand":
      "Kenal pasti bahagian yang paling mengelirukan dan bincangkannya dengan Pensyarah atau rakan sebelum meneruskan ke topik seterusnya.",

    "student.feedbackDefault":
      "Terima kasih atas refleksi anda.",

    "student.errorNoSessionTitle":
      "Pautan sesi tidak lengkap",

    "student.errorNoSessionText":
      "ID sesi Exit Ticket tidak ditemui dalam pautan ini.",

    "student.errorNotFoundTitle":
      "Sesi tidak ditemui",

    "student.errorNotFoundText":
      "Sesi Exit Ticket ini tidak wujud atau pautan tidak sah.",

    "student.errorDraftTitle":
      "Sesi belum dibuka",

    "student.errorDraftText":
      "Pensyarah belum mengaktifkan sesi Exit Ticket ini.",

    "student.errorClosedTitle":
      "Sesi telah ditutup",

    "student.errorClosedText":
      "Sesi Exit Ticket ini tidak lagi menerima respons.",

    "student.errorArchivedTitle":
      "Sesi telah diarkibkan",

    "student.errorArchivedText":
      "Sesi Exit Ticket ini telah diarkibkan dan tidak lagi menerima respons.",

    "student.errorUnavailableTitle":
      "Sesi tidak tersedia",

    "student.errorUnavailableText":
      "Sesi Exit Ticket ini tidak tersedia untuk dijawab.",

    "student.errorPermissionTitle":
      "Sesi tidak dapat dibuka",

    "student.errorPermissionText":
      "Sesi ini mungkin tidak aktif atau akses telah ditutup oleh Pensyarah.",

    "student.errorLoadTitle":
      "Sesi gagal dimuatkan",

    "student.errorLoadText":
      "Sila semak sambungan internet dan cuba semula.",

    "student.authErrorTitle":
      "Sambungan tidak berjaya",

    "student.authErrorText":
      "Sistem tidak dapat memulakan sesi Pelajar. Sila cuba semula.",

    "student.sessionNotReady":
      "Sesi belum bersedia. Sila muat semula halaman.",

    "student.sessionNotActive":
      "Sesi ini tidak lagi menerima respons.",

    "student.nameRequired":
      "Sila masukkan nama penuh.",

    "student.matricRequired":
      "Sila masukkan nombor matrik.",

    "student.understandingRequired":
      "Sila pilih tahap kefahaman.",

    "student.understoodRequired":
      "Sila nyatakan perkara yang telah anda fahami.",

    "student.notUnderstoodRequired":
      "Sila nyatakan perkara yang masih belum anda fahami.",

    "student.questionRequired":
      "Sila jawab semua soalan Pensyarah.",

    "student.duplicateOrClosed":
      "Nombor matrik ini telah menghantar Exit Ticket untuk sesi ini, atau sesi tidak lagi menerima respons.",

    "student.submitError":
      "Respons gagal dihantar. Sila semak sambungan internet dan cuba semula.",


    /* -----------------------------------------------------
       MESEJ UMUM
    ----------------------------------------------------- */

    "message.logoutConfirm":
      "Adakah anda mahu log keluar?",

    "message.logoutError":
      "Log keluar tidak berjaya. Sila cuba semula.",

    "message.sessionCreated":
      "Sesi Exit Ticket berjaya dicipta.",

    "message.responseSubmitted":
      "Respons Exit Ticket berjaya dihantar.",

    "message.duplicateMatric":
      "Nombor matrik ini telah menghantar Exit Ticket untuk sesi ini."

  },


  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {

    /* -----------------------------------------------------
       APPLICATION
    ----------------------------------------------------- */

    "app.name":
      "Smart Exit Ticket",

    "app.lecturerPortal":
      "Lecturer Portal",

    "app.studentPortal":
      "Student Portal",


    /* -----------------------------------------------------
       HOME / INDEX
    ----------------------------------------------------- */

    "home.label":
      "LEARNING REFLECTION",

    "home.description":
      "Identify student understanding quickly, systematically and effectively.",

    "home.lecturerLoginTitle":
      "Lecturer Login",

    "home.lecturerLoginDescription":
      "Use your Google account to manage classes, create sessions and view response analysis.",

    "home.continueGoogle":
      "Continue with Google",

    "home.studentTitle":
      "For Students",

    "home.studentDescription":
      "Scan the QR code or open the link provided by your lecturer to complete the Exit Ticket.",


    /* -----------------------------------------------------
       LANGUAGE
    ----------------------------------------------------- */

    "language.ms":
      "BM",

    "language.en":
      "EN",


    /* -----------------------------------------------------
       NAVIGATION
    ----------------------------------------------------- */

    "nav.dashboard":
      "Dashboard",

    "nav.classes":
      "My Classes",

    "nav.createSession":
      "Create Session",

    "nav.manageSessions":
      "Session Management",

    "nav.responses":
      "Responses and Analysis",

    "nav.logout":
      "Log Out",


    /* -----------------------------------------------------
       COMMON
    ----------------------------------------------------- */

    "common.lecturer":
      "Lecturer",

    "common.profilePhoto":
      "Profile photo",

    "common.search":
      "Search",

    "common.status":
      "Status",

    "common.active":
      "Active",

    "common.inactive":
      "Inactive",

    "common.draft":
      "Draft",

    "common.closed":
      "Closed",

    "common.archived":
      "Archived",

    "common.cancel":
      "Cancel",

    "common.delete":
      "Delete",

    "common.edit":
      "Edit",

    "common.copy":
      "Copy",

    "common.copied":
      "Copied",

    "common.loading":
      "Loading...",

    "common.error":
      "Error",

    "common.success":
      "Success",

    "common.yes":
      "Yes",

    "common.no":
      "No",

    "common.save":
      "Save",

    "common.update":
      "Update",

    "common.view":
      "View",

    "common.open":
      "Open",


    /* -----------------------------------------------------
       SESSION STATUS
    ----------------------------------------------------- */

    "session.status.active":
      "Active",

    "session.status.draft":
      "Draft",

    "session.status.closed":
      "Closed",

    "session.status.archived":
      "Archived",


    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    "response.single":
      "response",

    "response.plural":
      "responses",


    /* -----------------------------------------------------
       DASHBOARD
    ----------------------------------------------------- */

    "dashboard.label":
      "DASHBOARD",

    "dashboard.welcome":
      "Welcome",

    "dashboard.description":
      "Manage classes and monitor student understanding from one place.",

    "dashboard.totalClasses":
      "Total Classes",

    "dashboard.activeSessions":
      "Active Sessions",

    "dashboard.totalResponses":
      "Total Responses",

    "dashboard.recentSessions":
      "Recent Sessions",

    "dashboard.recentDescription":
      "Shows up to five of your most recently created Exit Ticket sessions.",

    "dashboard.viewAll":
      "View all",

    "dashboard.createNewSession":
      "+ Create New Session",

    "dashboard.noSessions":
      "No sessions yet",

    "dashboard.noSessionsDescription":
      "Create your first class and Exit Ticket session to start receiving student responses.",


    /* -----------------------------------------------------
       MY CLASSES
    ----------------------------------------------------- */

    "classes.label":
      "CLASS MANAGEMENT",

    "classes.title":
      "My Classes",

    "classes.description":
      "Manage classes used for Exit Ticket sessions.",

    "classes.addClass":
      "+ Add Class",

    "classes.formAddTitle":
      "Add Class",

    "classes.formEditTitle":
      "Edit Class",

    "classes.formDescription":
      "Enter the class information that will be used in Exit Ticket sessions.",

    "classes.className":
      "Class Name",

    "classes.classNamePlaceholder":
      "Example: D2T2",

    "classes.courseCode":
      "Course Code",

    "classes.courseCodePlaceholder":
      "Example: DC014",

    "classes.courseName":
      "Course Name",

    "classes.courseNamePlaceholder":
      "Example: Computer Science 1",

    "classes.classStatus":
      "Class Status",

    "classes.statusActive":
      "Active",

    "classes.statusInactive":
      "Inactive",

    "classes.statusHelp":
      "Inactive classes will not be shown when creating a new session.",

    "classes.saveClass":
      "Save Class",

    "classes.updateClass":
      "Update Class",

    "classes.totalClasses":
      "Total Classes",

    "classes.activeClasses":
      "Active Classes",

    "classes.inactiveClasses":
      "Inactive",

    "classes.classList":
      "Class List",

    "classes.classListDescription":
      "View, edit or delete previously created classes.",

    "classes.loading":
      "Loading classes",

    "classes.noClasses":
      "No classes yet",

    "classes.noClassesDescription":
      "Add your first class to start creating Exit Ticket sessions.",

    "classes.edit":
      "Edit",

    "classes.saving":
      "Saving...",

    "classes.loadError":
      "Classes could not be loaded.",

    "classes.createSuccess":
      "Class added successfully.",

    "classes.updateSuccess":
      "Class updated successfully.",

    "classes.deleteSuccess":
      "Class deleted successfully.",

    "classes.saveError":
      "Class could not be saved. Please try again.",

    "classes.deleteError":
      "Class could not be deleted.",

    "classes.noLecturerSession":
      "Lecturer login session was not found.",

    "classes.requiredFields":
      "Please complete all class information.",

    "classes.deleteConfirm":
      "Are you sure you want to delete class \"{className}\"?",


    /* -----------------------------------------------------
       CREATE SESSION
    ----------------------------------------------------- */

    "createSession.label":
      "EXIT TICKET",

    "createSession.title":
      "Create New Session",

    "createSession.description":
      "Set the class, topic and questions before sharing the link with students.",

    "createSession.createButton":
      "Create Session",

    "createSession.clearButton":
      "Clear Form",

    "createSession.classInfo":
      "Class Information",

    "createSession.classInfoDescription":
      "Select the class for this session.",

    "createSession.classLabel":
      "Class",

    "createSession.selectClass":
      "Select class",

    "createSession.loadingClasses":
      "Loading classes...",

    "createSession.noClasses":
      "No classes available",

    "createSession.createClassFirst":
      "Create a class first from My Classes.",

    "createSession.classesLoadFailed":
      "Classes could not be loaded",

    "createSession.classesLoadError":
      "Classes could not be loaded. Please try again.",

    "createSession.courseInfoHelp":
      "The course code and course name will be taken from the selected class.",

    "createSession.topicSection":
      "Learning Topic",

    "createSession.topicDescription":
      "Enter the topic and subtopics that have been learned.",

    "createSession.topic":
      "Topic",

    "createSession.topicPlaceholder":
      "Example: Fundamental of Database System",

    "createSession.subtopic":
      "Subtopic",

    "createSession.subtopicPlaceholder":
      "Example: Data Integrity",

    "createSession.extraSubtopicPlaceholder":
      "Enter an additional subtopic",

    "createSession.addSubtopic":
      "+ Add Subtopic",

    "createSession.questionsSection":
      "Lecturer Questions",

    "createSession.questionsDescription":
      "Add short questions for students to answer.",

    "createSession.additionalQuestion":
      "Additional Question",

    "createSession.questionPlaceholder":
      "Example: Explain the concept of data integrity.",

    "createSession.extraQuestionPlaceholder":
      "Enter an additional question",

    "createSession.addQuestion":
      "+ Add Question",

    "createSession.systemQuestionsInfo":
      "The system will also ask about the level of understanding, what has been understood and what is still not understood.",

    "createSession.sessionStatus":
      "Session Status",

    "createSession.statusDescription":
      "Determine whether students are allowed to answer this session.",

    "createSession.statusActive":
      "Active — Students can respond",

    "createSession.statusDraft":
      "Draft — not yet open to students",

    "createSession.statusHelp":
      "An active session can be answered as soon as the link or QR code is shared. Close the session after all students have completed it.",

    "createSession.removeField":
      "Remove field",

    "createSession.maxSubtopics":
      "A maximum of five subtopics is allowed per session.",

    "createSession.maxQuestions":
      "A maximum of five questions is allowed per session.",

    "createSession.noLecturerSession":
      "Lecturer login session was not found.",

    "createSession.selectClassError":
      "Please select a class.",

    "createSession.topicRequired":
      "Please enter a topic.",

    "createSession.subtopicRequired":
      "Please enter at least one subtopic.",

    "createSession.questionRequired":
      "Please enter at least one question.",

    "createSession.invalidStatus":
      "Invalid session status.",

    "createSession.creating":
      "Creating session...",

    "createSession.createdSuccess":
      "Exit Ticket session created successfully.",

    "createSession.permissionError":
      "The session could not be created because Firestore Security Rules rejected the request.",

    "createSession.createError":
      "Session could not be created",

    "createSession.successLabel":
      "SESSION CREATED SUCCESSFULLY",

    "createSession.studentLinkTitle":
      "Student Exit Ticket Link",

    "createSession.studentLinkDescription":
      "Share this link with students through Google Classroom or a QR code.",

    "createSession.sessionCode":
      "Session Code",

    "createSession.copyLink":
      "Copy Link",

    "createSession.openStudentForm":
      "View Student Form",


    /* -----------------------------------------------------
       SESSION MANAGEMENT
    ----------------------------------------------------- */

    "manageSessions.label":
      "SESSION MANAGEMENT",

    "manageSessions.title":
      "Manage Exit Ticket Sessions",

    "manageSessions.description":
      "Activate, close, archive or delete previously created Exit Ticket sessions.",

    "manageSessions.createNew":
      "+ Create New Session",

    "manageSessions.filter":
      "Filter Sessions",

    "manageSessions.filterDescription":
      "Choose a status or search for a specific session.",

    "manageSessions.sessionList":
      "Session List",

    "manageSessions.sessionListDescription":
      "Manage each session from the list below.",

    "manageSessions.allSessions":
      "All Sessions",

    "manageSessions.active":
      "Active",

    "manageSessions.draft":
      "Draft",

    "manageSessions.closed":
      "Closed",

    "manageSessions.archived":
      "Archived",

    "manageSessions.searchPlaceholder":
      "Search topic, class or session code...",

    "manageSessions.totalSessions":
      "Total Sessions",

    "manageSessions.activeSessions":
      "Active",

    "manageSessions.draftSessions":
      "Draft",

    "manageSessions.closedSessions":
      "Closed",

    "manageSessions.archivedSessions":
      "Archived",

    "manageSessions.loadingTitle":
      "Loading sessions",

    "manageSessions.noSessions":
      "No sessions found",

    "manageSessions.noSessionsDescription":
      "No sessions match your current filter or search.",

    "manageSessions.sessionCode":
      "Session Code",

    "manageSessions.totalResponses":
      "Total Responses",

    "manageSessions.createdAt":
      "Created",

    "manageSessions.subtopic":
      "Subtopic",

    "manageSessions.studentLink":
      "Student Link",

    "manageSessions.copyLink":
      "Copy Link",

    "manageSessions.openStudentForm":
      "Open Student Form",

    "manageSessions.viewAnalysis":
      "View Analysis",

    "manageSessions.closeSession":
      "Close Session",

    "manageSessions.activate":
      "Activate",

    "manageSessions.reactivate":
      "Reactivate",

    "manageSessions.archive":
      "Archive",

    "manageSessions.unarchive":
      "Remove from Archive",

    "manageSessions.delete":
      "Delete",

    "manageSessions.noTopic":
      "No topic",

    "manageSessions.changeStatusConfirm":
      "Change session status for \"{topic}\" from {oldStatus} to {newStatus}?",

    "manageSessions.statusUpdateSuccess":
      "Session status changed successfully to {status}.",

    "manageSessions.statusUpdateError":
      "Session status could not be updated.",

    "manageSessions.deleteConfirm":
      "Are you sure you want to delete session \"{topic}\"?",

    "manageSessions.deleteResponseWarning":
      "This session has {count} student responses. These responses will NOT be deleted automatically.",

    "manageSessions.deleteIrreversible":
      "This action cannot be undone.",

    "manageSessions.deleteFinalConfirm":
      "Final confirmation: Are you sure you want to delete this session?",

    "manageSessions.deleteSuccess":
      "Session deleted successfully.",

    "manageSessions.deleteError":
      "Session could not be deleted.",

    "manageSessions.loadError":
      "Sessions could not be loaded.",

    "manageSessions.initialiseError":
      "Session information could not be loaded.",


    /* -----------------------------------------------------
       RESPONSES AND ANALYSIS
    ----------------------------------------------------- */

    "responses.label":
      "EXIT TICKET ANALYSIS",

    "responses.title":
      "Responses and Analysis",

    "responses.description":
      "Monitor student understanding based on submitted Exit Ticket responses.",

    "responses.totalSessions":
      "Total Sessions",

    "responses.totalResponses":
      "Total Responses",

    "responses.selectSession":
      "Select Session",

    "responses.selectSessionDescription":
      "Select an Exit Ticket session to view student responses and analysis.",

    "responses.selectSessionOption":
      "Select Exit Ticket session",

    "responses.loadingTitle":
      "Loading responses",

    "responses.noSessions":
      "No sessions found",

    "responses.noSessionsDescription":
      "Create an Exit Ticket session first to view responses and analysis.",

    "responses.sessionInfo":
      "Session Information",

    "responses.sessionInfoDescription":
      "Summary of the currently selected Exit Ticket session.",

    "responses.topic":
      "Topic",

    "responses.class":
      "Class",

    "responses.course":
      "Course",

    "responses.sessionCode":
      "Session Code",

    "responses.analysis":
      "Understanding Analysis",

    "responses.analysisDescription":
      "Summary of student understanding based on submitted responses.",

    "responses.understand":
      "Understand",

    "responses.partial":
      "Partially Understand",

    "responses.notUnderstand":
      "Do Not Understand Yet",

    "responses.notUnderstood":
      "Areas Still Not Understood",

    "responses.notUnderstoodDescription":
      "Student reflections on areas that still require further explanation.",

    "responses.noNotUnderstood":
      "No major issues recorded",

    "responses.noNotUnderstoodDescription":
      "There are no reflections about areas still not understood for this session.",

    "responses.studentResponses":
      "Student Responses",

    "responses.studentResponsesDescription":
      "View individual responses submitted by students.",

    "responses.searchStudent":
      "Search Student",

    "responses.searchPlaceholder":
      "Search by name or matric number...",

    "responses.noResponses":
      "No responses yet",

    "responses.noResponsesDescription":
      "No students have submitted an Exit Ticket for this session yet.",

    "responses.noSearchResults":
      "No students found",

    "responses.noSearchResultsDescription":
      "No responses match your search.",

    "responses.unknownStudent":
      "Student",

    "responses.submittedAt":
      "Submitted",

    "responses.whatUnderstood":
      "What was understood",

    "responses.whatNotUnderstood":
      "What is still not understood",

    "responses.questionAnswers":
      "Question Answers",

    "responses.question":
      "Question",

    "responses.noQuestionAnswers":
      "No question answers.",

    "responses.loadError":
      "Responses and analysis could not be loaded. Please try again.",


    /* -----------------------------------------------------
       STUDENT
    ----------------------------------------------------- */

    "student.exitTicket":
      "EXIT TICKET",

    "student.pageTitle":
      "Learning Reflection",

    "student.pageDescription":
      "Complete this Exit Ticket before leaving the learning session.",

    "student.loadingTitle":
      "Loading session",

    "student.loadingDescription":
      "Please wait a moment...",

    "student.sessionInformation":
      "SESSION INFORMATION",

    "student.course":
      "Course",

    "student.class":
      "Class",

    "student.sessionCode":
      "Session Code",

    "student.subtopics":
      "Subtopics",

    "student.noSubtopics":
      "No subtopics.",

    "student.studentInfo":
      "Student Information",

    "student.studentInfoDescription":
      "Enter your name and matric number.",

    "student.fullName":
      "Full Name",

    "student.fullNamePlaceholder":
      "Enter your full name",

    "student.matricNumber":
      "Matric Number",

    "student.matricPlaceholder":
      "Example: MS2512345678",

    "student.matricHelp":
      "Make sure your matric number is correct. Each matric number can submit only one response for this session.",

    "student.understandingLevel":
      "Understanding Level",

    "student.understandingDescription":
      "Select your level of understanding after this learning session.",

    "student.understand":
      "I understand",

    "student.understandDescription":
      "I understand the learning content well.",

    "student.partial":
      "Partially understand",

    "student.partialDescription":
      "I understand some of the content but still need further explanation.",

    "student.notUnderstand":
      "I do not understand yet",

    "student.notUnderstandDescription":
      "I still need further explanation and guidance.",

    "student.reflection":
      "Learning Reflection",

    "student.reflectionDescription":
      "State what you have understood and what still requires further explanation.",

    "student.understood":
      "What have you understood?",

    "student.understoodPlaceholder":
      "Write the main points that you have understood...",

    "student.notUnderstood":
      "What do you still not understand?",

    "student.notUnderstoodPlaceholder":
      "Write what is still confusing or requires further explanation...",

    "student.lecturerQuestions":
      "Lecturer Questions",

    "student.lecturerQuestionsDescription":
      "Answer the short questions provided by your lecturer.",

    "student.noLecturerQuestions":
      "No additional questions",

    "student.noLecturerQuestionsDescription":
      "The lecturer has not provided any additional questions for this session.",

    "student.question":
      "Question",

    "student.answerPlaceholder":
      "Type your answer...",

    "student.answerFor":
      "Answer for",

    "student.submit":
      "Submit Exit Ticket",

    "student.submitting":
      "Submitting...",

    "student.success":
      "Response submitted successfully",

    "student.successLabel":
      "EXIT TICKET SUBMITTED SUCCESSFULLY",

    "student.thankYou":
      "Thank you",

    "student.successDescription":
      "Your response has been recorded successfully. This feedback will help your lecturer understand the class's level of understanding.",

    "student.footer":
      "A short reflection for more meaningful learning.",

    "student.feedbackUnderstand":
      "Good. Continue strengthening your understanding through practice and by connecting the concepts you have learned.",

    "student.feedbackPartial":
      "You have understood part of the lesson. Review the areas that are still unclear and seek further explanation if needed.",

    "student.feedbackNotUnderstand":
      "Identify the part that is most confusing and discuss it with your lecturer or classmates before moving on to the next topic.",

    "student.feedbackDefault":
      "Thank you for your reflection.",

    "student.errorNoSessionTitle":
      "Incomplete session link",

    "student.errorNoSessionText":
      "The Exit Ticket session ID could not be found in this link.",

    "student.errorNotFoundTitle":
      "Session not found",

    "student.errorNotFoundText":
      "This Exit Ticket session does not exist or the link is invalid.",

    "student.errorDraftTitle":
      "Session is not open yet",

    "student.errorDraftText":
      "The lecturer has not activated this Exit Ticket session yet.",

    "student.errorClosedTitle":
      "Session is closed",

    "student.errorClosedText":
      "This Exit Ticket session is no longer accepting responses.",

    "student.errorArchivedTitle":
      "Session has been archived",

    "student.errorArchivedText":
      "This Exit Ticket session has been archived and is no longer accepting responses.",

    "student.errorUnavailableTitle":
      "Session unavailable",

    "student.errorUnavailableText":
      "This Exit Ticket session is not available for responses.",

    "student.errorPermissionTitle":
      "Session cannot be opened",

    "student.errorPermissionText":
      "This session may not be active or access may have been closed by the lecturer.",

    "student.errorLoadTitle":
      "Session could not be loaded",

    "student.errorLoadText":
      "Please check your internet connection and try again.",

    "student.authErrorTitle":
      "Connection unsuccessful",

    "student.authErrorText":
      "The system could not start the student session. Please try again.",

    "student.sessionNotReady":
      "The session is not ready. Please reload the page.",

    "student.sessionNotActive":
      "This session is no longer accepting responses.",

    "student.nameRequired":
      "Please enter your full name.",

    "student.matricRequired":
      "Please enter your matric number.",

    "student.understandingRequired":
      "Please select your understanding level.",

    "student.understoodRequired":
      "Please state what you have understood.",

    "student.notUnderstoodRequired":
      "Please state what you still do not understand.",

    "student.questionRequired":
      "Please answer all lecturer questions.",

    "student.duplicateOrClosed":
      "This matric number has already submitted an Exit Ticket for this session, or the session is no longer accepting responses.",

    "student.submitError":
      "The response could not be submitted. Please check your internet connection and try again.",


    /* -----------------------------------------------------
       GENERAL MESSAGES
    ----------------------------------------------------- */

    "message.logoutConfirm":
      "Do you want to log out?",

    "message.logoutError":
      "Log out was unsuccessful. Please try again.",

    "message.sessionCreated":
      "Exit Ticket session created successfully.",

    "message.responseSubmitted":
      "Exit Ticket response submitted successfully.",

    "message.duplicateMatric":
      "This matric number has already submitted an Exit Ticket for this session."

  }

};


/* =========================================================
   DAPATKAN BAHASA SEMASA
========================================================= */

export function getCurrentLanguage() {

  const savedLanguage =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (
    savedLanguage === "ms" ||
    savedLanguage === "en"
  ) {

    return savedLanguage;
  }

  return DEFAULT_LANGUAGE;
}


/* =========================================================
   SET BAHASA
========================================================= */

export function setLanguage(
  language
) {

  if (
    language !== "ms" &&
    language !== "en"
  ) {

    return;
  }


  localStorage.setItem(
    STORAGE_KEY,
    language
  );


  applyTranslations();


  document.dispatchEvent(
    new CustomEvent(
      "languagechange",
      {
        detail: {
          language
        }
      }
    )
  );
}


/* =========================================================
   TERJEMAHAN UNTUK JAVASCRIPT
========================================================= */

export function t(
  key,
  fallback = ""
) {

  const language =
    getCurrentLanguage();


  const translated =
    translations[
      language
    ]?.[key];


  if (
    translated !== undefined
  ) {

    return translated;
  }


  const defaultTranslated =
    translations[
      DEFAULT_LANGUAGE
    ]?.[key];


  if (
    defaultTranslated !== undefined
  ) {

    return defaultTranslated;
  }


  if (fallback) {

    return fallback;
  }


  return key;
}


/* =========================================================
   TERJEMAH TEKS HTML
========================================================= */

function translateTextElements() {

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset.i18n;


        if (!key) {
          return;
        }


        element.textContent =
          t(
            key,
            element.textContent
          );
      }
    );
}


/* =========================================================
   TERJEMAH PLACEHOLDER
========================================================= */

function translatePlaceholders() {

  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset
            .i18nPlaceholder;


        if (!key) {
          return;
        }


        element.placeholder =
          t(
            key,
            element.placeholder
          );
      }
    );
}


/* =========================================================
   TERJEMAH TITLE
========================================================= */

function translateTitles() {

  document
    .querySelectorAll(
      "[data-i18n-title]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset
            .i18nTitle;


        if (!key) {
          return;
        }


        element.title =
          t(
            key,
            element.title
          );
      }
    );
}


/* =========================================================
   TERJEMAH ARIA LABEL
========================================================= */

function translateAriaLabels() {

  document
    .querySelectorAll(
      "[data-i18n-aria-label]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset
            .i18nAriaLabel;


        if (!key) {
          return;
        }


        element.setAttribute(
          "aria-label",
          t(
            key,
            element.getAttribute(
              "aria-label"
            ) || ""
          )
        );
      }
    );
}


/* =========================================================
   HTML LANG
========================================================= */

function updateDocumentLanguage() {

  const language =
    getCurrentLanguage();


  document.documentElement.lang =
    language === "ms"
      ? "ms"
      : "en";
}


/* =========================================================
   BUTANG BM / EN
========================================================= */

function updateLanguageButtons() {

  const language =
    getCurrentLanguage();


  const bmButton =
    document.getElementById(
      "languageBM"
    );


  const enButton =
    document.getElementById(
      "languageEN"
    );


  if (bmButton) {

    bmButton.classList.toggle(
      "active",
      language === "ms"
    );

    bmButton.setAttribute(
      "aria-pressed",
      language === "ms"
        ? "true"
        : "false"
    );
  }


  if (enButton) {

    enButton.classList.toggle(
      "active",
      language === "en"
    );

    enButton.setAttribute(
      "aria-pressed",
      language === "en"
        ? "true"
        : "false"
    );
  }
}


/* =========================================================
   SETUP LANGUAGE SWITCHER
========================================================= */

function setupLanguageSwitcher() {

  const bmButton =
    document.getElementById(
      "languageBM"
    );


  const enButton =
    document.getElementById(
      "languageEN"
    );


  if (
    bmButton &&
    !bmButton.dataset.i18nReady
  ) {

    bmButton.addEventListener(
      "click",
      () => {

        setLanguage("ms");
      }
    );


    bmButton.dataset.i18nReady =
      "true";
  }


  if (
    enButton &&
    !enButton.dataset.i18nReady
  ) {

    enButton.addEventListener(
      "click",
      () => {

        setLanguage("en");
      }
    );


    enButton.dataset.i18nReady =
      "true";
  }
}


/* =========================================================
   APPLY TRANSLATIONS
========================================================= */

export function applyTranslations() {

  updateDocumentLanguage();

  translateTextElements();

  translatePlaceholders();

  translateTitles();

  translateAriaLabels();

  updateLanguageButtons();
}


/* =========================================================
   INITIALISE
========================================================= */

export function initializeI18n() {

  setupLanguageSwitcher();

  applyTranslations();
}