const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
	startServerAndCreateLambdaHandler,
	handlers,
} = require("@as-integrations/aws-lambda");

const typeDefs = require("./schema.graphql");
const resolvers = require("./resolvers");
const CompanyAPI = require("./company.dataSource");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: (error) => {
		console.log(error);
		const err = {
			message: error.message,
		};

		if (paths && error.path && paths[error.path[0]])
			err.message = error.message;

		// Return a custom error object
		return err;
	},
});
const graphqlHandler = startServerAndCreateLambdaHandler(
	server,
	handlers.createAPIGatewayProxyEventV2RequestHandler(),
	{
		async context() {
			const { cache } = server;

			return {
				dataSources: {
					companyAPI: new CompanyAPI({ cache }),
				},
			};
		},
	},
);

const paths = {
	getCompany: 1,
	createCompany: 1,
	updateCompany: 1,
	getSignedUploadUrl: 1,
	getSignedDownloadUrl: 1,
};

module.exports = { graphqlHandler };
