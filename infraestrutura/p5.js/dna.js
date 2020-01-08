import * as p5 from './bibliotecas/p5/p5.js';

export default class DNA {
	constructor(genes) {
		this.genes = [];

		if (Array.isArray(genes)) {
			this.genes = genes;
		} else {
			for (let g = 0; g < lifespan; g++) {
				this.genes[g] = p5.Vector.random2D();
				this.genes[g].setMag(forcaMaxima);
			}
		}
	}
	
	pegarGeneDaPosicao(posicao) {
		return this.genes[posicao];
	}

	crossover(parceira) {
		if ( ! (parceira instanceof DNA)) {
			console.log('Não é um DNA');
			return new DNA(this.genes);
		}
		
		let novosGenes = [];
		let pontoDeDivisaoDoDna = float(random(this.genes.length));
		
		for (let g = 0; g < this.genes.length; g++) {
			if (g > pontoDeDivisaoDoDna) {
				novosGenes[g] = this.genes[g];
			} else {
				novosGenes[g] = parceira.pegarGeneDaPosicao(g);
				
			}
		}

		return new DNA(novosGenes);
	}
	
	sofrerMutacao() {
		for (let g = 0; g < this.genes.length; g++) {
			if (random(1) < 0.01) {
				this.genes[g] = p5.Vector.random2D();
				this.genes[g].setMag(forcaMaxima);
			}
		}
	}
}