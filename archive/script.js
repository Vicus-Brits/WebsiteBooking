// Call populateRadioList on page load
document.addEventListener("DOMContentLoaded", () => {
  populateRadioList(radioItems);
});
// Call displayPharmacies on page load
document.addEventListener("DOMContentLoaded", () => {
  displayPharmacies(pharmaciesJson);
});

function populateRadioList(items) {
  const radioList = document.getElementById("radioList");

  items.forEach((item) => {
    const label = document.createElement("label");
    label.className = "radioItem";
    label.innerHTML = `<input type="radio" name="listItem" value="${item.value}"> ${item.label}`;
    radioList.appendChild(label);
  });
}

function toggleList() {
  const radioList = document.getElementById("radioList");

  if (radioList.classList.contains("hidden")) {
    radioList.classList.remove("hidden");
  } else {
    radioList.classList.add("hidden");
  }
}

function findPostalCode() {
  const postalCode = document.getElementById("postalCode").value;
  alert("Finding location for postal code:", postalCode);
  // Here you would add the code to process the postal code, such as an API call or a database query.
}

function displayPharmacies(pharmacies) {
  const container = document.getElementById("pharmaciesList");

  pharmacies.forEach((pharmacy) => {
    const pharmacyElement = document.createElement("div");
    pharmacyElement.className = "pharmacy";

    const nameElement = document.createElement("h2");
    nameElement.textContent = pharmacy.name;

    const addressElement = document.createElement("address");
    addressElement.textContent = pharmacy.address;

    // Create the booking button
    const bookingButton = document.createElement("button");
    bookingButton.textContent = "Book Appointment";
    bookingButton.className = "bookingButton"; // Add a class for styling if needed

    // Attach click event listener to the booking button
    bookingButton.addEventListener("click", function () {
      alert("Proceed to booking at " + pharmacy.name);
    });

    // Append elements to the pharmacy element
    pharmacyElement.appendChild(nameElement);
    pharmacyElement.appendChild(addressElement);
    pharmacyElement.appendChild(bookingButton); // Append the booking button

    // Append the pharmacy element to the container
    container.appendChild(pharmacyElement);
  });
}

// Function to generate a boolean value with a 70% chance of being true
function generateAvailability() {
  return Math.random() < 0.7; // 70% chance of true, 30% chance of false
}

document.addEventListener("DOMContentLoaded", function () {
  // Time Slot code start
  // Container for time slot buttons
  const timeSlotsContainer = document.getElementById("timeSlots");
  const startTime = 8; // Start time (8:00 AM)
  const endTime = 16.5; // End time (4:30 PM)

  // Function to format time
  function formatTime(hour) {
    const h = Math.floor(hour);
    const m = hour % 1 === 0 ? "00" : "30";
    return `${h < 10 ? "0" + h : h}:${m}`;
  }

  // Generate time slot buttons
  for (let hour = startTime; hour <= endTime; hour += 0.5) {
    const timeSlotString = formatTime(hour);
    const timeSlotButton = document.createElement("button");
    timeSlotButton.textContent = timeSlotString;
    timeSlotButton.type = "button"; // Prevent form submission
    timeSlotButton.className = "timeSlotButton"; // For styling
    timeSlotButton.addEventListener("click", function () {
      alert(`Time slot selected: ${timeSlotString}`);
    });

    timeSlotsContainer.appendChild(timeSlotButton);
  }
  // Time Slot code end

  // Container for date buttons
  const dateButtonsContainer = document.getElementById("dateButtons");

  // Arrays for weekdays and months
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Sample availability for demonstration (today + 7 days ahead)
  const availability = Array.from({ length: 8 }, () => generateAvailability());

  // Generate date buttons
  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateString = `${weekdays[date.getDay()]} ${date.getDate()} ${
      months[date.getMonth()]
    }`; // Format as "Thursday 28 March"

    const button = document.createElement("button");
    button.textContent = dateString;
    button.type = "button"; // Prevent form submission
    button.style.backgroundColor = availability[i] ? "blue" : "grey";
    button.addEventListener("click", function () {
      if (!availability[i]) {
        alert("Choose another date");
      } else {
        alert(`Date selected: ${dateString}`);
      }
    });

    dateButtonsContainer.appendChild(button);
  }
});

