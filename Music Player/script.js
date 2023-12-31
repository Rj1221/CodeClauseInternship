const audio = new Audio();
const playlist = [];

let currentSongIndex = 0;
let isPlaying = false;
let isSongSelected = false;
let isLooping = false;

// Canvas
const canvas = document.getElementById("my-canvas");
const canvasContext = canvas.getContext("2d");
const waveWidth = 5;
const waveSpacing = 5;
let animationFrameId;

// Different colors for the waves
const rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "hotpink", "cyan", "magenta", "lime", "crimson", "purple", "pink", "teal", "brown", "maroon", "olive", "navy", "skyblue", "lightgreen", "gold", "silver", "black", "white"];
let rainbowColorIndex = 0;
// For the audio visualizer
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
// Adding the audio source
const audioSource = audioContext.createMediaElementSource(audio);
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

// For the audio visualizer
const animationSpeed = 0.5;
// For Generating the waves
function drawWaves() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    const currentTime = audio.currentTime;
    const totalTime = audio.duration;
    const progress = currentTime / totalTime;

    const numWaves = Math.floor(canvas.width / (waveWidth + waveSpacing));
    const waveHeight = canvas.height * 0.5;

    for (let i = 0; i < numWaves; i++) {
        const waveCenterX = i * (waveWidth + waveSpacing) + waveWidth * 0.5;
        const waveAmplitude = waveHeight * 0.8;
        const waveOffset = canvas.height * 0.5;
        const dataArrayIndex = Math.floor((waveCenterX / canvas.width) * bufferLength);
        const frequencyValue = dataArray[dataArrayIndex] / 255;

        const waveFrequency = 0.9 + frequencyValue * 1.5;
        const waveSpeed = animationSpeed * (1 + frequencyValue * 3);
        const waveColor = rainbowColors[(i + rainbowColorIndex) % rainbowColors.length];
        let waveY;

        if (isPlaying) {
            waveY = waveOffset + waveAmplitude * (frequencyValue * Math.sin((waveCenterX * waveFrequency) + (progress * Math.PI * 2) * waveSpeed));
        } else {
            waveY = waveOffset + waveAmplitude * frequencyValue;
        }
        canvasContext.fillStyle = waveColor;
        canvasContext.fillRect(
            waveCenterX - waveWidth * 0.5,
            waveY,
            waveWidth,
            canvas.height - waveY
        );
    }
    rainbowColorIndex = (rainbowColorIndex + 1) % rainbowColors.length;

    if (isPlaying && audio.currentTime < audio.duration) {
        animationFrameId = requestAnimationFrame(drawWaves);
    } else {
        cancelAnimationFrame(animationFrameId);
    }
}



function loadSong(index) {
    const { title, artist, file } =
        index === -1
            ? { title: "Custom Song", artist: "Custom Artist", file: audio.src }
            : playlist[index];
    audio.src = file;
    document.querySelector(".song-title").textContent = title;
    document.querySelector(".artist").textContent = artist;
    document.querySelectorAll(".playlist li").forEach((li, i) => {
        li.classList.toggle("active", i === index);
    });
    isSongSelected = true;
    isPlaying = true;
    audio.addEventListener("loadedmetadata", () => {
        updateTotalTime();
        drawWaves();
        audio.play();
    });
    document.getElementById("play-pause-btn").textContent = "❚❚";
    updateTotalTime();
    updateProgress();
    updateCurrentTime();

    const playPauseBtn = document.getElementById("play-pause-btn");
    playPauseBtn.disabled = false;
    playPauseBtn.classList.remove("disabled");

    const chooseSongLabel = document.getElementById("choose-song-label");
    chooseSongLabel.style.display = "none";
}

function playPause() {
    if (!isSongSelected) {
        const chooseSongLabel = document.getElementById("choose-song-label");
        chooseSongLabel.style.display = "block";
        const playPauseBtn = document.getElementById("play-pause-btn");
        playPauseBtn.disabled = true;
        playPauseBtn.classList.add("disabled");
        return;
    }

    if (isPlaying) {
        audio.pause();
        cancelAnimationFrame(animationFrameId);
    } else {
        audioContext.resume().then(() => {
            audio.play();
            drawWaves();
        }).catch((error) => {
            console.error("Failed to resume the AudioContext:", error);
        });
    }
    isPlaying = !isPlaying;
    document.getElementById("play-pause-btn").textContent = isPlaying
        ? "❚❚"
        : "►";
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.querySelector(".progress").style.width = `${progress}%`;
}

