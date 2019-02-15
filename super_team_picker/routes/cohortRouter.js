const express = require('express');
const knex = require('../db/client'); // This allows us to interact with the database

const router = express.Router();

//route for new cohort input
router.get('/new', (req, res) => {
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
			const [post /*, post2 */] = teams;			
			res.redirect(`/posts/${teams[0].id}`);
		});
});


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
	// const formData = req.body;
	const id = req.params.id;
	const formData = req.query;
	knex('cohorts')
		.where('id', id)
		.first()		
		.then(post => {
			if (post) {
				res.render('posts/show', { post: post, formData: formData });
			} else {
				res.redirect('/posts');
			}
		});
});

router.post('/:id', (req, res) => {
	const formData = req.body;
	console.log(formData);

	knex('cohorts')
		.where('id', formData.id)
		.first()		
		.then(post => {
			if (post) {
				console.log(`got here: ${formData}`)
				res.render('posts/show', { post: post , formData: formData });
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
