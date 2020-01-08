import * as Torpedo from './torpedo.js';

export default class Populacao {
	constructor(tamanho) {
		this.individuos = [];
		this.tamanho = isNaN(tamanho) ? 25 : tamanho;
		this.candidatosACruzamento = [];

		for (let t = 0; t < this.tamanho; t++) {
			this.individuos[t] = this.criarNovoIndividuo();
		}
	}

	criarNovoIndividuo(atributos) {
		return new Torpedo(atributos);
	}

	iniciar() {
		for (let t = 0; t < this.individuos.length; t++) {
			this.individuos[t].atualizar();
			this.individuos[t].mostrar();
		}
	}

	calcularAptidaoMaxima() {
		let aptidaoMaxima = 0;

		for (let t = 0; t < this.individuos.length; t++) {
			this.individuos[t].calcularAptidao();

			if (this.individuos[t].aptidao > aptidaoMaxima) {
				aptidaoMaxima = this.individuos[t].aptidao;
			}
		}

		return aptidaoMaxima;
	}

	avaliar() {
		let aptidaoMaxima = this.calcularAptidaoMaxima();

		for (let t = 0; t < this.individuos.length; t++) {
			this.individuos[t].aptidao /= aptidaoMaxima;
		}

		this.candidatosACruzamento = [];

		for (let t = 0; t < this.individuos.length; t++) {
			let numeroDeCandidatosACruzamento = this.individuos[t].aptidao * 100;

			for (let c = 0; c < numeroDeCandidatosACruzamento; c++) {
				this.candidatosACruzamento.push(this.individuos[t]);
			}
		}
	}

	selecionar() {
		let novosIndividuos = [];
		
		for (let t = 0; t < this.individuos.length; t++) {
			let paiAleatorio = random(this.candidatosACruzamento);

			if (paiAleatorio === 'undefined') {
				console.log('Não foi possível encontrar um par para crossover');
				return false;
			}

			let maeAleatoria = random(this.candidatosACruzamento);

			if (maeAleatoria === 'undefined') {
				console.log('Não foi possível encontrar um par para crossover');
				return false;
			}

			let dnaDoPai = paiAleatorio.dna;
			let dnaDaMae = maeAleatoria.dna;
			
			let dnaDoFilho = dnaDoPai.crossover(dnaDaMae);
			
			dnaDoFilho.sofrerMutacao();
			
			novosIndividuos[t] = this.criarNovoIndividuo(dnaDoFilho);
		}

		this.individuos = novosIndividuos;
	}
}