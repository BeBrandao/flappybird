const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}

const cenario = {
    spriteX: 390,
    spriteY: 3,
    largura: 277,
    altura: 203,
    x: 0,
    y: 280  ,
    desenha() {
        contexto.drawImage(
            sprites,
            cenario.spriteX, cenario.spriteY,
            cenario.largura, cenario.altura,
            cenario.x, cenario.y,
            cenario.largura, cenario.altura,
        );
        contexto.drawImage(
            sprites,
            cenario.spriteX, cenario.spriteY,
            cenario.largura, cenario.altura,
            cenario.x + 276, cenario.y,
            cenario.largura, cenario.altura,
        );
    }
}

const chao = {
    spriteX: 0,
    spriteY: 608,
    largura: 224,
    altura: 113,
    x: 0,
    y: 367,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x + 224, chao.y,
            chao.largura, chao.altura,
        );
    }
}

contexto.fillStyle = '#70c5ce';
contexto.fillRect(0,0, canvas.width, canvas.height)
function loop(){
    flappyBird.desenha();
    cenario.desenha();
    chao.desenha();

    requestAnimationFrame(loop);
}

loop();

