import { Populacao } from './populacao';

const s = (p) => {
	let contador = 0;
	let populacao : Populacao;
	let lifespan = 400;
	let paragrafo;
	let alvo : p.Vector;

	//let rx = 100, ry = 150, rw = 200, rh = 10;

	p.setup = function () {
		p.createCanvas(400, 300);
		populacao = new Populacao();
		//console.table(populacao);
		paragrafo = p.createP();
		alvo = p.createVector(p.width / 2, 50);
	};

	p.draw = function () {
		p.background(0);
		//console.table(populacao);
		populacao.iniciar();
		paragrafo.html(contador);

		contador++;
		console.log('Contador', P5.frameCount - contador);
		console.log('Lifespan', P5.frameCount - lifespan);
		if (contador === lifespan) {
			//populacao = new Populacao();
			populacao.avaliar();
			populacao.selecionar();
			contador = 0;
		}

		p.rect(100, 150, 200, 10);

		p.ellipse(alvo.x, alvo.y, 16, 16);
	};
};

let P5 = new p5(s);

export { P5 };