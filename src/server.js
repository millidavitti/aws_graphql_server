const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./schema.graphql");
const resolvers = require("./resolvers");
const CompanyAPI = require("./company.dataSource");

async function startApolloServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		formatError(error) {
			const err = {
				message: "Something went wrong",
			};

			if (paths[error.path[0]]) err.message = error.message;

			// Return a custom error object
			return err;
		},
	});
	const { url } = await startStandaloneServer(server, {
		async context() {
			const { cache } = server;

			return {
				dataSources: {
					companyAPI: new CompanyAPI({ cache }),
				},
			};
		},
	});

	console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}
const paths = {
	getCompany: 1,
	createCompany: 1,
	updateCompany: 1,
	getSignedUploadUrl: 1,
	getSignedDownloadUrl: 1,
};
startApolloServer();
// https://olfmno7yfc.execute-api.us-east-1.amazonaws.com/
