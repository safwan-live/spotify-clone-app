const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');

let isPlaying = false;
let currentSong = 0;

// Songs array (apne songs daal dena – folder songs/ mein rakho)
const songs = [
  { title: "Song One", artist: "Artist 1", src: "songs/song1.mp3", cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300" },
  { title: "Song Two", artist: "Artist 2", src: "songs/song2.mp3", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300" },
  { title: "Song Three", artist: "Artist 3", src: "songs/song3.mp3", cover: "https://images.unsplash.com/photo-1493225457124-754a1e0c4d31?w=300" },
];

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  playBtn.classList.remove('fa-play-circle');
  playBtn.classList.add('fa-pause-circle');
  audio.play();
  isPlaying = true;
}

function pauseSong() {
  playBtn.classList.remove('fa-pause-circle');
  playBtn.classList.add('fa-play-circle');
  audio.pause();
  isPlaying = false;
}

function togglePlay() {
  if (isPlaying) pauseSong();
  else playSong();
}

// Update progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    // Time format
    const mins = Math.floor(currentTime / 60);
    const secs = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const durMins = Math.floor(duration / 60);
    const durSecs = Math.floor(duration % 60);
    durationEl.textContent = `${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
  }
}

// Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Volume control
volume.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Next / Prev
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progress.addEventListener('click', setProgress);

// Load first song
loadSong(currentSong);

// Song list banana
const songList = document.getElementById('songList');
songs.forEach((song, index) => {
  const card = document.createElement('div');
  card.classList.add('song-card');
  card.innerHTML = `
    <img src="${song.cover}" alt="${song.title}">
    <h4>${song.title}</h4>
    <p>${song.artist}</p>
  `;
  card.addEventListener('click', () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
  songList.appendChild(card);
});