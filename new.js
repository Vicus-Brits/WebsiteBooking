document.getElementById("btnBookPharmacy").addEventListener("click", () => {
  let town = document.getElementById("town").value.trim().toUpperCase();
  applicationState.Pharmacy.ptown = town;

  // Filter pharmacies based on the town and create a list
  let pharmaciesInTown = pharmaciesJSON.filter(
    (pharmacy) => pharmacy.ptown.toUpperCase() === town
  );
  let pharmaciesListHtml = pharmaciesInTown
    .map(
      (pharmacy) =>
        `<li>${pharmacy.pname} - ${pharmacy.paddress} (Tel: ${pharmacy.pphone})</li>`
    )
    .join("");

  // Update the townresults section with the list of pharmacies
  document.getElementById(
    "townresults"
  ).innerHTML = `<h1>Results for ${town}</h1>
       <ul>${pharmaciesListHtml}</ul>
       <button type="button" class="btnBack" data-back-target="bookpharmacy">Back</button>`;

  hideAllSectionsExcept("townresults");
});
