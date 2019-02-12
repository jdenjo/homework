const knex = require('./client');

// const query1 = knex
// 	.select()
//     .from('posts')
//     .where('title', 'ilike', '%e')
// 	// .returning('*');
// // .then(result => console.log(result));

// console.log(query1.toString());
// query1.then(result => console.log(result));

// knex.insert([
// 	{ title: 'Top 5 Schools', content: 'Hogwarts, CodeCore, etc' },
// 	{ title: 'Top 3 Rocks', content: 'Diamond, ruby, amethyst' },
// 	{ title: 'Top 3 Programming Languages', content: 'JavaScript, Ruby, PHP' },
// ])
// 	.into('posts')
// 	.returning('*')
// 	.then(result => console.log(result));

const query2 = knex("posts")
    .where("id", "<=", "5")
    .update({
        title: "sparkled",
        });

console.log(query2.toString());
query2.then(result => console.log(result));

// Delete all posts but one
// I know post with id 17 exists
const deleteQuery = knex('posts')
	.where('id', '!=', '17')
	.del();
console.log(deleteQuery.toString());

deleteQuery.then(result => {
	console.log('deleteQuery result:', result);
	knex.destroy();
});



const query3 = knex.raw('SELECT * FROM posts;');
console.log(query3.toString());
query3.then(result => {
	knex.destroy();
});