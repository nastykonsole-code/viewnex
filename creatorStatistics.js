import formatNumbers from "./formatnumbers.js";

export default async function creatorStatisticsConstructor(resultId, main, resultStats) {
  const existing = main.querySelector('.creatorStatistics');
  if (existing) existing.remove();

  let rSVideoArr = resultStats.items;

  let monthlyViews = 0;
  let monthlySubscribers = 0;
  let days30Ago = new Date();
  days30Ago.setDate(days30Ago.getDate() - 30);

  const recentVideos = rSVideoArr.filter(v => {
    const videoDate = new Date(v.snippet.publishedAt);
    return videoDate >= days30Ago;
  });

  for (let video of recentVideos) {
    monthlyViews += Number(video.statistics.viewCount);
  }

  let k = 0.005;
  let chnSubs = resultId.items[0].statistics.subscriberCount;
  let chnView = resultId.items[0].statistics.viewCount;

    if (chnSubs >= 1000000000) {
    k = 0.015;
  } else if (chnSubs >= 500000000) {
    k = 0.014;
  } else if (chnSubs >= 100000000) {
    k = 0.013;
  } else if (chnSubs >= 50000000) {
    k = 0.012;
  } else if (chnSubs >= 20000000) {
    k = 0.011;
  } else if (chnSubs >= 10000000) {
    k = 0.010;
  } else if (chnSubs >= 5000000) {
    k = 0.009;
  } else if (chnSubs >= 1000000) {
    k = 0.008;
  } else if (chnSubs >= 500000) {
    k = 0.007;
  } else if (chnSubs >= 100000) {
    k = 0.006;
  } else {
    k = 0.005;
  }

  let viewsWithoutMonth = (chnView - monthlyViews) * k;
  monthlyViews += viewsWithoutMonth;


  monthlySubscribers = monthlyViews * (k / 5);

  let minMonthlyRevenue = (monthlyViews * 0.7 / 1000) * 0.25;
  let maxMonthlyRevenue = (monthlyViews * 0.7 / 1000) * 12;
  let yearlyMinRevenue = minMonthlyRevenue * 12;
  let yearlyMaxRevenue = maxMonthlyRevenue * 12;

  let crSArr1 = [
    [formatNumbers(Math.round(monthlySubscribers)), "Subscribers for the last 30 days"],
    [formatNumbers(Math.round(monthlyViews)), "Views for the last 30 days"]
  ];
  let crSArr2 = [
    [formatNumbers(Math.round(minMonthlyRevenue)), formatNumbers(Math.round(maxMonthlyRevenue)), "Monthly Estimated Earnings"],
    [formatNumbers(Math.round(yearlyMinRevenue)), formatNumbers(Math.round(yearlyMaxRevenue)), "Yearly Estimated Earnings"]
  ];

  let creatorStatisticsElement = document.createElement('div');
  creatorStatisticsElement.classList.add('creatorStatistics');

  for (let stat of crSArr1) {
    let statDiv = document.createElement('div');
    let statH2 = document.createElement('h2');
    statH2.innerText = stat[0];
    let statP = document.createElement('p');
    statP.innerText = stat[1];
    statDiv.appendChild(statH2);
    statDiv.appendChild(statP);
    statDiv.classList.add('crSContainer');
    creatorStatisticsElement.appendChild(statDiv);
  }

  for (let stat of crSArr2) {
    let statDiv = document.createElement('div');
    let statH2 = document.createElement('h2');
    statH2.innerText = `$${stat[0]} - $${stat[1]}`;
    let statP = document.createElement('p');
    statP.innerText = stat[2];
    statDiv.appendChild(statH2);
    statDiv.appendChild(statP);
    statDiv.classList.add('crSContainer');
    creatorStatisticsElement.appendChild(statDiv);
  }

  main.appendChild(creatorStatisticsElement);
}