// Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle")
const mobileNav = document.querySelector(".mobile-nav")

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active")
})

// Close mobile nav when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active")
  })
})

// Testimonial Slider
const testimonialContainer = document.querySelectorAll(".testimonial-container")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
let currentSlide = 0

// Initialize slider
function initSlider() {
  testimonialContainer.forEach((container, index) => {
    if (index !== 0) {
      container.style.display = "none"
    }
  })
}

// Show slide
function showSlide(n) {
  testimonialContainer.forEach((container) => {
    container.style.display = "none"
  })

  dots.forEach((dot) => {
    dot.classList.remove("active")
  })

  testimonialContainer[n].style.display = "grid"
  dots[n].classList.add("active")
  currentSlide = n
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonialContainer.length
  showSlide(currentSlide)
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + testimonialContainer.length) % testimonialContainer.length
  showSlide(currentSlide)
}

// Event listeners for slider controls
if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", prevSlide)
  nextBtn.addEventListener("click", nextSlide)

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Initialize slider
  initSlider()
}

// Form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Mencegah submit normal HTML

        let submitButton = document.querySelector("#contact-form button");
        submitButton.disabled = true; // Menonaktifkan tombol saat loading
        submitButton.innerHTML = `Mengirim... <span class="spinner"></span>`;

        // Mengambil data input
        const formData = new FormData(this);
        const formDataLocal = new FormData(this); // Membuat instance FormData lain untuk pengiriman lokal

        // **Bagian 1: Kirim data ke FormSubmit (seperti sebelumnya)**
        fetch("https://formsubmit.co/yusarosdiana7@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                showPopup("Gagal mengirim pesan melalui email. Coba lagi ❌");
            }
            // Kita tidak menampilkan pesan sukses di sini dulu,
            // karena kita akan mencoba menyimpan ke database juga.
        })
        .catch(error => {
            showPopup("Terjadi kesalahan saat mengirim email. Coba lagi ❌");
            console.error("Error mengirim email:", error);
        })
        .finally(() => {
            // Tidak menonaktifkan/mengubah tombol di sini dulu,
            // karena kita masih akan mencoba menyimpan ke database.
        });

        // **Bagian 2: Kirim data ke server lokal untuk disimpan ke database**
        fetch("kirimpesan.php", { // Ubah URL ke file PHP lokal Anda
            method: "POST",
            body: formDataLocal // Gunakan instance FormData yang berbeda
        })
        .then(response => {
            if (response.ok) {
                showPopup("Pesan berhasil dikirim dan disimpan! ✅"); // Tampilkan pesan sukses jika keduanya berhasil
            } else {
                showPopup("Pesan berhasil dikirim melalui email, tetapi gagal disimpan. ⚠️"); // Beri tahu jika email berhasil tapi penyimpanan gagal
            }
        })
        .catch(error => {
            showPopup("Terjadi kesalahan saat menyimpan pesan. Coba lagi ❌"); // Tampilkan pesan error jika penyimpanan gagal
            console.error("Error menyimpan pesan:", error);
        })
        .finally(() => {
            submitButton.disabled = false; // Aktifkan kembali tombol setelah mencoba keduanya
            submitButton.innerHTML = `Kirim Pesan`;
            contactForm.reset(); // Reset formulir setelah selesai (baik berhasil atau gagal)
        });
    });
}

// Fungsi untuk menampilkan popup
function showPopup(message) {
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<p>${message}</p><button onclick="closePopup(this)">OK</button>`;
    document.body.appendChild(popup);
    popup.style.display = "block";
}

// Fungsi untuk menutup popup dan kembali ke hero
function closePopup(button) {
    button.parentElement.style.display = "none";
    window.location.href = "#hero"; // Kembali ke section hero
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      })
    }
  })
})

// Add active class to nav links based on scroll position
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress")
const animateSkills = () => {
  skillBars.forEach((bar) => {
    const barPosition = bar.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (barPosition < screenPosition) {
      bar.style.width = bar.textContent
    }
  })
}

// Initial animation
window.addEventListener("load", animateSkills)
// Animate on scroll
window.addEventListener("scroll", animateSkills)

$(document).ready(function () {
    $("#contact-form").submit(function (e) {
        e.preventDefault(); // Mencegah pengiriman form default (lagi, karena sudah dicegah di atas)

        let name = $("input[name='name']").val().trim();
        let email = $("input[name='email']").val().trim();
        let message = $("textarea[name='message']").val().trim();

        let phone = prompt("Masukkan nomor handphone:"); // Ini akan muncul setelah pengiriman Fetch
        let phoneRegex = /^[0-9]{10,15}$/; // Validasi nomor HP 10-15 digit angka

        if (name === "" || email === "" || message === "" || phone === "") {
            showPopup("Semua kolom wajib diisi!");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showPopup("Format email tidak valid!");
            return;
        }

        if (!phoneRegex.test(phone)) {
            showPopup("Nomor HP harus terdiri dari 10-15 digit angka!");
            return;
        }

        if (name.length > 50) {
            showPopup("Nama tidak boleh lebih dari 50 karakter!");
            return;
        }

        if (message.length > 200) {
            showPopup("Pesan tidak boleh lebih dari 200 karakter!");
            return;
        }

        // showPopup("Pesan berhasil dikirim!"); // Ini mungkin duplikat dengan pesan dari Fetch
    });
});