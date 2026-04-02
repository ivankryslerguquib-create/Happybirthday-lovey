const playBtn = document.querySelector(".play-btn");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");

// Songs list
const songs = [
    { title:"Kalapastangan", artist:"Artist 1", src:"songs/kalapastangan.mp4" },
    { title:"Viva La Vida", artist:"Artist 2", src:"songs/viva la vida.mp4" },
    { title:"Miss Independent", artist:"Artist 3", src:"songs/miss independent.mp4" },
    { title:"About You", artist:"Artist 4", src:"songs/about you.mp4" },
    { title:"Love Me Harder", artist:"Artist 5", src:"songs/love me harder.mp4" }
];

let currentSong = 0;

// Load song
function loadSong(index){
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

// Initial song
loadSong(currentSong);

// Play/pause
playBtn.addEventListener("click", ()=>{
    if(audio.paused){
        audio.play(); playBtn.textContent="⏸";
    }else{
        audio.pause(); playBtn.textContent="▶";
    }
});

// Next/Prev
document.querySelector(".next-btn").addEventListener("click", ()=>{
    currentSong = (currentSong+1)%songs.length;
    loadSong(currentSong);
    audio.play(); playBtn.textContent="⏸";
});
document.querySelector(".prev-btn").addEventListener("click", ()=>{
    currentSong = (currentSong-1+songs.length)%songs.length;
    loadSong(currentSong);
    audio.play(); playBtn.textContent="⏸";
});

// Album card click
document.querySelectorAll(".album-card").forEach((card,index)=>{
    card.addEventListener("click", ()=>{
        currentSong=index;
        loadSong(currentSong);
        audio.play(); playBtn.textContent="⏸";
    });
});

// Auto next song
audio.addEventListener("ended", ()=>{
    currentSong = (currentSong+1)%songs.length;
    loadSong(currentSong);
    audio.play();
});

// Update progress bar
audio.addEventListener("timeupdate", ()=>{
    if(audio.duration){
        progress.value = (audio.currentTime/audio.duration)*100;
    }
});
progress.addEventListener("input", ()=>{
    audio.currentTime = (progress.value/100)*audio.duration;
});
