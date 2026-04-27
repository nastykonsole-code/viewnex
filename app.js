import littleDescFunc from './littleDesc.js';
import detailedDataConstructor from './detailedData.js';
import creatorStatisticsConstructor from './creatorStatistics.js';
import videosConstructor from './videos.js';

const API_KEY = "AIzaSyBEQ3myFwJGEIaRE1fJPWv2VlGwYsYA9Zk";

const searchBtn = document.getElementById("searchChannel");
const inputSec = document.getElementById("channelInput");
const topSectionLD = document.getElementById("topSectionLD");
const bottomSectionLD = document.getElementById("bottomSectionLD");
const main = document.querySelector('main');

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    background: #222;
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 20;
    opacity: 1;
    transition: opacity 0.5s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = "0", 2000);
  setTimeout(() => toast.remove(), 2500);
}

const defaultTopSection = topSectionLD.innerHTML; 
const defaultBottomSection = bottomSectionLD.innerHTML;

export function restoreDefault() {
    topSectionLD.innerHTML = defaultTopSection; 
    bottomSectionLD.innerHTML = defaultBottomSection;
}

searchBtn.onclick = async function (event) {
  event.preventDefault();

  if (!inputSec.value.trim()) {
    showToast("Please enter a channel handle");
    return;
  }

  main.innerHTML = '';

  try {
    const chnHandle = inputSec.value.trim();

    // GET CHANNEL ID
    const urlHandle = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${chnHandle}&key=${API_KEY}`;
    const resultHandle = await (await fetch(urlHandle)).json();

    if (!resultHandle.items || resultHandle.items.length === 0) {
            showToast(`Channel "@${chnHandle}" not found. Please check the handle.`);
            restoreDefault()
            return;
    }
    const channelId = resultHandle.items[0].id;

    // CHANNEL DETAILS
    const urlId = `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id=${channelId}&key=${API_KEY}`;
    const resultId = await (await fetch(urlId)).json();
    const itemsId = resultId.items;


    // PLAYLIST
    const urlVideos = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=contentDetails`;
    const resultVideos = await (await fetch(urlVideos)).json();
    const uploadsPlaylistId = resultVideos.items[0].contentDetails.relatedPlaylists.uploads;

    // PLAYLIST ITEMS
    const urlPlaylist = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=50`;
    const resultPlaylist = await (await fetch(urlPlaylist)).json();
    const videos = resultPlaylist.items;

    if (!videos || videos.length === 0) {
      showToast("This channel has no public videos");
      bottomSectionLD.classList.remove('bottomSecLDFilled');
      bottomSectionLD.style = "display: flex; align-items:center; justify-content: center;";

      restoreDefault();
      return;
    }

    const videosIds = videos.map(v => v.snippet.resourceId.videoId).join(',');

    const urlStats = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videosIds}&part=statistics,snippet`;
    const resultStats = await (await fetch(urlStats)).json();

    // UI FUNCTIONS
    littleDescFunc(resultId, topSectionLD, bottomSectionLD, showToast);
    detailedDataConstructor(itemsId, main);
    creatorStatisticsConstructor(resultId, main, resultStats);
    videosConstructor(resultStats, main);

  } catch (err) {
    console.log(err);
    main.innerHTML = "";
    restoreDefault();
    showToast("Error loading channel data");
  }
};