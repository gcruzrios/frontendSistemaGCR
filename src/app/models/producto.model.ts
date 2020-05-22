export class Producto {

    constructor(
        public codigo: string,
        public nombre: string,
        public img?: string,
        public categoria?: string,
        public tipo?: string,
        public precio?: number,
        public _id?: string
    ) { }
}