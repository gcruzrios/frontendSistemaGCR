export class Orden {

    constructor(
        public num_orden?: string,
        public consecutivo?: number,
        public total?: number,
        public fechaCreado?: Date,
        public tipo?: string,
        public usuario?: string,
        public cliente?: string,
        public _id?: string
    ) { }
}
