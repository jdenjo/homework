const knex = require('./client');

const query1 = knex
	.insert({ title: 'My Post' })
	.into('posts')
	.returning('*');
// .then(result => console.log(result));

console.log(query1.toString());
query1.then(result => console.log(result));

knex.insert([
	{ title: 'Top 5 Schools', content: 'Hogwarts, CodeCore, etc' },
	{ title: 'Top 3 Rocks', content: 'Diamond, ruby, amethyst' },
	{ title: 'Top 3 Programming Languages', content: 'JavaScript, Ruby, PHP' },
])
	.into('posts')
	.returning('*')
	.then(result => console.log(result));

