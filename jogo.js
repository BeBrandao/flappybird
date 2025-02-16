const sprites = new Image();
sprites.src = './sprites.png';
const som_punch = new Audio();
som_punch.src = './punch.wav';

const novaFonte = new FontFace('FlappyBirdFont', 'url(./flappy-bird-font.ttf)');
novaFonte.load().then((font) => {
  document.fonts.add(font);
});

let animation_frame = 0;

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const placar = {
    x: 75,
    y: 50,
    contador: 0,

    desenha() {
        contexto.fillStyle = 'white';
        contexto.font = '30px FlappyBirdFont';
        contexto.fillText(`Pontuação: ${placar.contador}`, placar.x, placar.y);
    },

    incrementa() {
        placar.contador++;
    },

    atualiza(){
        const intervaloDeFrames = 20;
        const passouOIntervalo = animation_frame % intervaloDeFrames === 0;

        if(passouOIntervalo) {
            placar.contador += 1
        }
    }
}

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
            flappyBird.y = flappyBird.limiteSuperior;
            flappyBird.velocidade = 0
        }
        
        const limiteInferior = canvas.height - chao.altura;
        if (flappyBird.y + flappyBird.altura >= limiteInferior){
            som_punch.play();
            flappyBird.y = limiteInferior - flappyBird.altura;
            reiniciaJogo();
        }
    },

    sobe(){
        flappyBird.velocidade = -5;
    }
};

function reiniciaJogo() {
    canos.pares = []
    flappyBird.y = 50;
    flappyBird.velocidade = 0;
    placar.contador = 0;
    telaAtiva = TelaGameOver;
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
    },
    atualiza(){
        cenario.x -= 0.5;
        cenario.x = cenario.x % (cenario.largura / 2);
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
    },
    atualiza(){
        chao.x -= 1;
        chao.x = chao.x % (chao.largura / 2);
    }
}

const canos = {
 
    largura: 52,
    altura: 400,
    ceu: {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150
    },
    chao: {
        spriteX: 0,
        spriteY: 169,
    },
    pares: [],
    espacamentoEntreCanos: 120,
    desenha(){
        
        for (i=0;i<canos.pares.length;i++){
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canos.ceu.x, canos.ceu.y,
                canos.largura, canos.altura,
                )
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + canos.espacamentoEntreCanos + canos.ceu.y;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
                )
        }
    },

    atualiza(){
        for(i=0;i<canos.pares.length;i++){
            const par = canos.pares[i];
            par.x -= 2;

            if(par.x + canos.largura <= 0){
                canos.pares.shift();
            }

            if(fazColisaoObstaculo(par)){
                som_punch.play();
                reiniciaJogo();
            }

            if(par.x + canos.largura <= flappyBird.x && !par.contou) {
                placar.incrementa();
                par.contou = true; // Marcar que o cano já foi contado
            }
        }
        const passou100Frames = (animation_frame % 100 === 0);
        if(passou100Frames) {
            const novoPar = {
                x: canvas.width,
                y: -150 * (Math.random() + 1),
                contou: false,
            }
            canos.pares.push(novoPar);
        }
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
        cenario.atualiza();
        chao.desenha();
        chao.atualiza();
        flappyBird.desenha();
        flappyBird.atualiza();
        canos.desenha();
        canos.atualiza();
        placar.desenha();
        placar.atualiza();
    },

    click(){
        flappyBird.sobe();
    }
}

const GameOver = {
    
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y: 70,

    desenha(){
        contexto.drawImage(
            sprites,
            GameOver.spriteX,GameOver.spriteY,
            GameOver.largura,GameOver.altura,
            GameOver.x,GameOver.y,
            GameOver.largura,GameOver.altura,
        );
    }
}

const TelaGameOver = {
    desenha(){
        GameOver.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

function fazColisaoObstaculo(par){
    if(flappyBird.x >= par.x){
        const alturaCabecaFlappy = flappyBird.y;
        const alturaPeFlappy = flappyBird.y + flappyBird.altura;
        const bocaCanoCeuY = par.y + canos.altura;
        const bocaCanoChaoY = par.y + canos.altura + canos.espacamentoEntreCanos;
        if(alturaCabecaFlappy <= bocaCanoCeuY){
            return true;
        }
        if(alturaPeFlappy >= bocaCanoChaoY){
            return true;
        }
    }

    return false;
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
    animation_frame += 1;
}

loop();
