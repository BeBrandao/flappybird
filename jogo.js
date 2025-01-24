const sprites = new Image();
sprites.src = './sprites.png';
// const som_punch = new Audio();
// som_punch.src = './som/punch.wav';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {

    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    limiteSuperior: 0,
    limiteInferior: 367,
    contadorFrame: 0,
    
    desenha() {

        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },

    atualiza(){
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y += flappyBird.velocidade;

        flappyBird.contadorFrame++;
        if (flappyBird.contadorFrame % 10 === 0) {
            if (flappyBird.spriteY === 0 ) {
                flappyBird.spriteY = 25;
            } else if (flappyBird.spriteY === 25) {
                flappyBird.spriteY = 50;
            } else {
                flappyBird.spriteY = 0;
            }
        }


        if (flappyBird.y < flappyBird.limiteSuperior) {
            som_punch.play();
            flappyBird.y = flappyBird.limiteSuperior;
            flappyBird.velocidade = 0
        }
        
        const limiteInferior = canvas.height - chao.altura;
        if (flappyBird.y + flappyBird.altura >= limiteInferior){
            flappyBird.y = limiteInferior - flappyBird.altura;
            reiniciaJogo();
        }
    },

    sobe(){
        flappyBird.velocidade = -5;
    }
};

function reiniciaJogo() {
    flappyBird.y = 50;
    flappyBird.velocidade = 0;
    telaAtiva = TelaInicio;
}

const cenario = {

    spriteX: 390,
    spriteY: 3,
    largura: 277,
    altura: 203,
    x: 0,
    y: 280,

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

const inicio = {

    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,

    desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura, 
        );
    }
}

const TelaInicio = {

    desenha(){
        cenario.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },

    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {

    desenha(){
        cenario.desenha();
        chao.desenha();
        flappyBird.desenha();
        flappyBird.atualiza();
    },

    click(){
        flappyBird.sobe();
    }
}

var telaAtiva = TelaInicio;

function mudaTelaAtiva(){
    telaAtiva.click();
}

window.addEventListener("click", mudaTelaAtiva);


function loop(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    telaAtiva.desenha()
    requestAnimationFrame(loop);
}

loop();

