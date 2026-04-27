const settingsSec = document.getElementById('settings');
const estimatesSec = document.getElementById('estimates');


// setting section

const dailyViewsDiv = document.createElement('div');

const dailyViewsH1 = document.createElement('h1');
dailyViewsH1.innerText = "Daily Views";

const dailyViewsInp = document.createElement('input');
dailyViewsInp.type = "number";
dailyViewsInp.min = "0";
dailyViewsInp.max = "10000000";
dailyViewsInp.value = "1000";

dailyViewsDiv.appendChild(dailyViewsH1);
dailyViewsDiv.appendChild(dailyViewsInp);
settingsSec.appendChild(dailyViewsDiv);

const estimatedRPMdiv = document.createElement('div');

const estimatedRPMh1 = document.createElement('h1');
estimatedRPMh1.innerText = "Estimated RPM";

const estimatedRPMInp1 = document.createElement('input');
estimatedRPMInp1.type = "number";
estimatedRPMInp1.min = "0";
estimatedRPMInp1.max = "10";
estimatedRPMInp1.step = "0.25";
estimatedRPMInp1.value = "0.25";

const estimatedRPMInp2 = document.createElement('input');
estimatedRPMInp2.type = "number";
estimatedRPMInp2.min = "0.4";
estimatedRPMInp2.max = "10";
estimatedRPMInp2.step = "0.25";
estimatedRPMInp2.value = "4";


// ---- logic ----

function updateEstimates() {
    const dailyViews = Number(dailyViewsInp.value);
    const rpmMin = Number(estimatedRPMInp1.value);
    const rpmMax = Number(estimatedRPMInp2.value);

    const minRevenue = (dailyViews / 1000) * rpmMin;
    const maxRevenue = (dailyViews / 1000) * rpmMax;

    return [minRevenue, maxRevenue];
}

function syncInputs() {

    let rpm1 = Number(estimatedRPMInp1.value);
    let rpm2 = Number(estimatedRPMInp2.value);

    if (isNaN(rpm1) || rpm1 < 0) rpm1 = 0;
    if (isNaN(rpm2) || rpm2 < 0) rpm2 = 0;

    estimatedRPMInp1.value = rpm1;
    estimatedRPMInp2.value = rpm2;

    const maxAllowed = rpm2 - 0.05;

    if (rpm1 > maxAllowed) {
        estimatedRPMInp1.value = maxAllowed > 0 ? maxAllowed.toFixed(2) : "0";
    }

    renderEstimates();
}
estimatedRPMdiv.appendChild(estimatedRPMh1);
estimatedRPMdiv.appendChild(estimatedRPMInp1);
estimatedRPMdiv.appendChild(estimatedRPMInp2);
settingsSec.appendChild(estimatedRPMdiv);


// ---- estimates ----

let estimates = [
    ['Estimated Daily Earnings', 1],
    ['Estimated Monthly Earnings', 30],
    ['Estimated Yearly Earnings', 365]
];

estimatesSec.style = 'display: flex; flex-direction: column; align-items: center; justify-content: center;'

// store h2 elements (your style preserved)
let estimateH2s = [];

for (let estimate of estimates) {
    let estimateDiv = document.createElement('div');
    let estimateH2 = document.createElement('h2');
    let estimateH3 = document.createElement('h3');

    estimateH2.style = 'color: green;';
    estimateH3.innerText = estimate[0];

    estimateDiv.style = 'display: flex; flex-direction: column; align-items: center; justify-content: center;'

    estimateDiv.appendChild(estimateH2);
    estimateDiv.appendChild(estimateH3);
    estimatesSec.appendChild(estimateDiv);

    estimateH2s.push({
        element: estimateH2,
        multiplier: estimate[1]
    });
}


// ---- render ----

function renderEstimates() {
    let revenueEstimates = updateEstimates();

    for (let item of estimateH2s) {
        let min = (revenueEstimates[0] * item.multiplier).toFixed(2);
        let max = (revenueEstimates[1] * item.multiplier).toFixed(2);

        item.element.innerHTML = `$${min} - $${max}`;
    }
}


// ---- events ----

dailyViewsInp.addEventListener("input", renderEstimates);
estimatedRPMInp1.addEventListener("input", syncInputs);
estimatedRPMInp2.addEventListener("input", syncInputs);


renderEstimates();