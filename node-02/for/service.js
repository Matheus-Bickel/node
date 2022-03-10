const swapi = require('swapi-node');

swapi.get('https://swapi.dev/api/people/?search=r2').then((result) => {
    console.log(result);
});
