const playerArea = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const playSpeed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const expandBtn = document.getElementById('expand-btn');

// Play & Pause ----------------------------------- //
function showPlayBtn() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  }else {
    video.pause();
    showPlayBtn();
  }
}

// Listener When video ended
video.addEventListener('ended', showPlayBtn);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds < 10 ? seconds = `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = displayTime(video.currentTime);
  duration.textContent = displayTime(video.duration);
}

// Click to seek within the video
function setProgress(e) {
  const seekTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${seekTime * 100}%`;
  video.currentTime = seekTime * video.duration;
}

// Volume Controls --------------------------- //

// Change icon
function changeVolumeIcon(volume){
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  }else if(volume > 0 && volume < 0.7){
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off'); 
  }
}

  let lastVolume = 1;
// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  changeVolumeIcon(volume);
  let lastVolume = volume;
}

// Mute/Unmute
function toggleMute(){
  volumeIcon.className = '';
  if(video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  }else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    changeVolumeIcon(lastVolume);
    // volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
  }
}

// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = playSpeed.value ;
}


// Fullscreen ------------------------------- //
/* View in fullscreen */

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let isFullscreen = false;

function toggleFullscreen() {
  if (!isFullscreen) {
    openFullscreen(playerArea);
    expandBtn.classList.replace('fa-expand', 'fa-compress');
    expandBtn.setAttribute('title', 'Compress');
  }else {
    closeFullscreen();
    expandBtn.classList.replace('fa-compress', 'fa-expand');
    expandBtn.setAttribute('title', 'Expand');
  }
  isFullscreen = !isFullscreen;
}

// Events Listener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
playSpeed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);