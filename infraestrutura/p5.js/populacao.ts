//import * as p5 from './bibliotecas/p5/p5.min.js';
import { P5 } from './p5instance';
import { Torpedo, DNA } from './torpedo';

class Populacao {
	private individuos : Array<Torpedo>;
	private candidatosACruzamento : Array<Torpedo>;
	
	constructor(private tamanho ?: number) {
		this.individuos = [];
		this.tamanho = isNaN(tamanho) ? 25 : tamanho;
		this.candidatosACruzamento = [];

		for (let t = 0; t < this.tamanho; t++) {
			this.individuos[t] = this.criarNovoIndividuo();
		}
	}

	criarNovoIndividuo(atributos ?: DNA) {
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

			if (this.individuos[t].pegarAptidao() > aptidaoMaxima) {
				aptidaoMaxima = this.individuos[t].pegarAptidao();
			}
		}

		return aptidaoMaxima;
	}

	avaliar() {
		let aptidaoMaxima = this.calcularAptidaoMaxima();

		for (let t = 0; t < this.individuos.length; t++) {
			this.individuos[t].atribuirAptidao(this.individuos[t].pegarAptidao() / aptidaoMaxima);
		}

		this.candidatosACruzamento = [];

		for (let t = 0; t < this.individuos.length; t++) {
			let numeroDeCandidatosACruzamento = this.individuos[t].pegarAptidao() * 100;

			for (let c = 0; c < numeroDeCandidatosACruzamento; c++) {
				this.candidatosACruzamento.push(this.individuos[t]);
			}
		}
	}

	selecionar() {
		let novosIndividuos = [];

		for (let t = 0; t < this.individuos.length; t++) {
			let paiAleatorio = P5.random(this.candidatosACruzamento);

			if (paiAleatorio === 'undefined') {
				console.log('Não foi possível encontrar um par para crossover');
				return false;
			}

			let maeAleatoria = P5.random(this.candidatosACruzamento);

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
};

export { Populacao };