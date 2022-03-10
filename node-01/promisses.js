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

const userPromisse = getUser()

userPromisse
    .then(function (user) {
        return getPhone(user.id)
        .then(function resolvePhone(result) {
            return {
                user: {
                    name: user.name,
                    id: user.id
                },
                phone: result
            }
        })
    })
    .then(function (result) {
        const address = getAddressAsync(result.user.id)
        return address.then(function resolveAddress(result) {
            return {
                user: result.user,
                phone: result.phone,
                address: result
            }
        })
    })
    .then(function (result) {
        console.log('result', result)
    })
    .catch(function (error) {
        console.error('deu ruim', error) 
    })


/*getUser(function resolveUser(error, user) {
    // null || "" || 0 === false
    if(error) {
        console.error('deu ruim em user', error)
        return;
    }

    getPhone(user.id, function resolvePhone(error1, phone) {
        if(error1) {
            console.error('deu ruim em telefone', error)
            return;
        }

        getAddress(user.id, function (error2, address) {
            if(error2) {
                console.error('deu ruim em address', error)
                return;
            }

            console.log(`
            Name: ${user.name}
            Address: ${address.street}
            Phone: (${phone.ddd})${phone.phone}    
            `)
        })
    })
})*/
