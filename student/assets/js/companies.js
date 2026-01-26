
const brandLogos = {
    google: "assets/media/logos/google.svg",
    amazon: "assets/media/logos/amazon.svg",
    microsoft: "assets/media/logos/microsoft.svg",
    tcs: "assets/media/logos/tcs.svg",
    infosys: "assets/media/logos/infosys.svg",
    zoho: "assets/media/logos/zoho.svg",
};


const container = document.getElementById("companiesContainer");
const searchInput = document.getElementById("searchBox");
const filterSelect = document.getElementById("ctcFilter");

let allCompanies = [];

fetch("assets/data/companies.json")
    .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
    })
    .then(data => {
        allCompanies = Array.isArray(data) ? data : [];
        renderCompanies(allCompanies);
    })
    .catch(err => {
        console.warn("Failed to load companies.json:", err);
        if (container) {
            container.innerHTML = '<div class="card" style="padding:12px;">Failed to load companies data. Please ensure the site is served over HTTP and try again.</div>';
        }
    });

function renderCompanies(companies) {
    if (!container) return;
    container.innerHTML = "";

    if (!companies || companies.length === 0) {
        const empty = document.createElement("div");
        empty.className = "card";
        empty.style.padding = "12px";
        empty.textContent = "No companies found. Try adjusting search or filters.";
        container.appendChild(empty);
        return;
    }

    companies.forEach(company => {
        const card = document.createElement("div");
        card.className = "company-card";

        const key = (company.name || '').toLowerCase();
        const localLogo = brandLogos[key] || null;
        const logoSrc = localLogo || company.logo || "assets/media/logo-placeholder.svg";

        const safeLogo = company.logo || "https://via.placeholder.com/120x50?text=Logo";
        const role = company.role || "—";
        const ctc = typeof company.ctc === "number" ? company.ctc : "—";

        card.innerHTML = `
            <img src="${logoSrc}" alt="${company.name}" style="height:50px; margin-bottom:10px;" onerror="this.src='assets/media/logo-placeholder.svg';this.onerror=null;">
            <h3>${company.name || 'Company'}</h3>
            <p>Role: ${role}</p>
            <p>CTC: ${ctc} LPA</p>
            <button>Visit Website</button>
        `;

        card.onclick = () => {
            const url = company.website || "#";
            if (url && url !== "#") window.open(url, "_blank", "noopener");
        };

        container.appendChild(card);
    });
}

// Search
if (searchInput) {
    searchInput.addEventListener("input", () => {
        applyFilters();
    });
}

// Filter
if (filterSelect) {
    filterSelect.addEventListener("change", () => {
        applyFilters();
    });
}

function applyFilters() {
    const searchText = (searchInput?.value || '').toLowerCase();
    const minCTC = parseInt(filterSelect?.value);

    let filtered = allCompanies.filter(c =>
        c.name.toLowerCase().includes(searchText) &&
        (isNaN(minCTC) || c.ctc >= minCTC)
    );

    renderCompanies(filtered);
}
