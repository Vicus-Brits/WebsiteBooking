// On load events and listeners
document.addEventListener("DOMContentLoaded", (event) => {
  //Application State
  let applicationState = {
    Client: {
      requestarea: "",
      name: "",
      surname: "",
      email: "",
      postalcode: "",
    },
    Pharmacy: {
      pname: "",
      paddress: "",
      ptown: "",
      pcounty: "",
      ppostalcode: "",
      pphone: "",
      isbookable: true,
    },
    Service: { stype: "", sname: "" },
    Booking: { day: "", hour: "" },
    Confirmation: { isconfirmed: false },
  };

  hideAllSectionsExcept("bookpharmacy");

  // Reference to the town input box and the Find Pharmacies button
  let townInput = document.getElementById("town");
  let findPharmaciesButton = document.getElementById("btnBookPharmacy");

  // Initially disable the button until input is detected
  findPharmaciesButton.disabled = true;
  findPharmaciesButton.style.opacity = "0.5"; // Make button look disabled (greyed out)

  // Event listener for the input event on the town input box
  townInput.addEventListener("input", () => {
    // Check if there's any text in the input
    if (townInput.value.trim().length > 0) {
      // There's text, enable the button
      findPharmaciesButton.disabled = false;
      findPharmaciesButton.style.opacity = "1"; // Return button opacity to default
    } else {
      // No text, disable the button
      findPharmaciesButton.disabled = true;
      findPharmaciesButton.style.opacity = "0.5"; // Make button look disabled
    }
    // Update applicationState with the current input
    applicationState.Client.requestarea = townInput.value.trim();
  });

  populateServices("NHSPharmacyFirst", servicesJSON["NHS Pharmacy First"]);
  populateServices("NHSFree", servicesJSON["NHS Free"]);
  populateServices("PrivateServices", servicesJSON["Private Services"]);

  document.getElementById("btnBookPharmacy").addEventListener("click", () => {
    let town = document.getElementById("town").value.trim().toUpperCase(); // Ensure case-insensitive matching
    applicationState.Pharmacy.ptown = town;
    //Set H1 for town results
    document
      .getElementById("townresults")
      .getElementsByTagName("h1")[0].textContent = `Results for ${town}`;

    // Clear existing town results
    // add div pharmacyList
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "pharmacyList";
    document.getElementById("townresults").appendChild(resultsContainer);

    // Filter pharmacies based on town and display results
    const matchingPharmacies = pharmaciesJSON.filter(
      (pharmacy) => pharmacy.ptown.toUpperCase() === town
    );
    displayPharmacies(matchingPharmacies);

    hideAllSectionsExcept("townresults");
  });

  document.getElementById("btnSelectService").addEventListener("click", () => {
    hideAllSectionsExcept("services");
  });

  document.getElementById("btnServices").addEventListener("click", () => {
    const serviceRadios = document.querySelectorAll(
      '#services input[type="radio"]'
    );
    const selectedRadio = Array.from(serviceRadios).find(
      (radio) => radio.checked
    );

    if (!selectedRadio) {
      alert("Please select a service");
      return; // Exit the function if no service is selected
    }

    // Persist the selected service to applicationState
    applicationState.Service.sname = selectedRadio.value;
    applicationState.Service.stype = selectedRadio.closest("div[id]").id;

    const selectServiceSection = document.getElementById("selectservice");
    const selectedServiceH1 = selectServiceSection.querySelectorAll("h1")[0];

    // Ensure the h2 element for displaying the selected service name exists or create it
    let serviceH2 =
      selectedServiceH1.nextElementSibling.tagName !== "H2"
        ? document.createElement("h2")
        : selectedServiceH1.nextElementSibling;
    if (selectedServiceH1.nextElementSibling.tagName !== "H2") {
      selectedServiceH1.insertAdjacentElement("afterend", serviceH2);
    }
    // Update the h2 content with the selected service's name
    serviceH2.textContent = applicationState.Service.sname;

    // Proceeding with adding pharmacies list
    const pharmacyH1 = selectServiceSection.querySelectorAll("h1")[1]; // The "Select Pharmacy" h1 element
    const existingList = selectServiceSection.querySelector(".pharmacy-list");
    if (existingList) {
      existingList.remove(); // Remove existing list to avoid duplication
    }

    const pharmacyList = document.createElement("div");
    pharmacyList.className = "pharmacy-list";

    // Filter pharmacies from pharmaciesJSON where ptown matches the one in applicationState
    const filteredPharmacies = pharmaciesJSON.filter(
      (pharmacy) => pharmacy.ptown === applicationState.Pharmacy.ptown
    );

    // Generate list items for each filtered pharmacy
    filteredPharmacies.forEach((pharmacy) => {
      const item = document.createElement("div");
      item.className = "pharmacy-item";
      item.innerHTML = `<p><strong>${pharmacy.pname}</strong></p><p>${pharmacy.paddress}</p>`;

      const bookNowBtn = document.createElement("button");
      bookNowBtn.type = "button";
      bookNowBtn.className = "book-now-btn";
      bookNowBtn.textContent = "Book Now";

      bookNowBtn.addEventListener("click", () => {
        // Store the selected pharmacy's name and address in applicationState.Pharmacy
        applicationState.Pharmacy.pname = pharmacy.pname;
        applicationState.Pharmacy.paddress = pharmacy.paddress;

        // Navigate to the booking time screen
        hideAllSectionsExcept("booktime");
      });

      item.appendChild(bookNowBtn);
      pharmacyList.appendChild(item);
    });

    // Insert the pharmacy list into the DOM after the Select Pharmacy h1
    pharmacyH1.insertAdjacentElement("afterend", pharmacyList);

    // Hide all sections except selectservice to show the updated section to the user
    populateBookTime();
    hideAllSectionsExcept("selectservice");
  });

  function hideAllSectionsExcept(visibleSectionId) {
    const sections = document.querySelectorAll(".mainContainer > div");
    sections.forEach((section) => {
      section.style.display =
        section.id === visibleSectionId ? "block" : "none";
    });
  }

  // document
  //   .getElementById("btnSelectedServiceRename")
  //   .addEventListener("click", () => {
  //     hideAllSectionsExcept("booktime");
  //   });

  document.getElementById("btnBookTime").addEventListener("click", () => {
    hideAllSectionsExcept("clientdetail");
  });

  document.getElementById("btnClientDetail").addEventListener("click", () => {
    hideAllSectionsExcept("confirmation");
  });

  document.getElementById("btnConfirmation").addEventListener("click", () => {
    hideAllSectionsExcept("bookpharmacy");
  });

  document.getElementById("btnClientDetail").addEventListener("click", () => {
    hideAllSectionsExcept("bookpharmacy");
    displayConfirmation();
    hideAllSectionsExcept("confirmation");
  });

  document.querySelectorAll(".btnBack").forEach((button) => {
    button.addEventListener("click", function () {
      const targetSectionId = this.getAttribute("data-back-target");
      hideAllSectionsExcept(targetSectionId);
    });
  });
});

