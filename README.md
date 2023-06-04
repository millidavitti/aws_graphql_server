# GraphQL Server with Apollo and Serverless Framework

This repository contains a GraphQL server built with Apollo Server and deployed using the Serverless Framework CLI on AWS. The server connects to a REST API built by a Next.js app as its data source. It utilizes the following dependencies:

- `@apollo/datasource-rest`: Version 6.0.0
- `@apollo/server`: Version 4.7.1
- `@as-integrations/aws-lambda`: Version 2.0.1
- `graphql`: Version 16.6.0
- `graphql-tag`: Version 2.12.6
- `uuid`: Version 9.0.0

## Prerequisites

Before running the GraphQL server, ensure you have the following prerequisites installed on your development machine:

- Node.js: Install Node.js from the official website (https://nodejs.org).
- Serverless Framework: Install the Serverless Framework CLI globally using the following command:

  ```bash
  npm install -g serverless
  ```

## Getting Started

To set up and run the GraphQL server locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/millidavitti/aws_graphql_server.git
   ```

2. Install the dependencies:

   ```bash
   cd graphql-server
   npm install
   ```

3. Start the server locally:

   ```bash
   npm run start
   ```

   This command will start the GraphQL server locally on the specified port.

4. Access the GraphQL Playground:

   Open your browser and visit `http://localhost:4000` to access the GraphQL Playground. Here, you can test and interact with the GraphQL API.

## Deployment

To deploy the GraphQL server to AWS using the Serverless Framework CLI, follow these steps:

1. Configure AWS credentials:

   Set up your AWS credentials by following the instructions provided by AWS (https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

2. Update the Serverless configuration:

   - Open the `serverless.yml` file in the root directory of the project.
   - Modify the configuration options according to your requirements, such as the AWS region, function name, etc.

3. Deploy the server:

   In the terminal or command prompt, run the following command:

   ```bash
   serverless deploy
   ```

   This command will package and deploy the GraphQL server to AWS Lambda and set up the necessary resources.

4. Note the deployed endpoint:

   Once the deployment is successful, the Serverless Framework CLI will provide you with the endpoint URL of your deployed GraphQL server. Make a note of this URL as it will be used to access your GraphQL API.

## Usage

- Query and Mutation:

  Use the GraphQL Playground or any GraphQL client to send queries and mutations to the deployed GraphQL server. Refer to the provided GraphQL schema for the available query and mutation types.

- REST API Integration:

  This GraphQL server integrates with a REST API. Ensure that the REST API is deployed and accessible. Update the appropriate URLs and endpoints in the GraphQL resolvers to connect to the REST API as needed.

## Contributions

Contributions to the project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue in the repository.

## License

This project is licensed under the [MIT License](LICENSE).
