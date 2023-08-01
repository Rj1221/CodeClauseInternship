const audio = new Audio();
const playlist = [];

let currentSongIndex = 0;
let isPlaying = false;
let isSongSelected = false;
let isLooping = false;

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
    });
    document.getElementById("play-pause-btn").textContent = "❚❚";
    updateTotalTime();
    audio.play(); // Automatically play the song when loaded
}

function playPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        if (!isSongSelected) {
            loadSong(currentSongIndex); // If a song is not selected from the playlist, load the current song
        } else {
            audio.play(); // If a song is selected from the playlist, play the current song
        }
    }
    isPlaying = !isPlaying;
    document.getElementById("play-pause-btn").textContent = isPlaying
        ? "❚❚"
        : "►";
    isSongSelected = false; // Reset the flag after play/pause action
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
            audio.play(); // Automatically play the song when loaded
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
        audio.play();
    });
    playlistElement.appendChild(listItem);
});

const userName = prompt("Please enter your name:");
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
    alert(`${greeting}, ${userName}! Welcome to the Advanced Music Player.`);
}

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
});
