
import formatNumbers from './formatnumbers.js';

const youtubeRPM = {
  1: [2, 8],
  2: [3, 12],
  10: [0.5, 2],
  15: [1, 5],
  17: [2, 8],
  18: [1, 4],
  19: [2, 8],
  20: [1, 5],
  21: [1, 4],
  22: [1, 4],
  23: [1, 4],
  24: [0.5, 4],
  25: [2, 6],
  26: [3, 10],
  27: [4, 12],
  28: [5, 15],
  29: [3, 12],
  30: [5, 20],
  31: [2, 10],
  32: [2, 8],
  33: [2, 8],
  34: [1, 4],
  35: [5, 15],
  36: [3, 10],
  37: [2, 8],
  38: [2, 8],
  39: [3, 12],
  40: [3, 12],
  41: [3, 10],
  42: [0.5, 4],
  43: [2, 10],
  44: [2, 10]
};

export default function videosConstructor(resultStats, main) {

    let videoSection = document.createElement('div');
    videoSection.classList.add('videoSection');

    let videoHeaderSection = document.createElement('div');
    videoHeaderSection.classList.add('videoHeaderSection');

    let videoListSection = document.createElement('div');
    videoListSection.classList.add('videoListSection');

    let vHSh3 = document.createElement('h3');
    let selectDiv = document.createElement('div');
    selectDiv.classList.add('customSelect');
    let selected = document.createElement('div');
    selected.innerText = "5 videos";
    selected.classList.add('select');
    selectDiv.appendChild(selected);
    let options = document.createElement('div');
    options.classList.add('options');
    options.style.display = "none";
    selectDiv.appendChild(options);

    let op = 5;
    let selectARR = [
          [5, "5 videos"],
          [10, "10 videos"],
          [14, "14 videos"],
          [30, "30 videos"]
        ];

    for (let item of selectARR) {
        let divOpt = document.createElement('div');
        divOpt.dataset.value = item[0];
        divOpt.innerText = item[1];
        options.appendChild(divOpt);
        divOpt.classList.add('option');
        divOpt.addEventListener('click', () => {
            selected.textContent = item[1];
            op = item[0];
            options.style.display = "none";
            updateLabel();
        });
    }

    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        options.style.display = options.style.display === "block" ? "none" : "block";
    });

    document.addEventListener('click', (e) => {
        if (!selectDiv.contains(e.target)) {
            options.style.display = "none";
        }
    });

    function updateLabel() {
        videoListSection.innerHTML = '';
        vHSh3.innerText = `Last ${op} videos`;
        let videoARR = resultStats.items;
        let limit = Math.min(op, videoARR.length);

        for (let i = 0; i < limit; i++) {
            let video = videoARR[i];
            if (!video || !video.snippet) continue;

            let thumbnailURL = video.snippet.thumbnails.maxres?.url ||
                              video.snippet.thumbnails.standard?.url ||
                              video.snippet.thumbnails.high?.url;

            let vTitle = video.snippet.title;
            let vViews = video.statistics?.viewCount || 0;
            let vLikes = video.statistics?.likeCount || 0;
            let videoID = video.id;
            let videoURL = `https://www.youtube.com/watch?v=${videoID}`;
            let vDescription = video.snippet?.description || `No description for video`;
            let vComment = video.statistics?.commentCount || 0;
            let categoryId = Number(video.snippet.categoryId);

            let vStats = [
                [vViews, "Video views count:"],
                [vLikes, "Video likes count:"],
                [vComment, "Video comment count:"]
            ];

            let videoContainer = document.createElement('div');
            videoContainer.classList.add('vLSElement');

            let divPT1 = document.createElement('div');
            divPT1.classList.add('partVideo');
            let img = document.createElement('img');
            img.src = thumbnailURL;
            img.classList.add('thumbnail');
            let link = document.createElement('a');
            link.href = videoURL;
            link.target = "_blank";
            link.appendChild(img);
            divPT1.appendChild(link);

            let divPT2 = document.createElement('div');
            divPT2.classList.add('partText');
            divPT2.innerText = vTitle;

            let divPT3 = document.createElement('div');
            divPT3.classList.add('partText');
            divPT3.innerHTML = `<i class="fa-solid fa-eye"></i> ${vViews}`;

            let divPT4 = document.createElement('div');
            divPT4.classList.add('partButton');
            let btn = document.createElement('button');
            btn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
            btn.classList.add('moreData');
            divPT4.appendChild(btn);

            // === FIXED TOGGLE LOGIC ===
            let isOpen = false;

            btn.addEventListener('click', () => {
                isOpen = !isOpen;

                if (isOpen) {
                    // Expand
                    btn.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
                    videoContainer.classList.add('vLSElementBigger');
                    
                    divPT2.innerHTML = "";
                    divPT3.innerHTML = "";

                    let divPT2top = document.createElement('div');
                    let divPT2bottom = document.createElement('div');
                    divPT2top.style = `height: 30%; text-align: center; font-size: 15px; overflow: auto;`;
                    divPT2top.innerText = vTitle;
                    divPT2bottom.style = `height: 70%; display: grid; gap: 1%; grid-template-columns: 1fr 1fr;`;

                    for (let vStat of vStats) {
                        let statDiv = document.createElement('div');
                        statDiv.style = `height: 44%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;`;
                        let statH5 = document.createElement('h5');
                        statH5.innerText = formatNumbers(vStat[0]);
                        statH5.style = `margin-bottom: -10px; font-size: 15px; font-weight: bold;`;
                        let statP = document.createElement('p');
                        statP.innerText = vStat[1];
                        statP.style = `font-size: 9px; color: gray;`;
                        statDiv.appendChild(statH5);
                        statDiv.appendChild(statP);
                        divPT2bottom.appendChild(statDiv);
                    }

                    let descDiv = document.createElement('div');
                    descDiv.style = `width: 100%; max-height: 60px; overflow: auto; font-size: 12px; margin-top: 5px;`;
                    descDiv.innerText = vDescription;
                    divPT2bottom.appendChild(descDiv);

                    divPT2.appendChild(divPT2top);
                    divPT2.appendChild(divPT2bottom);

                    // Subscriber & Revenue (your original code)
                    function estimateSubscribersRange(views, kMin = 0.2, kMax = 3) {
                        return {
                            min: Math.floor((views / 1000) * kMin),
                            max: Math.floor((views / 1000) * kMax)
                        };
                    }

                    let rpmRange = youtubeRPM[categoryId] || [0.5, 4];
                    let rangeSubs = estimateSubscribersRange(vViews);

                    let divPT3subs = document.createElement('div');
                    let divPT3subH5 = document.createElement('h5');
                    let divPT3subP = document.createElement('p');
                    divPT3subH5.style.fontSize = "15px";
                    divPT3subH5.innerText = `${formatNumbers(rangeSubs.min)}-${formatNumbers(rangeSubs.max)}`;
                    divPT3subP.innerText = "Estimated Subscriber Gain";
                    divPT3subs.appendChild(divPT3subP);
                    divPT3subs.appendChild(divPT3subH5);
                    divPT3.appendChild(divPT3subs);

                    let divPT3revenue = document.createElement('div');
                    let divPT3revenueH5 = document.createElement('h5');
                    let divPT3revenueP = document.createElement('p');
                    divPT3revenueH5.style.fontSize = "15px";
                    let minRevenue = (vViews / 1000) * rpmRange[0];
                    let maxRevenue = (vViews / 1000) * rpmRange[1];
                    divPT3revenueH5.innerText = `${formatNumbers(Math.round(minRevenue))}$-${formatNumbers(Math.round(maxRevenue))}$`;
                    divPT3revenueP.innerText = "Estimated Revenue";
                    divPT3revenue.appendChild(divPT3revenueP);
                    divPT3revenue.appendChild(divPT3revenueH5);
                    divPT3.appendChild(divPT3revenue);

                } else {
                    // Collapse - Return to original state
                    btn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
                    videoContainer.classList.remove('vLSElementBigger');
                    divPT2.innerHTML = vTitle;
                    divPT3.innerHTML = `<i class="fa-solid fa-eye"></i> ${formatNumbers(vViews)}`;
                }
            });

            // Append parts
            videoContainer.appendChild(divPT1);
            videoContainer.appendChild(divPT2);
            videoContainer.appendChild(divPT3);
            videoContainer.appendChild(divPT4);
            videoListSection.appendChild(videoContainer);
        }
    }

    updateLabel();

    // =========================
    // APPEND UI
    // =========================
    videoHeaderSection.appendChild(vHSh3);
    videoHeaderSection.appendChild(selectDiv);
    videoSection.appendChild(videoHeaderSection);
    videoSection.appendChild(videoListSection);
    main.appendChild(videoSection);
}