// function to hide all sections except the one with the specified ID
function hideAllSectionsExcept(visibleSectionId) {
  const sections = [
    "bookpharmacy",
    "townresults",
    "services",
    "selectservice",
    "booktime",
    "clientdetail",
    "confirmation",
  ];

  sections.forEach((sectionId) => {
    document.getElementById(sectionId).style.display =
      sectionId === visibleSectionId ? "block" : "none";
  });
}
// function to display pharmacies based on the town
function displayPharmacies(pharmacies) {
  const list =
    document.getElementById("pharmacyList") || document.createElement("div");
  list.innerHTML = ""; // Clear previous results
  if (!list.id) list.id = "pharmacyList"; // Ensure the element has the correct ID

  if (pharmacies.length === 0) {
    list.textContent = "No pharmacies found for the specified town.";
  } else {
    pharmacies.forEach((pharmacy) => {
      const pharmacyDiv = document.createElement("div");
      pharmacyDiv.className = "pharmacy";
      pharmacyDiv.innerHTML = `
        <p><strong>Name:</strong> ${pharmacy.pname}</p>
        <p><strong>Address:</strong> ${pharmacy.paddress}</p>
        <p><strong>Bookable:</strong> ${pharmacy.isbookable ? "Yes" : "No"}</p>
      `;
      list.appendChild(pharmacyDiv);
    });
  }

  const container = document.getElementById("townresults");
  if (!document.getElementById("pharmacyList")) {
    container.appendChild(list);
  }
}

