import { v4 as uuid } from "uuid";

export class Todo {

    /**
     * Cera un nueva instancia
     * @param {String} descripcion 
     */
    constructor(descripcion) {
        this.id = uuid();
        this.descripcion = descripcion;
        this.done = false;
        this.createAt = new Date();
    }

}