module.exports = {
	// Use environment variable when available (Render, Vercel, etc.).
	// Fallback is set to the provided cluster URI for convenience.
	'url': process.env.MONGODB_URI || 'mongodb+srv://laluutruongsa_db_user:qGKu9bLYNScbSArC@cluster0.qus7qkd.mongodb.net/?appName=Cluster0',
	'options': {
		'dbName': process.env.MONGODB_DBNAME || 'myFirstDatabase',
		'useNewUrlParser': true,
		'useUnifiedTopology': true,
	},
};