function populateServices(containerId, services) {
  const container = document.getElementById(containerId);
  const title = document.createElement("div");
  title.className = "serviceTitle";
  title.textContent = containerId.replace(/([A-Z])/g, " $1").trim();
  container.appendChild(title);

  const list = document.createElement("div");
  list.className = "serviceItems hidden";

  services.forEach((service, index) => {
    const itemLabel = document.createElement("label");
    itemLabel.className = "serviceItemLabel";

    const item = document.createElement("input");
    item.type = "radio";
    // Use the same name for all radio buttons across categories
    item.name = "selectedService";
    item.id = `service-${index}-${containerId}`;
    item.value = service.serviceItem;

    const description = document.createElement("span");
    description.textContent = service.serviceItem;

    itemLabel.appendChild(item);
    itemLabel.appendChild(description);
    list.appendChild(itemLabel);
  });

  container.appendChild(list);

  title.addEventListener("click", () => {
    list.classList.toggle("hidden");
    title.classList.toggle("active");
  });
}

function populateBookTime() {
  const bookTimeSection = document.getElementById("booktime");
  bookTimeSection.innerHTML = "<h1>Select a Date</h1>"; // Reset the content

  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const dateButton = document.createElement("button");
    dateButton.textContent = date.toDateString();
    dateButton.className = "date-button";
    dateButton.type = "button";

    dateButton.addEventListener("click", () => {
      populateTimeSlots(date); // Populate the time slots for the selected date
      alert(`You selected: ${date.toDateString()}`);
    });

    bookTimeSection.appendChild(dateButton);
  }
}

