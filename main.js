var player = document.getElementById('player');
var speed = 5;
var backgrounds = document.getElementsByClassName('background');
var keys = {};


var boss = document.getElementById("boss");
//boss.src = "https://uploaddeimagens.com.br/images/004/670/879/full/boss_ave_%281%29.png?1700668421"; // imagem do boss
boss.style.backgroundImage = "url(https://uploaddeimagens.com.br/images/004/670/879/full/boss_ave_%281%29.png?1700668421)";
boss.style.width = '100px';
boss.style.height = '100px';
//boss.style.backgroundColor = 'green';
boss.style.position = 'absolute';
// defina a posição inicial do boss
//boss.style.left = (window.innerWidth - boss.offsetWidth) + 'px';
//boss.style.top = (window.innerHeight / 2 - boss.offsetHeight / 2) + 'px';

// adicione o boss ao documento
//document.body.appendChild(boss);




var skins = {
    'default': [
        'url(https://uploaddeimagens.com.br/images/004/670/886/original/marrom_%281%29.png?1700668526)',
        'url(https://uploaddeimagens.com.br/images/004/670/887/original/marrom_%282%29.png?1700668540)',
        'url(https://uploaddeimagens.com.br/images/004/670/888/original/marrom_%283%29.png?1700668557)',
        'url(https://uploaddeimagens.com.br/images/004/670/889/original/marrom_%284%29.png?1700668577)'
    ],
    'yellow-skin': [
        'url(https://uploaddeimagens.com.br/images/004/670/624/original/frame-1.png?1700659188)',
        'url(https://uploaddeimagens.com.br/images/004/677/434/original/amarelo_%282%29.png?1701267396)'
        // Adicione mais frames se necessário
    ],
    'pink-skin': [
        'url(https://uploaddeimagens.com.br/images/004/670/891/original/rosa_%281%29.png?1700668598)',
        'url(https://uploaddeimagens.com.br/images/004/670/892/original/rosa_%282%29.png?1700668610)',
        'url(https://uploaddeimagens.com.br/images/004/670/893/original/rosa_%283%29.png?1700668622)',
        'url(https://uploaddeimagens.com.br/images/004/670/894/original/rosa_%284%29.png?1700668635)'
        // Adicione mais frames se necessário
    ]
};

var currentSkin = 'default'; 
var currentFrame = 0;


function animatePlayer() {
    var images = skins[currentSkin]; // Obtém as imagens da skin atual
    player.style.backgroundImage = images[currentFrame];
    currentFrame = (currentFrame + 1) % images.length;
}

var currentFrameBoss = 0;
function animateBoss() {
    var images = ['url(https://uploaddeimagens.com.br/images/004/670/879/original/boss_ave_%281%29.png?1700668421)','url(https://uploaddeimagens.com.br/images/004/670/880/original/boss_ave_%282%29.png?1700668436)']; // Obtém as imagens da skin atual
    boss.style.backgroundImage = images[currentFrame];
    currentFrameBoss = (currentFrameBoss + 1) % images.length;
}

setInterval(animatePlayer, 100);


setInterval(animateBoss, 100);

function changeSkin(skin) {
    currentSkin = skin; // Atualiza a skin atual
    currentFrame = 0; // Reinicia o frame da animação
}


var vy = 5; // velocidade vertical do boss
// mova o boss verticalmente a cada 10 milissegundos
var bossInterval = setInterval(function() {
    boss.style.top = (parseInt(boss.style.top) + vy) + 'px';
    // se o boss atingiu o limite superior ou inferior da tela, inverta o sinal da velocidade
    if (parseInt(boss.style.top) < 0 || parseInt(boss.style.top) > window.innerHeight - boss.offsetHeight) {
      vy = -vy;
    }
  }, 10);


// Defina a largura e a altura do jogador como uma porcentagem da largura/altura da janela
player.style.width = window.innerWidth * 0.05 + 'px';
player.style.height = window.innerHeight * 0.05 + 'px';

document.getElementById('play').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    // cria um intervalo para fazer o boss atirar a cada 2 segundos
    var shootBossInterval = setInterval(shootBoss, 1000);
    player.style.top = window.innerHeight / 2 - player.offsetHeight / 2 + 'px';
    player.style.left = window.innerWidth / 2 - player.offsetWidth / 2 + 'px';
    boss.style.left = (window.innerWidth - boss.offsetWidth - 250) + 'px';
    boss.style.top = (window.innerHeight / 2 - boss.offsetHeight / 2) + 'px';
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i].classList.add('parallax');
    }
});

document.getElementById('select-skin').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('skins').style.display = 'block';
});

document.getElementById('yellow-skin').addEventListener('click', function() {
    changeSkin('yellow-skin');
    document.getElementById('skins').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
});

