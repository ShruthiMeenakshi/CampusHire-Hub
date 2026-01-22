const data = {
    totalStudents: 8,
    placed: 7,

    salaries: {
        "3–5 LPA": 2,
        "5–8 LPA": 3,
        "8–12 LPA": 1,
        "12+ LPA": 1
    },

    companies: {
        "TCS": 3,
        "Infosys": 2,
        "Accenture": 2,
        "Zoho": 2,
        "Startup": 2
    },

    departments: {
        "CSE": 5,
        "IT": 3,
        "ECE": 2,
        "EEE": 1
    },

    offerCount: {
        "1 Offer": 4,
        "2 Offers": 2,
        "3+ Offers": 1
    },

    salaryValues: [4, 6, 7, 9, 13, 5, 8]
};

/* KPI VALUES */
document.getElementById("totalStudents").textContent = data.totalStudents;
document.getElementById("studentsPlaced").textContent = data.placed;
document.getElementById("placementPercent").textContent =
    ((data.placed / data.totalStudents) * 100).toFixed(1) + "%";

document.getElementById("totalCompanies").textContent =
    Object.keys(data.companies).length;

document.getElementById("totalOffers").textContent =
    Object.values(data.companies).reduce((a, b) => a + b, 0);

document.getElementById("avgSalary").textContent =
    (data.salaryValues.reduce((a, b) => a + b, 0) / data.salaryValues.length).toFixed(1);

document.getElementById("maxSalary").textContent =
    Math.max(...data.salaryValues);

/* COLORS */
const colors = ["#4fd1c5", "#6c7cff", "#f6ad55", "#c084fc", "#fb7185"];

/* PLACEMENT STATUS */
new Chart(placementChart, {
    type: "doughnut",
    data: {
        labels: ["Placed", "Not Placed"],
        datasets: [{
            data: [data.placed, data.totalStudents - data.placed],
            backgroundColor: ["#4fd1c5", "#fb7185"]
        }]
    }
});

/* SALARY DISTRIBUTION */
new Chart(salaryChart, {
    type: "bar",
    data: {
        labels: Object.keys(data.salaries),
        datasets: [{
            data: Object.values(data.salaries).map(
                v => ((v / data.placed) * 100).toFixed(1)
            ),
            backgroundColor: colors
        }]
    },
    options: {
        scales: {
            y: { ticks: { callback: v => v + "%" } }
        },
        plugins: { legend: { display: false } }
    }
});

/* COMPANY OFFERS */
new Chart(companyChart, {
    type: "pie",
    data: {
        labels: Object.keys(data.companies),
        datasets: [{
            data: Object.values(data.companies),
            backgroundColor: colors
        }]
    }
});

/* DEPARTMENT OFFERS */
new Chart(deptChart, {
    type: "bar",
    data: {
        labels: Object.keys(data.departments),
        datasets: [{
            data: Object.values(data.departments),
            backgroundColor: "#6c7cff"
        }]
    },
    options: {
        plugins: { legend: { display: false } }
    }
});

/* OFFER COUNT */
new Chart(offerCountChart, {
    type: "doughnut",
    data: {
        labels: Object.keys(data.offerCount),
        datasets: [{
            data: Object.values(data.offerCount),
            backgroundColor: ["#4fd1c5", "#f6ad55", "#c084fc"]
        }]
    }
});