// Confirmation
document.addEventListener("DOMContentLoaded", function () {
  // Simulated selections - replace these with actual data from your application
  const pharmacyName = "Health Pharmacy";
  const servicesSelected = "General Consultation, Prescription Refill";
  const appointmentDate = "2024-04-15"; // Format: YYYY-MM-DD
  const appointmentTime = "10:30";

  document.getElementById("selectedPharmacy").textContent = pharmacyName;
  document.getElementById("selectedServices").textContent = servicesSelected;
  document.getElementById("selectedDate").textContent = appointmentDate;
  document.getElementById("selectedTime").textContent = appointmentTime;

  // Event listener for Edit button - implement navigation or action
  document.getElementById("editButton").addEventListener("click", function () {
    alert("Edit clicked - implement navigation or editing functionality");
  });

  // Event listener for Confirm button - implement confirmation action
  document
    .getElementById("confirmButton")
    .addEventListener("click", function () {
      alert("Confirm clicked - implement confirmation functionality");
    });
});

//data
const radioItems = [
  {
    id: "item1",
    value: "Blood Glucose Monitoring",
    label: "Blood Glucose Monitoring",
  },
  { id: "item2", value: "Blood Pressure Check", label: "Blood Pressure Check" },
  { id: "item3", value: "Cholesterol Test", label: "Cholesterol Test" },
  {
    id: "item4",
    value: "Weight Management clinic",
    label: "Weight Management clinic",
  },
  { id: "item5", value: "Travel Vaccinations", label: "Travel Vaccinations" },
];

const pharmaciesJson = [
  {
    name: "Health Pharmacy",
    address: "123 Wellness Road, Healthville",
  },
  {
    name: "CarePlus Pharmacy",
    address: "456 Care Street, Caretown",
  },
  // More pharmacies...
];

// TESCO INSTORE PHARMACY TESCO EXTRA, 117 STATION ROAD, ADDLESTONE, SURREY, KT15 2AS
// Telephone number:03456778999

// ADDLESTONE PHARMACY  92A STATION ROAD, ADDLESTONE, SURREY, KT15 2AD
// Telephone number:01932842592

// CHERTSEY PHARMACY   1 WEIR ROAD, CHERTSEY, SURREY, KT16 8NF
// Telephone number:01932976346

// The Pharmacy  20 CHURCH STREET, WEYBRIDGE, SURREY, KT13 8DX
// Telephone number:01932 847868

// Boots   27 HIGH STREET, WEYBRIDGE, SURREY, KT13 8AX
// Telephone number:01932842738

// Honeycomb Chemist  100 GUILDFORD STREET, CHERTSEY, SURREY, KT16 9AD
// Telephone number:01932564400

// CHURCH PHARMACY  99 QUEENS ROAD, WEYBRIDGE, SURREY, KT13 9UQ
// Telephone number:01932842632

// Oatlands Park Pharmacy 126 OATLANDS DRIVE, WEYBRIDGE, SURREY, KT13 9HL
// Telephone number:01932842171

// Trio Pharmacy 19-21 HIGH STREET, SHEPPERTON, MIDDLESEX, TW17 9AJ
// Telephone number:01932225900

// Cohens Chemist UNIT 1, WEST LODGE, STATION APPROACH, WEST BYFLEET, SURREY, KT14 6NG
// Telephone number:01932351439

// MAY & THOMSON 51 DARTMOUTH AVENUE, SHEERWATER, WOKING, SURREY, GU21 5PE
// Telephone number:01932346186

// https://www.nhs.uk/service-search/pharmacy/find-a-pharmacy/results/Addlestone?latitude=51.37068199183884&longitude=-0.49292486908107674

// https://timerise.io/sign-up/

// https://github.com/adamspd/django-appointment/blob/main/docs/explanation.md

// https://www.supersaas.com/info/features  -- this one
