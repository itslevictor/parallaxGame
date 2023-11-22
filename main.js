var player = document.getElementById('player');
var speed = 5;
var backgrounds = document.getElementsByClassName('background');
var keys = {};

document.getElementById('play').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    player.style.top = window.innerHeight / 2 - player.offsetHeight / 2 + 'px';
    player.style.left = window.innerWidth / 2 - player.offsetWidth / 2 + 'px';
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i].classList.add('parallax');
    }
});

document.getElementById('select-skin').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('skins').style.display = 'block';
});

document.getElementById('blue-skin').addEventListener('click', function() {
    player.style.backgroundImage = 'url(https://uploaddeimagens.com.br/images/004/670/626/original/frame-2.png?1700659202)';
    document.getElementById('skins').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
});

document.getElementById('pink-skin').addEventListener('click', function() {
    player.style.backgroundImage = 'url(https://uploaddeimagens.com.br/images/004/670/626/original/frame-2.png?1700659202)';
    document.getElementById('skins').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
});

document.getElementById('back-to-menu').addEventListener('click', function() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i].classList.remove('parallax');
    }
});

window.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

window.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

function gameLoop() {
    if (keys['w'] || keys['ArrowUp']) {
        player.style.top = (parseInt(player.style.top) - speed) + 'px';
    }
    if (keys['a'] || keys['ArrowLeft']) {
        player.style.left = (parseInt(player.style.left) - speed) + 'px';
    }
    if (keys['s'] || keys['ArrowDown']) {
        player.style.top = (parseInt(player.style.top) + speed) + 'px';
    }
    if (keys['d'] || keys['ArrowRight']) {
        player.style.left = (parseInt(player.style.left) + speed) + 'px';
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
