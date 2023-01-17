import knexlib from 'knex'

class ClientSQL {
    constructor(config){
        this.knex = knexlib(config)
    }

    crearTabla() {
        return this.knex.schema.dropSchemaIfExists('articulos')
        .finally(() => {
            return this.knex.schema.createTable('articulos', table => {
                table.increments('id').primary();
                table.string('nombre', 50).notNullable();
                table.string('codigo', 10).notNullable();
                table.float('precio');
                table.integer('stock');
            })
        })
    }
    insertarArticulos(articulos) {
        return this.knex('articulos').insert(articulos)
    }

    listarArticulos() {
        return this.knex('articulos').select('*');
    }

    borrarArticulosId(id) {
        return this.knex.from('articulos').where('id', id).del()
    }

    actualizarArticuloId(stock, id) {
        return this.from('articulos').where('id', id).update({stock: stock})
    }

    close() {
        this.knex.destroy();
    }

     
}

export default ClientSQL