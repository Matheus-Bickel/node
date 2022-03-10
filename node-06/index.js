const commander = require('commander')
const database = require('./database')
const Hero = require('./hero')

async function main() {
    Commander
        .version('v1')
        .option('-n, --name [value]', "Hero name")
        .option('-p, --power [value]', "Hero power")
        .option('-c, --cadastrar', "cadastrar um heroi")
        .parse(process.argv)
        
        const hero = new Hero(Commander)
    
    try {
        if(Commander.post) {

            console.log(hero)
            //const result = await database.writeData(Commander)
        }


    } catch (error) {
        console.error('error', error)
    }

}

main()