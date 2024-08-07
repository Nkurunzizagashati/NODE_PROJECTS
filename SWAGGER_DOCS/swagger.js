const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: '1.0.0',
			description: 'This is a sample API documentation',
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Development server',
			},
		],

		components: {
			schemas: {
				User: {
					type: 'object',
					require: ['fname', 'lname', 'email', 'password'],
					properties: {
						fname: {
							type: 'string',
							description: 'First name of the user',
						},
						lname: {
							type: 'string',
							description: 'Last name of the user',
						},
						email: {
							type: 'string',
							format: 'email',
							description: 'Email address of the user',
						},
						password: {
							type: 'string',
							description: 'Password of the user',
							minlength: 6,
						},
					},
				},
			},
		},
	},
};
