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
const contactForm = document.getElementById("contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    console.log("Form submitted:", { name, email, message })

    // Show success message
    alert("Pesan Anda telah terkirim! Terima kasih telah menghubungi saya.")

    // Reset form
    contactForm.reset()
  })
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

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Mencegah submit normal

  // Mengambil data input
  const formData = new FormData(this);

  // Kirim data ke FormSubmit dengan Fetch API
  fetch("https://formsubmit.co/yusarosdiana7@gmail.com", {
      method: "POST",
      body: formData
  })
  .then(response => {
      if (response.ok) {
          showPopup("Pesan berhasil dikirim! ✅");
      } else {
          showPopup("Gagal mengirim pesan. Coba lagi ❌");
      }
  })
  .catch(error => {
      showPopup("Terjadi kesalahan. Coba lagi ❌");
      console.error("Error:", error);
  });
});

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

