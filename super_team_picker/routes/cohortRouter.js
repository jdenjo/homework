const express = require('express');
const knex = require('../db/client'); // This allows us to interact with the database
const randomizer = require('../modules/randomTeams'); // This allows us to interact with the database

const router = express.Router();

//route for new cohort input
router.get('/new', (req, res) => {
	res.render('cohorts/new');
});

// NAME: cohorts#create, METHOD: POST, PATH: /cohorts
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
			res.redirect(`/cohorts/${teams[0].id}`);
		});
});


router.get('/', (req, res) => {
	// knex.select('*').from('cohorts').then(...) <- this works too, or we can just use the line below
	knex('cohorts')
		.orderBy('createdAt', 'desc')
		.then(teams => {
			// notice the res.render is within the callback to `.then`
			res.render('cohorts/index', { teams: teams });
		});
});

// NAME: cohorts#show, METHOD: GET, PATH: /cohorts/:id
router.get('/:id', (req, res) => {
	// const formData = req.body;
	const id = req.params.id;
	const formData = req.query;
	const teams = randomizer(formData);
	

	console.log(formData);

	knex('cohorts')
		.where('id', id)
		.first()		
		.then(post => {
			if (post) {
				res.render('cohorts/show', { post: post, formData: formData, teams : teams });
			} else {
				res.redirect('/cohorts');
			}
		});
});


// NAME: cohorts#destroy, METHOD: DELETE, PATH: /cohorts/:id
router.delete('/:id', (req, res) => {
	knex('cohorts')
		.where('id', req.params.id)
		.del()
		.then(() => {
			res.redirect('/cohorts');
		});
});

// NAME: cohorts#edit, METHOD: GET, PATH: /cohorts/:id/edit
router.get('/:id/edit', (req, res) => {
	knex('cohorts')
		.where('id', req.params.id)
		.first()
		.then(team => {
			res.render('cohorts/edit', { team: team });
		});
});

// Name: cohorts#update, METHOD: PATCH, PATH: /cohorts/:id
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
			res.redirect(`/cohorts/${req.params.id}`);
		});
});

module.exports = router;
