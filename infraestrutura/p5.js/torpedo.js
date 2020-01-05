class Torpedo { // implements Individuo
	constructor(dna) {
		this.posicao = createVector(width / 2, height);
		this.velocidade = createVector();
		this.aceleracao = createVector();
		this.completou = false;
		this.explodiu = false;
		
		if (dna instanceof DNA) {
			this.dna = dna;
		} else {
			this.dna = new DNA();
		}

		this.aptidao = 0;
	}

	aplicarForca(forca) {
		this.aceleracao.add(forca);
	}

	atualizar() {
		let distancia = dist(this.posicao.x, this.posicao.y, alvo.x, alvo.y);
		
		if (distancia < 10) {
			this.completou = true;
			this.posicao = alvo.copy();
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
			this.posicao.x > width ||
			this.posicao.x < 0 ||
			this.posicao.y > height ||
			this.posicao.y < 0
		) {
			this.explodiu = true;
		}
		
		this.aplicarForca(this.dna.pegarGeneDaPosicao(contador));
		
		if ( ! this.completou && ! this.explodiu) {
			this.velocidade.add(this.aceleracao);
			this.posicao.add(this.velocidade);
			this.aceleracao.mult(0);
			this.velocidade.limit(4);
		}
	}

	mostrar() {
		push();
		noStroke();
		fill(255, 150);
		translate(this.posicao.x, this.posicao.y);
		rotate(this.velocidade.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}

	calcularAptidao() {
		let distancia = dist(this.posicao.x, this.posicao.y, alvo.x, alvo.y);

		this.aptidao = map(distancia, 0, width, width, 0); // 1 / distancia;
		
		if (this.completou) {
			this.aptidao *= 10;
		}
		
		if (this.explodiu) {
			this.aptidao /= 10;
		}
	}
}