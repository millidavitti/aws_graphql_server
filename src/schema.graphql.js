const gql = require("graphql-tag");

const typeDefs = gql`
	# Schema definitions go here
	type Query {
  getCompanies:[Company]!
		getCompany(id: String): Company!
		getSignedUploadUrl(input: SignedFileUploadInput): SignedLinkData!
		getSignedDownloadUrl(s3Key: String): SignedLinkData!
	}

	type Company {
		id: ID!
		legalName: String
		stateOfIncorporation: String
		industry: String
		totalNumberOfEmployees: Int
		numberOfFullTimeEmployees: Int
		numberOfPartTimeEmployees: Int
		website: String
		linkedInCompanyPage: String
		facebookCompanyPage: String
		otherInformation: String
		primaryContactPerson: Contact
		logoS3Key: String
		phone: String
		fax: String
		email: String
		registeredAddress: BasicAddress
		mailingAddress: BasicAddress
	}

	input UpdateCompanyInput {
		legalName: String
		stateOfIncorporation: String
		industry: String
		totalNumberOfEmployees: Int
		numberOfPartTimeEmployees: Int
		numberOfFullTimeEmployees: Int
		linkedInCompanyPage: String
		facebookCompanyPage: String
		website: String
		logoS3Key: String
		registeredAddress: BasicAddressInput
		mailingAddress: BasicAddressInput
		isMailingAddressDifferentFromRegisteredAddress: Boolean
		phone: String
		fax: String
		email: String
		otherInformation: String
		primaryContactPerson: ContactInput
	}

	type BasicAddress {
		country: String
		state: String
		city: String
		street: String
		zipCode: String
	}

	input BasicAddressInput {
		country: String!
		state: String!
		city: String!
		street: String!
		zipCode: String!
	}

	type SignedLinkData {
		url: String!
		key: String!
	}

	input SignedFileUploadInput {
		fileName: String!
		contentType: String!
	}

	type UpdateCompanyResponse {
		company: Company!
	}

	type Mutation {
		updateCompany(
			companyId: ID!
			input: UpdateCompanyInput!
		): UpdateCompanyResponse!
		createCompany(input: UpdateCompanyInput!): UpdateCompanyResponse!
	}

	type Contact {
		firstName: String
		lastName: String
		email: String
		phone: String
	}

	input ContactInput {
		firstName: String
		lastName: String
		email: String
		phone: String
	}
`;
module.exports = typeDefs;
