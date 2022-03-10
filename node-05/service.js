const {
    get
} = require('axios')
const assert = require('assert')
const swapi = require('swapi-node')
const nock = require('nock')

describe('Star Wars Teste', function () {
    this.beforeAll(() => {
        const response = {
            "name": "R2-D2",
            "height": "96"
        }

        nock('https://swapi.dev/api/people')
        .get('/?search=r2')
        .reply(200, response)
    })

    it('deve buscar o r2-d2', async () => {
        const expected = [{
            name: 'R2-D2',
            height: '96'
        }]

        const result = await swapi.get('https://swapi.dev/api/people/?search=r2').then((result) => {

            console.log(result);
    
            return result.data
        })

        //assert.equal(result, expected)
    })
})