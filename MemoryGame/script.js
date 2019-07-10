(function (){
    const imagens = ['img/facebook.png','img/facebook.png','img/android.png','img/android.png','img/chrome.png','img/chrome.png','img/firefox.png','img/firefox.png','img/html5.png','img/html5.png','img/googleplus.png','img/googleplus.png','img/twitter.png','img/twitter.png','img/windows.png','img/windows.png','img/cross.png'];
    let $tabuleiro = $('#tabuleiro');
    let imagenssalvas = [];
    let pares = 0;
    let timerid = null;
    let restartcheck = 0; //indicador para não permitir apertar começar novo jogo enquanto outro esta começando
    let timer = 0;
    let highscore = [45];
    let animando = 0;

    let $base = `<table>`;
    for(let i = 0; i <4; i++){
        $base += `<tr>`;
        for(let j = i * 4; j < i*4 + 4; j++){
            $base += `<td class="td"><img class ="img" src="${imagens[j]}" data-n="${j}" data-src="gambiarra"></td>`;
        }
        $base += `</tr>`;
    }
    $base += `</table>`;
    $tabuleiro.html(`${$base}`);

    console.log(highscore[0]);
    $('#highscore').html(`Tempo Recorde - ${tempobonito(highscore[0])}`);

    $('#btn').on('click', (e) =>{
        if(!restartcheck){
            $('.img').parent().unbind();
            pares = 0;
            timerf();
            imgaleatoria();
            setTimeout(() =>{
                let $img = $('.img');
                fadesetup($img, imagens[16]);
                restartcheck = 0;
                gamesetup();
            },3000);
        }
    });

    function gamesetup(){
        let btncheck = 0;
        let clicado = 0;
        let $img1 = null;
        let $img2 = null;
        let n1 = null;
        let n2 = null;
        $('.td').on('click', '.img' ,(e) =>{
            if(!btncheck && !animando){
                if(!clicado){
                    clicado = 1;
                    restartcheck = 1;
                    $img1 = $(e.target);
                    n1 = $img1.data('n');
                    $img1.data('src', imagenssalvas[n1]);
                    $img1.fadeOut(() =>{
                        $img1.attr('src', imagenssalvas[n1]);
                        $img1.fadeIn(300,() =>{
                            $img1.stop();
                        });
                        $img1.stop();
                    });
                }
                else{
                    $img2 = $(e.target);
                    n2 = $img2.data('n');
                    if(n1 !== n2){
                        fadesetup($img2, imagenssalvas[n2]);
                        if($img1.data('src') === ($img2.data('src'))){
                            animando = 0;
                            pares++;
                            $img1.parent().unbind();
                            $img2.parent().unbind();
                            if(pares === 8){
                                rodarhs(timer);
                                alert(`Vitória!
                                Seu tempo: ${timer} segundos`);
                                clearInterval(timerid);
                            }
                            restartcheck = 0;
                        }
                        else{
                            btncheck = 1;
                            setTimeout(() =>{
                                fadesetup($img1, imagens[16]);
                                fadesetup($img2, imagens[16]);
                                btncheck = 0;
                                restartcheck = 0;
                            }, 1500)
                        }
                        clicado = 0;
                    }
                }
            }
        });
    }

    function imgaleatoria() {
        restartcheck = 1;
        let aleatorio = [];
        for (let i = 0; i <= 15; i++){
            aleatorio[i] = Math.floor(Math.random() * 16);
        }
        NDuplicar(aleatorio);
        let $img = $('.img');
        animando = 1;
        $img.fadeOut(() =>{
            for(let i = 0;i <= 15; i++){
                $img[i].src = imagens[aleatorio[i]];
                imagenssalvas[i] = $img[i].src;
            }
            $img.fadeIn(() =>{
                animando = 0;
                $img.stop();
            });
            $img.stop();
        });
    }

    function NDuplicar(lista) {
        for (let i = 0; i <= 15; i++) {
            for (let j = 0; j < i; j++) {
                if (lista[i] === lista[j]) {
                    lista[i] = Math.floor(Math.random() * 16);
                    NDuplicar(lista);
                }
            }
        }
    }

    function timerf(){
        let $timer = $('#timer');
        clearInterval(timerid);
        timer = 0;
        $timer.html(`0:00`)
        timerid = setInterval(() =>{
            timer++;
            $timer.html(tempobonito(timer));

        }, 1000);
    }

    function tempobonito(tempobom){
        let tempohtml;
        if(tempobom >= 60){
            if(tempobom%60 < 10)
                tempohtml = `${Math.ceil(tempobom/60)}:0${Math.ceil(tempobom%60)}`;
            else
                tempohtml = `${Math.ceil(tempobom/60)}:${Math.ceil(tempobom%60)}`;
        }
        else{
            if(tempobom%60 < 10){
                tempohtml = `0:0${Math.ceil(tempobom%60)}`;
            }
                else{
                tempohtml = `0:${Math.ceil(tempobom%60)}`;
            }
        }

        return tempohtml;
    }

    function rodarhs(score) {
        highscore.push(score);
        highscore.sort();
        $('#highscore').html(`Tempo Recorde - ${tempobonito(highscore[0])}`);
    }

    function fadesetup($img, src) {
        animando = 1;
        $img.data('src', src);
        $img.fadeOut(() =>{
            $img.attr('src', src);
            $img.fadeIn(300,() =>{
                animando = 0;
                $img.stop();
            });
            $img.stop();
        });
    }
})();