function populateTimeSlots(selectedDate) {
  const timeSlotsSection = document.createElement("div");
  timeSlotsSection.className = "time-slots";

  // Remove previous time slots section if it exists
  const existingTimeSlots = document.querySelector(".time-slots");
  if (existingTimeSlots) {
    existingTimeSlots.remove();
  }

  // Generate time slot buttons
  let time = new Date(selectedDate.setHours(8, 0, 0, 0)); // Start at 08:00
  for (let i = 0; i < 18; i++) {
    const timeSlotButton = document.createElement("button");
    const timeSlotText = `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    timeSlotButton.textContent = timeSlotText;
    timeSlotButton.className = "time-slot-button";
    timeSlotButton.type = "button";

    timeSlotButton.addEventListener("click", () => {
      // Update applicationState with the selected timeslot
      applicationState.Booking.day = selectedDate.toDateString();
      applicationState.Booking.hour = timeSlotText;

      alert(`You selected: ${timeSlotText} on ${selectedDate.toDateString()}`);

      // Navigate to the client detail screen
      hideAllSectionsExcept("clientdetail");
    });

    timeSlotsSection.appendChild(timeSlotButton);

    // Increment by 30 minutes for the next button
    time = new Date(time.getTime() + 30 * 60 * 1000);
  }

  // Append the time slots section after the date buttons
  document.getElementById("booktime").appendChild(timeSlotsSection);
}

// DATA Lookup for pharmacies and services
const pharmaciesJSON = [
  // ADDLESTONE PHARMACY  92A STATION ROAD, ADDLESTONE, SURREY, KT15 2AD
  // Telephone number:01932842592
  {
    pname: "TESCO INSTORE PHARMACY TESCO EXTRA",
    paddress: "92A STATION ROAD, ADDLESTONE, SURREY, KT15 2AD",
    ptown: "ADDLESTONE",
    pcounty: "SURREY",
    ppostalcode: "KT15 2AS",
    pphone: "03456778999",
    isbookable: true,
  },

  // CHERTSEY PHARMACY   1 WEIR ROAD, CHERTSEY, SURREY, KT16 8NF
  // Telephone number:01932976346
  {
    pname: "CHERTSEY PHARMACY ",
    paddress: "1 WEIR ROAD, CHERTSEY, SURREY, KT16 8NF",
    ptown: "CHERTSEY",
    pcounty: "SURREY",
    ppostalcode: "KT16 8NF",
    pphone: "01932976346",
    isbookable: true,
  },
  // The Pharmacy  20 CHURCH STREET, WEYBRIDGE, SURREY, KT13 8DX
  // Telephone number:01932 847868
  {
    pname: "The Pharmacy",
    paddress: "20 CHURCH STREET, WEYBRIDGE, SURREY, KT13 8DX",
    ptown: "WEYBRIDGE",
    pcounty: "SURREY",
    ppostalcode: "KT13 8DX",
    pphone: "01932 847868",
    isbookable: false,
  },
  // Boots   27 HIGH STREET, WEYBRIDGE, SURREY, KT13 8AX
  // Telephone number:01932842738
  {
    pname: "Boots",
    paddress: "27 HIGH STREET, WEYBRIDGE, SURREY, KT13 8AX",
    ptown: "WEYBRIDGE",
    pcounty: "SURREY",
    ppostalcode: "KT13 8AX",
    pphone: "01932842738",
    isbookable: true,
  },

  // Honeycomb Chemist  100 GUILDFORD STREET, CHERTSEY, SURREY, KT16 9AD
  // Telephone number:01932564400

  // CHURCH PHARMACY  99 QUEENS ROAD, WEYBRIDGE, SURREY, KT13 9UQ
  // Telephone number:01932842632
  {
    pname: "CHURCH PHARMACY",
    paddress: "99 QUEENS ROAD, WEYBRIDGE, SURREY, KT13 9UQ",
    ptown: "WEYBRIDGE",
    pcounty: "SURREY",
    ppostalcode: "KT13 9UQ",
    pphone: "01932842632",
    isbookable: false,
  },

  // Oatlands Park Pharmacy 126 OATLANDS DRIVE, WEYBRIDGE, SURREY, KT13 9HL
  // Telephone number:01932842171

  // Trio Pharmacy 19-21 HIGH STREET, SHEPPERTON, MIDDLESEX, TW17 9AJ
  // Telephone number:01932225900

  // Cohens Chemist UNIT 1, WEST LODGE, STATION APPROACH, WEST BYFLEET, SURREY, KT14 6NG
  // Telephone number:01932351439

  // MAY & THOMSON 51 DARTMOUTH AVENUE, SHEERWATER, WOKING, SURREY, GU21 5PE
  // Telephone number:01932346186
];

const servicesJSON = {
  "NHS Pharmacy First": [
    { serviceItem: "Flu Check" },
    { serviceItem: "Repeat Chronic Medication" },
  ],
  "NHS Free": [
    { serviceItem: "Cholesterol Check" },
    { serviceItem: "Flu Shot" },
    { serviceItem: "Vitamin B Injection" },
  ],
  "Private Services": [
    { serviceItem: "Blood Glucose Monitoring" },
    { serviceItem: "Blood Pressure Check" },
    { serviceItem: "Cholesterol Check" },
    { serviceItem: "Travel Vaccinations" },
  ],
};
