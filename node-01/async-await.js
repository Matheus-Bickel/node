/*
    1 - usuário
    2 - obter numero de telefone pelo id do usuário
    3 - endereço pelo id
*/

const util = require('util')
const getAddressAsync = util.promisify(getAddress)

function getUser() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve ({
                id: 1,
                name: 'Aladin',
                birthday: new Date()
            })
        }, 1000)
    })
}

function getPhone(userId) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            return resolve ({
                phone: '995145831',
                ddd: 51
            })
        }, 2000)
    })
}

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback (null, {
            street: 'rua dos bobo'
        })
    }, 2000)
}

main()

async function main() {
    try {
        const user = await getUser()

        const result = await Promise.all([
            getPhone(user.id),
            getAddressAsync(user.id)
        ])
        
        const address = result[1]
        const phone = result[0]

        console.log(`
        Name: ${user.name}
        Address: ${address.street}
        Phone: (${phone.ddd})${phone.phone}    
        `)

    } catch (error) {
        console.error('deu ruim', error)
    }
}