document.getElementById('pink-skin').addEventListener('click', function() {
    changeSkin('pink-skin');
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

// função que verifica se dois elementos se sobrepõem na tela
function overlap(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}



var canFire = true; // variável que controla se o jogador pode atirar
function shoot() {
    var bullet = new Image(); // cria uma nova imagem para a bala
    bullet.src = "https://uploaddeimagens.com.br/images/004/670/883/original/charged-preview-big-unscreen.gif?1700668488"; // imagem da bala
    bullet.style.width = '20px';
    bullet.style.height = '20px';
    //bullet.style.backgroundColor = 'red';
    bullet.style.position = 'absolute';
    // defina a posição inicial da bala
    bullet.style.left = (parseInt(player.style.left) + player.offsetWidth) + 'px';
    bullet.style.top = (parseInt(player.style.top) + player.offsetHeight / 2) + 'px';
    // defina a velocidade da bala
    var vx = 10;
    // adicione a bala ao documento
    //document.body.appendChild(bullet);
    var game = document.getElementById("game");
    game.appendChild(bullet);
    // mova a bala horizontalmente a cada 10 milissegundos
    var interval = setInterval(function() {
        bullet.style.left = (parseInt(bullet.style.left) + vx) + 'px';
        // se a bala saiu da tela, remova-a do documento e limpe o intervalo
        if (parseInt(bullet.style.left) > window.innerWidth) {
          game.removeChild(bullet);
          clearInterval(interval);
          canFire = true; // permite que o jogador atire novamente
        }
        // dentro do intervalo da bala, verifique se a bala atingiu o boss
        if (overlap(bullet, boss)) {
            // remova a bala e o boss do documento
            game.removeChild(bullet);
            game.removeChild(boss);
            // limpe os intervalos da bala e do boss
            clearInterval(interval);
            clearInterval(bossInterval);
            canFire = true; // permite que o jogador atire novamente
            // mostre uma mensagem de vitória
            alert("Você venceu!");
            window.location.reload();
        }
      }, 10);
      canFire = false; // impede que o jogador atire novamente até que o tiro saia da tela
    }


function gameLoop() {
    if ((keys['w'] || keys['ArrowUp']) && parseInt(player.style.top) > 0) {
        player.style.top = (parseInt(player.style.top) - speed) + 'px';
    }
    if ((keys['a'] || keys['ArrowLeft']) && parseInt(player.style.left) > 0) {
        player.style.left = (parseInt(player.style.left) - speed) + 'px';
    }
    if ((keys['s'] || keys['ArrowDown']) && parseInt(player.style.top) < window.innerHeight - player.offsetHeight) {
        player.style.top = (parseInt(player.style.top) + speed) + 'px';
    }
    if ((keys['d'] || keys['ArrowRight']) && parseInt(player.style.left) < window.innerWidth - player.offsetWidth) {
        player.style.left = (parseInt(player.style.left) + speed) + 'px';
    }
    if (keys[' '] || keys['x']) {
        if (canFire) { // verifica se o jogador pode atirar
            shoot();
          } 
    }      

    requestAnimationFrame(gameLoop);
}

gameLoop();



// cria uma função que cria um projétil e o move
function shootBoss() {
    // cria um elemento div para o projétil
    var projectile = new Image();
    // define o estilo do projétil
    projectile.src = "https://uploaddeimagens.com.br/images/004/670/884/original/crossed-preview-big-unscreen.gif?1700668511";
    projectile.style.width = '20px';
    projectile.style.height = '20px';
    projectile.style.position = 'absolute';
    projectile.style.transform = "rotate(180deg)";
    // posiciona o projétil no centro do boss
    projectile.style.left = (parseInt(boss.style.left) + boss.offsetWidth / 2 - projectile.offsetWidth / 2) + 'px';
    projectile.style.top = (parseInt(boss.style.top) + boss.offsetHeight / 2 - projectile.offsetHeight / 2) + 'px';
    // adiciona o projétil ao elemento game
    var game = document.getElementById("game");
    game.appendChild(projectile);
    // define a velocidade do projétil
    var vx = -5;
    // cria um intervalo para mover o projétil
    var projectileInterval = setInterval(function() {
      // move o projétil na direção do jogador
      projectile.style.left = (parseInt(projectile.style.left) + vx) + 'px';
      // verifica se o projétil saiu da tela
      if (parseInt(projectile.style.left) < 0) {
        // remove o projétil do elemento game
        game.removeChild(projectile);
        // limpa o intervalo do projétil
        clearInterval(projectileInterval);
        // limpa os intervalos do boss e do projétil
   

      }
      // verifica se o projétil colidiu com o jogador
      if (collide(projectile, player)) {
        // termina o jogo
        game.removeChild(projectile);
        clearInterval(projectileInterval);
        game.removeChild(boss);
        game.removeChild(player);
        
        alert("Game Over!");
        window.location.reload();
      }
    }, 10);
  }
  
  // cria uma função que verifica se dois elementos colidiram
  function collide(a, b) {
    // obtém as coordenadas dos elementos
    var aLeft = parseInt(a.style.left);
    var aRight = aLeft + a.offsetWidth;
    var aTop = parseInt(a.style.top);
    var aBottom = aTop + a.offsetHeight;
    var bLeft = parseInt(b.style.left);
    var bRight = bLeft + b.offsetWidth;
    var bTop = parseInt(b.style.top);
    var bBottom = bTop + b.offsetHeight;
    // retorna verdadeiro se houver sobreposição entre os elementos
    return !(aLeft > bRight || aRight < bLeft || aTop > bBottom || aBottom < bTop);
  }
  
  

  


// Verifique o tipo de dispositivo e a orientação da tela
var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
var isLandscape = window.matchMedia("(orientation: landscape)").matches;

if (isMobile) {
    if (isLandscape) {
        // Código para celulares em modo paisagem
    } else {
        // Código para celulares em modo retrato
    }
} else {
    // Código para dispositivos não móveis
}
