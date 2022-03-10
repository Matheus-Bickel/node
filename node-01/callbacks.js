/*
    1 - usuário
    2 - obter numero de telefone pelo id do usuário
    3 - endereço pelo id
*/

function getUser(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            name: 'Aladin',
            birthday: new Date()
        })
    }, 1000)
}

function getPhone(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: '995145831',
            ddd: 51
        })
    }, 2000)
}

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'rua dos bobo'
        })
    }, 2000)
}

function resolveUser(error, user) {
    console.log('user', user)
}

getUser(function resolveUser(error, user) {
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
})
