document.addEventListener("DOMContentLoaded", () => {
  // --- Queue Status and Chart for index.html ---
  const queueContainer = document.querySelector(
    ".grid.md\\:grid-cols-2.lg\\:grid-cols-3"
  );
  const ctx = document.getElementById("queueChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Downtown Medical", "Westside DMV", "Eastside Tax"],
      datasets: [
        {
          label: "Queue Length",
          data: [0, 0, 0],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
      responsive: true,
    },
  });

  function renderQueue(data) {
    if (queueContainer) {
      queueContainer.innerHTML = "";
      data.forEach((center) => {
        queueContainer.innerHTML += `
                      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <h3 class="text-lg font-semibold">${center.name}</h3>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            center.status === "Normal"
                              ? "bg-green-100 text-green-800"
                              : center.status === "Busy"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }">${center.status}</span>
                          <p class="mt-2 text-sm text-gray-600">123 Main Street, New York, NY</p>
                          <p class="mt-2 text-sm text-gray-600">Current queue: <span class="font-semibold">${
                            center.queue
                          } people</span></p>
                          <p class="mt-2 text-sm text-gray-600">Estimated wait: <span class="font-semibold">${
                            center.waitTime
                          }</span></p>
                          <a href="/booking.html" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Book Slot
                          </a>
                      </div>`;
      });
      // Update chart data
      chart.data.datasets[0].data = data.map((center) => center.queue);
      chart.update();
      queueContainer.classList.add("fade-in");
      setTimeout(() => queueContainer.classList.remove("fade-in"), 500);
    }
  }

  if (queueContainer) {
    fetch("http://localhost:5001/api/queue")
      .then((response) => response.json())
      .then((data) => renderQueue(data))
      .catch((error) => console.error("Error fetching queue:", error));

    setInterval(() => {
      fetch("http://localhost:5001/api/queue")
        .then((response) => response.json())
        .then((data) => renderQueue(data))
        .catch((error) => console.error("Error polling queue:", error));
    }, 10000);
  }

  // --- Booking Functionality ---
  const availableSlots = document.querySelectorAll(".slot.available");
  const bookedSlots = document.querySelectorAll(".slot.booked");
  const confirmBtn = document.getElementById("confirmBookingBtn");
  const modal = document.getElementById("confirmationModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const loadingSpinner = document.getElementById("loadingSpinner");

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

      loadingSpinner.classList.remove("hidden");
      fetch("http://localhost:5001/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
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
          alert(
            `Failed to book slot. Please try again. Error: ${error.message}`
          );
        })
        .finally(() => {
          loadingSpinner.classList.add("hidden");
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

  // --- AI Recommendation with LLM and Anomaly Warning ---
  const aiRecommendation = document.getElementById("ai-recommendation");
  if (aiRecommendation) {
    fetch("http://localhost:5001/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hour: new Date().getHours(),
        day_of_week: new Date().getDay(),
        queue_length: 80, // Increased to trigger anomaly
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let displayText = `${data.message} (Estimated wait: ${data.wait_time}, Recommended slot: ${data.recommended_slot})`;
        if (data.warning) {
          displayText += ` - ${data.warning}`;
        }
        aiRecommendation.textContent = displayText;
      })
      .catch((error) => {
        console.error("Error fetching recommendation:", error);
        aiRecommendation.textContent = "Unable to fetch recommendation";
      });
  }
});
