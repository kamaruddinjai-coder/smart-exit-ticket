import {
  auth
} from "./firebase-config.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

const googleLoginBtn =
  document.getElementById("googleLoginBtn");

const loginMessage =
  document.getElementById("loginMessage");

const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

function showMessage(text, type) {
  loginMessage.textContent = text;
  loginMessage.className = `message show ${type}`;
}

function setLoading(isLoading) {
  googleLoginBtn.disabled = isLoading;

  googleLoginBtn.innerHTML = isLoading
    ? "Sedang menghubungkan..."
    : `
        <span class="google-icon">G</span>
        Teruskan dengan Google
      `;
}

googleLoginBtn.addEventListener("click", async () => {
  setLoading(true);

  showMessage(
    "Sila pilih akaun Google Pensyarah.",
    "success"
  );

  try {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const lecturer = result.user;

    showMessage(
      `Log masuk berjaya. Selamat datang, ${
        lecturer.displayName || "Pensyarah"
      }.`,
      "success"
    );
  } catch (error) {
    console.error("Ralat log masuk:", error);

    let errorMessage =
  `Log masuk tidak berjaya: ${error.code || "ralat-tidak-diketahui"}`;

    if (error.code === "auth/popup-closed-by-user") {
      errorMessage =
        "Tetingkap log masuk telah ditutup sebelum selesai.";
    }

    if (error.code === "auth/popup-blocked") {
      errorMessage =
        "Tetingkap log masuk disekat oleh pelayar.";
    }

    if (error.code === "auth/unauthorized-domain") {
      errorMessage =
        "Alamat pratonton belum dibenarkan dalam Firebase.";
    }

    showMessage(errorMessage, "error");
  } finally {
    setLoading(false);
  }
});

onAuthStateChanged(auth, (lecturer) => {
  if (lecturer) {
    window.location.replace("dashboard.html");
  }
});