function updateCurrentTime() {
    const currentTime = formatTime(audio.currentTime);
    document.getElementById("current-time").textContent = currentTime;
}

function updateTotalTime() {
    const totalTime = formatTime(audio.duration);
    document.getElementById("total-time").textContent = totalTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function seek(event) {
    const progressBar = document.querySelector(".progress-bar");
    const rect = progressBar.getBoundingClientRect();
    const totalWidth = progressBar.offsetWidth;
    const clickX = event.clientX - rect.left;
    const seekTime = (clickX / totalWidth) * audio.duration;
    audio.currentTime = seekTime;
    updateProgress();
}

function setVolume() {
    audio.volume = parseFloat(document.getElementById("volume-slider").value);
}

function toggleLoop() {
    isLooping = !isLooping;
    document.getElementById("loop-btn").textContent = isLooping ? "🔁" : "↺";
    audio.loop = isLooping;
}
function openCustomInputForm() {
    const element = document.getElementById("customInputForm");
    if (element) element.style.display = "block";
}

function closeCustomInputForm() {
    const element = document.getElementById("customInputForm");
    if (element) element.style.display = "none";
}

function openCustomAlert() {
    const element = document.getElementById("customAlert");
    if (element) element.style.display = "block";
}

function closeCustomAlert() {
    const element = document.getElementById("customAlert");
    if (element) element.style.display = "none";
}
function submitName() {
    let userName = document.getElementById("inputField").value;
    if (userName) {
        const date = new Date();
        const hours = date.getHours();
        let greeting;
        if (hours >= 5 && hours < 12) {
            greeting = "Good morning";
        } else if (hours >= 12 && hours < 17) {
            greeting = "Good afternoon";
        } else if (hours >= 17 && hours < 21) {
            greeting = "Good evening";
        } else {
            greeting = "Good night";
        }

        const welcomeMessage = `${greeting}, ${userName}! Welcome to the Music Player.`;
        document.querySelector(".alert-content h3").textContent = welcomeMessage;
        openCustomAlert();
        closeCustomInputForm();
    }
}

document.getElementById("prev-btn").addEventListener("click", prevSong);
document.getElementById("play-pause-btn").addEventListener("click", playPause);
document.getElementById("next-btn").addEventListener("click", nextSong);
document.getElementById("volume-slider").addEventListener("input", setVolume);
document.getElementById("loop-btn").addEventListener("click", toggleLoop);
audio.addEventListener("timeupdate", () => {
    updateProgress();
    updateCurrentTime();
});

document.getElementById("file-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const songData = {
            title: file.name,
            artist: "Custom Artist",
            file: URL.createObjectURL(file),
        };
        playlist.push(songData);
        const playlistElement = document.getElementById("playlist");
        const listItem = document.createElement("li");
        listItem.textContent = songData.title;
        listItem.addEventListener("click", () => {
            loadSong(playlist.length - 1);
            audio.play();
        });
        playlistElement.appendChild(listItem);
    }
});

const defaultPlaylist = [
    {
        title: "Shiv Tandav Rock Version",
        artist: "Shiv Tandav Rock Version Aigiri Nandini",
        file: "Shiv Tandav Rock Version Sachet Tandon 320 Kbps.mp3",
    },
    {
        title: "Birthday Bintu",
        artist: "Birthday - Bintu 2023",
        file: "Birthday Bintu Pabra 320 Kbps.mp3",
    },
    {
        title: "Parvati Boli Shankar Se",
        artist: "HANSRAJ RAGHUWANSHI",
        file: "Parvati Boli Shankar Se Hansraj Raghuwanshi 320 Kbps.mp3",
    },
    {
        title: "Udd Jaa Kaale Kaava Gadar 2",
        artist: " Udit Narayan, Alka Yagnik",
        file: "Udd Jaa Kaale Kaava Gadar 2 320 Kbps.mp3",
    },
];

playlist.push(...defaultPlaylist);

const playlistElement = document.getElementById("playlist");
defaultPlaylist.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.title;
    listItem.addEventListener("click", () => {
        loadSong(index);
        audioContext.resume().then(() => {
            audio.play();
            drawWaves();
        }).catch((error) => {
            console.error("Failed to resume the AudioContext:", error);
        });
    });
    playlistElement.appendChild(listItem);
});


window.addEventListener("load", () => {
    const musicPlayer = document.getElementById("music-player");
    musicPlayer.style.opacity = 0;
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
        opacity += 0.05;
        musicPlayer.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
        }
    }, 100);
    openCustomInputForm();
});