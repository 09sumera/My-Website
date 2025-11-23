// Get stored data from check page
const data = JSON.parse(localStorage.getItem("waterData"));

// Reference to card container
const container = document.getElementById("result-cards");

// Function to check each parameter
function checkStatus(name, value, min, max) {
    const safe = value >= min && value <= max;
    return `
        <div class="card">
            <h2>${name}</h2>
            <p>Value: <strong>${value}</strong></p>
            <p class="${safe ? "good" : "bad"}">
                ${safe ? "Safe" : "Unsafe"}
            </p>
        </div>
    `;
}

// Create cards
container.innerHTML = `
    ${checkStatus("pH", data.ph, 6.5, 8.5)}
    ${checkStatus("Turbidity (NTU)", data.turbidity, 0, 5)}
    ${checkStatus("TDS (mg/L)", data.tds, 0, 500)}
    ${checkStatus("Temperature (°C)", data.temp, 10, 35)}
    ${checkStatus("Chlorine (mg/L)", data.chlorine, 0.2, 1)}
`;
