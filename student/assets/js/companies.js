

const container = document.getElementById("companiesContainer");
const searchInput = document.getElementById("searchBox");
const filterSelect = document.getElementById("ctcFilter");

let allCompanies = [];

fetch("assets/data/companies.json")
    .then(res => res.json())
    .then(data => {
        allCompanies = data;
        renderCompanies(allCompanies);
    });

function renderCompanies(companies) {
    container.innerHTML = "";

    companies.forEach(company => {
        const card = document.createElement("div");
        card.className = "company-card";

        card.innerHTML = `
            <img src="${company.logo}" alt="${company.name}" style="height:50px; margin-bottom:10px;">
            <h3>${company.name}</h3>
            <p>Role: ${company.role}</p>
            <p>CTC: ${company.ctc} LPA</p>
            <button>Visit Website</button>
        `;

        card.onclick = () => {
            window.open(company.website, "_blank");
        };

        container.appendChild(card);
    });
}

// Search
searchInput.addEventListener("input", () => {
    applyFilters();
});

// Filter
filterSelect.addEventListener("change", () => {
    applyFilters();
});

function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const minCTC = parseInt(filterSelect.value);

    let filtered = allCompanies.filter(c =>
        c.name.toLowerCase().includes(searchText) &&
        (isNaN(minCTC) || c.ctc >= minCTC)
    );

    renderCompanies(filtered);
}
