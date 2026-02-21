// Get elements
const totalDisplay = document.getElementById("total");
const amountInput = document.getElementById("amount");
const addButton = document.getElementById("addButton");
const logList = document.getElementById("logList");
const progressBar = document.getElementById("progress-bar");

// Default daily goal
let dailyGoal = 2000;

// Track total water
let total = 0;

// Load saved total
if (localStorage.getItem("total")) {
    total = parseInt(localStorage.getItem("total"));
    totalDisplay.textContent = total;
    updateProgress();
}

// Load saved log
if (localStorage.getItem("log")) {
    const savedLog = JSON.parse(localStorage.getItem("log"));
    savedLog.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        logList.appendChild(li);
    });
}

// Add water button
addButton.addEventListener("click", () => {
    let amount = parseInt(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter valid amount!");
        return;
    }

    total += amount;
    totalDisplay.textContent = total;

    // Add to log
    const li = document.createElement("li");
    li.textContent = `Drank ${amount} ml`;
    logList.appendChild(li);

    // Save data
    localStorage.setItem("total", total);

    let logItems = [];
    logList.querySelectorAll("li").forEach(li => logItems.push(li.textContent));
    localStorage.setItem("log", JSON.stringify(logItems));

    updateProgress();

    amountInput.value = "";
});

// Update progress
function updateProgress() {
    let progress = (total / dailyGoal) * 100;
    if (progress > 100) progress = 100;

    progressBar.style.width = progress + "%";
    progressBar.textContent = Math.round(progress) + "%";
}