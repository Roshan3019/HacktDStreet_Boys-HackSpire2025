document.addEventListener("DOMContentLoaded", () => {
  // --- Queue Status for index.html ---
  const queueContainer = document.querySelector(
    ".grid.md\\:grid-cols-2.lg\\:grid-cols-3"
  );
  function renderQueue(data) {
    if (queueContainer) {
      queueContainer.innerHTML = "";
      data.forEach((center) => {
        queueContainer.innerHTML += `
                    <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-lg font-semibold">${
                              center.name
                            }</h3>
                            <span class="bg-${
                              center.status === "Normal"
                                ? "green"
                                : center.status === "Busy"
                                ? "yellow"
                                : "red"
                            }-100 text-${
          center.status === "Normal"
            ? "green"
            : center.status === "Busy"
            ? "yellow"
            : "red"
        }-800 text-xs px-2 py-1 rounded-full">${center.status}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">123 Main Street, New York, NY</p>
                        <div class="flex items-center mb-4">
                            <div class="w-5 h-5 flex items-center justify-center text-primary mr-2">
                                <i class="ri-user-line"></i>
                            </div>
                            <span class="text-gray-700">Current queue: <span class="font-semibold">${
                              center.queue
                            } people</span></span>
                        </div>
                        <div class="flex items-center mb-6">
                            <div class="w-5 h-5 flex items-center justify-center text-primary mr-2">
                                <i class="ri-time-line"></i>
                            </div>
                            <span class="text-gray-700">Estimated wait: <span class="font-semibold">${
                              center.waitTime
                            }</span></span>
                        </div>
                        <div class="flex justify-between">
                            <button class="text-primary hover:text-primary/80 transition-colors flex items-center">
                                <div class="w-5 h-5 flex items-center justify-center mr-1">
                                    <i class="ri-information-line"></i>
                                </div>
                                Details
                            </button>
                            <a href="/booking.html">
                                <button class="bg-primary text-white px-4 py-2 rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
                                    Book Slot
                                </button>
                            </a>
                        </div>
                    </div>`;
      });
      queueContainer.classList.add("fade-in");
      setTimeout(() => queueContainer.classList.remove("fade-in"), 500);
    }
  }

  if (queueContainer) {
    // Initial fetch
    fetch("http://localhost:5001/api/queue")
      .then((response) => response.json())
      .then((data) => renderQueue(data))
      .catch((error) => console.error("Error fetching queue:", error));

    // Poll every 10 seconds
    setInterval(() => {
      fetch("http://localhost:5001/api/queue")
        .then((response) => response.json())
        .then((data) => renderQueue(data))
        .catch((error) => console.error("Error polling queue:", error));
    }, 10000);
  }

  // --- Booking Functionality (unchanged) ---
  // (Paste the booking code from the previous `script.js` here)

const availableSlots = document.querySelectorAll(".slot.available");
  const bookedSlots = document.querySelectorAll(".slot.booked");
  const confirmBtn = document.getElementById("confirmBookingBtn");
  const modal = document.getElementById("confirmationModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  let selectedDate = "Apr 26, 2025";
  let selectedTime = "11:00 AM";

  const dateButtons = document.querySelectorAll(
    ".slot.min-w-\\3sm\\:min-w-\\[100px\\]"
  );
  dateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dateButtons.forEach((btn) => {
        btn.classList.remove("selected");
        btn.classList.add("available");
      });
      button.classList.remove("available");
      button.classList.add("selected");
      selectedDate = button.querySelector(".text-sm").textContent + ", 2025";
      updateSelectedSlotSummary();
    });
  });

  availableSlots.forEach((slot, index) => {
    setTimeout(() => {
      slot.classList.add("fade-in");
    }, index * 50);

    slot.addEventListener("click", () => {
      document.querySelectorAll(".slot.selected").forEach((s) => {
        s.classList.remove("selected");
        s.classList.add("available");
      });
      slot.classList.remove("available");
      slot.classList.add("selected");
      selectedTime = slot.textContent.trim();
      updateSelectedSlotSummary();
    });
  });

  bookedSlots.forEach((slot, index) => {
    setTimeout(() => {
      slot.classList.add("fade-in");
    }, index * 50);
  });

  function updateSelectedSlotSummary() {
    const summary = document.querySelector(".text-gray-600.mt-1");
    if (summary) {
      summary.textContent = `${selectedDate} at ${selectedTime}`;
    }
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        specialRequests: document.getElementById("specialRequests").value,
        date: selectedDate,
        time: selectedTime,
        notificationPreferences: {
          email:
            document.querySelector('input[type="checkbox"][checked]')
              ?.checked || false,
          sms:
            document.querySelectorAll('input[type="checkbox"]')[1]?.checked ||
            false,
          reminder: document.querySelector("select").value,
        },
        payment: {
          method:
            document
              .querySelector(".payment-method.border-primary")
              ?.querySelector("span").textContent || "Credit Card",
          cardName: document.getElementById("cardName").value,
          cardNumber: document.getElementById("cardNumber").value,
          expiry: document.getElementById("expiry").value,
          cvv: document.getElementById("cvv").value,
        },
        totalAmount: "$50.00",
      };

      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.service
      ) {
        alert(
          "Please fill in all required fields (Full Name, Email, Phone, Service)."
        );
        return;
      }

      fetch("http://localhost:5001/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          const modalContent = document.querySelector(
            "#confirmationModal .p-6"
          );
          modalContent.querySelector("h4").textContent =
            data.message || "Your slot has been booked successfully!";
          modalContent
            .querySelectorAll(".grid div")[0]
            .querySelector("p:last-child").textContent =
            data.booking?.reference || "#QW25042601";
          modalContent
            .querySelectorAll(".grid div")[1]
            .querySelector(
              "p:last-child"
            ).textContent = `${formData.date} at ${formData.time}`;
          modalContent
            .querySelectorAll(".grid div")[2]
            .querySelector("p:last-child").textContent =
            formData.service || "Standard Consultation";
          modalContent
            .querySelectorAll(".grid div")[3]
            .querySelector("p:last-child").textContent = formData.totalAmount;

          modal.classList.remove("hidden");
          document.getElementById("fullName").value = "";
          document.getElementById("email").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("service").value = "";
          document.getElementById("specialRequests").value = "";
          document.getElementById("cardName").value = "";
          document.getElementById("cardNumber").value = "";
          document.getElementById("expiry").value = "";
          document.getElementById("cvv").value = "";
        })
        .catch((error) => {
          console.error("Error submitting booking:", error);
          alert("Failed to book slot. Please try again.");
        });
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  const paymentMethods = document.querySelectorAll(".payment-method");
  paymentMethods.forEach((method) => {
    method.addEventListener("click", () => {
      paymentMethods.forEach((m) => m.classList.remove("border-primary"));
      method.classList.add("border-primary");
    });
  });
});
// Fetch AI recommendation
const aiRecommendation = document.getElementById('ai-recommendation');
if (aiRecommendation) {
    fetch('http://localhost:5002/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            hour: new Date().getHours(),
            day_of_week: new Date().getDay(),
            queue_length: 20  // Mock value, replace with real queue data
        })
    })
        .then(response => response.json())
        .then(data => {
            aiRecommendation.textContent = `Recommended slot: ${data.recommended_slot}, Estimated wait: ${data.wait_time}`;
        })
        .catch(error => {
            console.error('Error fetching AI recommendation:', error);
            aiRecommendation.textContent = 'Unable to fetch recommendation';
        });
}
