

export class Todo {

    /**
     * Cera un nueva instancia
     * @param {String} descripcion 
     */
    constructor(descripcion) {
        this.id = 1;
        this.descripcion = descripcion;
        this.done = false;
        this.createAt = new Date();
    }

}