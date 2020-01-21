//import * as p5 from './bibliotecas/p5/p5.min.js';
import { P5 } from './p5instance';

let lifespan = 400;
let forcaMaxima = 0.2;

class DNA {
	constructor(private genes ?: Array<P5.Vector>) {
		this.genes = [];

		if (Array.isArray(genes)) {
			this.genes = genes;
		} else {
			for (let g = 0; g < lifespan; g++) {
				this.genes[g] = P5.Vector.random2D();
				this.genes[g].setMag(forcaMaxima);
			}
		}
	}

	pegarGeneDaPosicao(posicao) : Array<P5.Vector> {
		return this.genes[posicao];
	}

	crossover(parceira : DNA) : DNA {
		if (!(parceira instanceof DNA)) {
			console.log('Não é um DNA');
			return new DNA(this.genes);
		}

		let novosGenes = [];
		let pontoDeDivisaoDoDna = P5.float(P5.random(this.genes.length));

		for (let g = 0; g < this.genes.length; g++) {
			if (g > pontoDeDivisaoDoDna) {
				novosGenes[g] = this.genes[g];
			} else {
				novosGenes[g] = parceira.pegarGeneDaPosicao(g);
			}
		}

		return new DNA(novosGenes);
	}

	sofrerMutacao() : void {
		for (let g = 0; g < this.genes.length; g++) {
			if (P5.random(1) < 0.01) {
				this.genes[g] = P5.Vector.random2D();
				this.genes[g].setMag(forcaMaxima);
			}
		}
	}
}

export { DNA };