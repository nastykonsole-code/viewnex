import formatNumbers from "./formatnumbers.js";

export default function littleDescFunc(resultId, topSectionLD, bottomSectionLD) {
  const item = resultId.items?.[0];
  if (!item) return;

  topSectionLD.innerHTML = "";
  bottomSectionLD.innerHTML = "";

  const banner = item.brandingSettings?.image?.bannerExternalUrl?.trim();

    const channelBanner = document.createElement("img");

    channelBanner.src = banner 
    ? banner + "=w2560" 
    : "unknownBanner.png";
    channelBanner.style.height = "100%";
    channelBanner.style.width = "100%";
    channelBanner.style.objectFit = "cover";

    channelBanner.classList.add("channelBanner");
    topSectionLD.appendChild(channelBanner);

  bottomSectionLD.classList.remove("bottomSectionLDTemp");
  bottomSectionLD.classList.add("bottomSecLDFilled");

  const btSLDleft = document.createElement("div");
  btSLDleft.classList.add("btSLDleft");

  const btSLDright = document.createElement("div");
  btSLDright.classList.add("btSLDright");

  bottomSectionLD.appendChild(btSLDleft);
  bottomSectionLD.appendChild(btSLDright);

  const channelLogo = document.createElement("img");
  channelLogo.src = item.snippet?.thumbnails?.high?.url || "unknownLogo.png";
  channelLogo.classList.add("logo");
  btSLDleft.appendChild(channelLogo);

  const chnTitHdDiv = document.createElement("div");

  const channelTitle = document.createElement("p");
  channelTitle.innerText = item.snippet?.title || "Unknown";

  const channelHandle = document.createElement("p");
  channelHandle.innerText = item.snippet?.customUrl || "";

  chnTitHdDiv.appendChild(channelTitle);
  chnTitHdDiv.appendChild(channelHandle);
  btSLDleft.appendChild(chnTitHdDiv);

  const chnSubs = item.statistics?.subscriberCount || 0;
  const chnView = item.statistics?.viewCount || 0;
  const chnVideos = item.statistics?.videoCount || 0;

  const chnPublished = new Date(item.snippet?.publishedAt);
  const chnPubPol = chnPublished.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    [chnSubs, "Subscribers:"],
    [chnView, "Views:"],
    [chnVideos, "Videos:"]
  ];

  for (let stat of stats) {
    const statDiv = document.createElement("div");
    statDiv.classList.add("statDiv");

    const statLabel = document.createElement("b");
    statLabel.innerText = stat[1];

    const statValue = document.createElement("p");
    statValue.innerText = formatNumbers(stat[0]);

    statDiv.appendChild(statLabel);
    statDiv.appendChild(statValue);
    btSLDright.appendChild(statDiv);
  }

  const createdDataDiv = document.createElement("div");
  createdDataDiv.classList.add("statDiv");

  const createdDateLabel = document.createElement("b");
  createdDateLabel.innerText = "Created at:";

  const createdDateValue = document.createElement("p");
  createdDateValue.innerText = chnPubPol; // keep your date format untouched

  createdDataDiv.appendChild(createdDateLabel);
  createdDataDiv.appendChild(createdDateValue);
  btSLDright.appendChild(createdDataDiv);
}