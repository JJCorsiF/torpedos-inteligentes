import {background, createCanvas, createP, createVector, ellipse, rect} from './bibliotecas/p5/p5.js';
import * as Populacao from './populacao.js';

let contador = 0;
let torpedo;
let populacao;
let lifespan = 400;
let paragrafo;
let alvo;
let forcaMaxima = 0.2;

//let rx = 100, ry = 150, rw = 200, rh = 10;

function setup() {
	createCanvas(400, 300);
	populacao = new Populacao();
	paragrafo = createP();
	alvo = createVector(width / 2, 50);
}

function draw() {
	background(0);
	populacao.iniciar();
	paragrafo.html(contador);

	contador++;
	if (contador === lifespan) {
		//populacao = new Populacao();
		populacao.avaliar();
		populacao.selecionar();
		contador = 0;
	}
	
	rect(100, 150, 200, 10);
	
	ellipse(alvo.x, alvo.y, 16, 16);
}