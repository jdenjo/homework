const express = require('express');
const knex = require('../db/client'); // This allows us to interact with the database

const router = express.Router();

// This postsRouter does not mean that all routes using the HTTP VERB: POST
// need to be within this router
// The name of this router comes from the table name within our database called
// "posts".

// this route is automatically prepended with "/posts"
// meaning that it is the path: "/posts/new", NOT just "/new"
// NAME: posts#new, METHOD: GET, PATH: '/posts/new'
router.get('/new', (req, res) => {
	// This will render the new.ejs file located within the posts
	// directory of the views directory
	res.render('posts/new');
});

// NAME: posts#create, METHOD: POST, PATH: /posts
router.post('/', (req, res) => {
	const formData = req.body;
	knex('cohorts')
		.insert({
			name: formData.title,
			members: formData.content,
			logourl: formData.imageUrl,
		})
		.returning('*')
		.then(teams => {
			// This is called "destructuring" the array
			const [post /*, post2 */] = teams;
			// const post = posts[0];
			// const post2 = posts[1];

			// If we want to use a terminating method like
			// res.send, res.render, or res.redirect
			// And we want to do this after inserting something,
			// updating something, reading something, etc from our db
			// We need to use that terminating method
			// within the callback to `.then`
			
			res.redirect(`/posts/${teams[0].id}`);
			// res.redirect('/');
		});
});

// NAME: posts#index, METHOD: GET, PATH: /posts
router.get('/', (req, res) => {
	// knex.select('*').from('posts').then(...) <- this works too, or we can just use the line below
	knex('cohorts')
		.orderBy('createdAt', 'desc')
		.then(teams => {
			// notice the res.render is within the callback to `.then`
			res.render('posts/index', { teams: teams });
		});
});

// NAME: posts#show, METHOD: GET, PATH: /posts/:id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	knex('cohorts')
		.where('id', id)
		.first()		
		.then(post => {
			if (post) {
				res.render('posts/show', { post: post });
			} else {
				res.redirect('/posts');
			}
		});
});

router.post('/team', (req, res) => {
	const formData = req.body;
	console.log(formData);

	knex('cohorts')
		.where('id', formData.id)
		.first()		
		.then(post => {
			if (post) {
				console.log(`got here: ${formData}`)
				res.render('posts/showTeams', { post: post , formData: formData });
			} else {
				res.redirect('/posts');
			}
		});
});



// NAME: posts#destroy, METHOD: DELETE, PATH: /posts/:id
router.delete('/:id', (req, res) => {
	knex('cohorts')
		.where('id', req.params.id)
		.del()
		.then(() => {
			res.redirect('/posts');
		});
});

// NAME: posts#edit, METHOD: GET, PATH: /posts/:id/edit
router.get('/:id/edit', (req, res) => {
	knex('cohorts')
		.where('id', req.params.id)
		.first()
		.then(team => {
			res.render('posts/edit', { team: team });
		});
});

// Name: posts#update, METHOD: PATCH, PATH: /posts/:id
router.patch('/:id', (req, res) => {
	const updatedPost = {
		name: req.body.name,
		members: req.body.members,
		logurl: req.body.logurl,
	};
	knex('cohorts')
		.where('id', req.params.id)
		.update(updatedPost)
		.then(() => {
			res.redirect(`/posts/${req.params.id}`);
		});
});

module.exports = router;
