const {
    deepEqual, ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    name: 'Flash',
    power: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    name: 'Lanterna verde',
    power: 'poder do anel',
    id: 2
}

describe('Suite de manipulação de herois', () => {

    before(async () => {
        await database.post(DEFAULT_ITEM_CADASTRAR)
        await database.post(DEFAULT_ITEM_ATUALIZAR)
    })
    
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [result] = await database.list(expected.id)

        deepEqual(result, expected)
    })

    it('deve cadastrar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const result = await database.post(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.list(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    })

    it('deve remover um heroi pelo id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(result, expected)
    })

    it.only('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            name: 'Batman',
            power: 'Dinheiro'
        }

        const newData  = {
            name: 'Batman',
            power: 'Dinheiro'
        }

        await database.update(DEFAULT_ITEM_ATUALIZAR.id, newData)
        const [resultado] = await database.list(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(result, expected)
    })
})