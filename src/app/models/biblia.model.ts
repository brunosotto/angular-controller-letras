export interface BibliaLivro {
    tipo: 'vt' | 'nt';
    sigla: string;
    nome: string;
    capitulos: Capitulo[];
}

export interface Capitulo {
    sigla: string;
    capitulo: number;
    versiculos: Versiculo[];
}

export interface Versiculo {
    versiculo: number;
    texto: string;
}
