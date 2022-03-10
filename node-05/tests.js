const assert = require('assert')

describe('Star Wars Teste', function () {
    it('deve buscar o r2-d2', async () => {
        const expected = [{
            name: 'R2-D2',
            height: '96'
        }]

        const nameBase = 'r2-d2'
        const result = await getPeople(nameBase)
        assert.deepEqual(result, expected)
    })
})