//import * as p5 from './bibliotecas/p5/p5.min.js';
import { P5 } from './p5instance.js';
import { DNA } from './dna';

let lifespan = 400;

let rx = 100,
	ry = 150,
	rw = 200,
	rh = 10;

class Torpedo { // implements Individuo
	private alvo : P5.Vector;
	private posicao : P5.Vector;
	private velocidade : P5.Vector;
	private aceleracao : P5.Vector;
	private completou : boolean;
	private explodiu : boolean;
	private aptidao : number;
	
	constructor(private dna : DNA) {
		this.alvo = P5.createVector(P5.width / 2, 50);
		this.posicao = P5.createVector(P5.width / 2, P5.height);
		this.velocidade = P5.createVector();
		this.aceleracao = P5.createVector();
		this.completou = false;
		this.explodiu = false;

		if (dna instanceof DNA) {
			this.dna = dna;
		} else {
			this.dna = new DNA();
		}

		this.aptidao = 0;
	}

	aplicarForca(forca : P5.Vector) : void {
		this.aceleracao.add(forca);
	}

	atualizar() : void {
		let distancia = P5.dist(this.posicao.x, this.posicao.y, this.alvo.x, this.alvo.y);

		if (distancia < 10) {
			this.completou = true;
			this.posicao = this.alvo.copy();
		}

		if (
			this.posicao.x > rx &&
			this.posicao.x < rx + rw &&
			this.posicao.y > ry &&
			this.posicao.y < ry + rh
		) {
			this.explodiu = true;
		}

		if (
			this.posicao.x > P5.width ||
			this.posicao.x < 0 ||
			this.posicao.y > P5.height ||
			this.posicao.y < 0
		) {
			this.explodiu = true;
		}

		this.aplicarForca(this.dna.pegarGeneDaPosicao(P5.frameCount % lifespan));

		if (!this.completou && !this.explodiu) {
			this.velocidade.add(this.aceleracao);
			this.posicao.add(this.velocidade);
			this.aceleracao.mult(0);
			this.velocidade.limit(4);
		}
	}

	mostrar() : void {
		P5.push();
		P5.noStroke();
		P5.fill(255, 150);
		P5.translate(this.posicao.x, this.posicao.y);
		P5.rotate(this.velocidade.heading());
		P5.rectMode(P5.CENTER);
		P5.rect(0, 0, 25, 5);
		P5.pop();
	}

	calcularAptidao() : void {
		let distancia = P5.dist(this.posicao.x, this.posicao.y, this.alvo.x, this.alvo.y);

		this.aptidao = P5.map(distancia, 0, P5.width, P5.width, 0); // 1 / distancia;

		if (this.completou) {
			this.aptidao *= 10;
		}

		if (this.explodiu) {
			this.aptidao /= 10;
		}
	}
}

export { Torpedo };