const {
    readFile,
    writeFile
} = require('fs')
const { interfaces } = require('mocha')
const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async getData() {
        const data = await readFileAsync(this.NOME_ARQUIVO, 'utf8')

        return JSON.parse(data.toString())
    }

    async writeData(data) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(data))
        return true
    }

    async post(hero) {
        const data = await this.getData()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroId = {
            id,
            ...hero
        }
        const finalData = [
            ...data,
            heroId
        ]
        
        const result = await this.writeData(finalData)
        return result
    }

    async list(id) {
        
        const data = await this.getData()
        const dataFiltered = data.filter(item => (id ? (item.id === id): true))

        return dataFiltered

    }

    async remove(id) {
        if(!id) {
            await this.writeFile([])
            return
        }

        const data = await this.getData()
        const index = data.findIndex(item => item.id === parseInt(id))
        
        if(!index === -1) {
            throw error ('O heroi não existe')
        }

        data.splice(index, 1)
        return await this.writeData(data)
    }

    async update(id, update) {
        const data = await this.getData()
        const index = data.findIndex(item => item.id === parseInt(id))

        if(index === -1) {
            throw erro('o heroi informado não existe ainda')
        }

        const actual = data[index]
        const updateObject = {
            ...actual,
            ...update
        }
        
        data.splice(index, 1)

        return await this.writeData([
            ...data,
            ...updateObject
        ])
    }
}

module.exports = new Database()