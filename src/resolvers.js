const { v4: uuidv4 } = require("uuid");
const resolvers = {
	Query: {
		getCompanies(_, { skip, limit }, { dataSources }) {
			return dataSources.companyAPI.getCompanies(skip, limit);
		},
		getCompany(_, { id }, { dataSources }) {
			if (!UUIDRegex.test(id))
				throw new Error("Invalid input syntax for type uuid:");
			return dataSources.companyAPI.getCompany(id);
		},
		getSignedUploadUrl(_, { input }, { dataSources }) {
			const { fileName, contentType } = input;
			return dataSources.companyAPI.getSignedUploadUrl({
				fileName,
				contentType,
			});
		},
		getSignedDownloadUrl(_, { s3Key }, { dataSources }) {
			return dataSources.companyAPI.getSignedDownloadUrl({
				s3Key,
			});
		},
	},
	Company: {
		primaryContactPerson({ primaryContactPerson }) {
			return primaryContactPerson;
		},
		registeredAddress({ registeredAddress }) {
			return registeredAddress;
		},
		mailingAddress({ mailingAddress }) {
			return mailingAddress;
		},
	},
	Mutation: {
		async createCompany(_, { input }, { dataSources }) {
			const isValidCompanyObject = checkProps(input, propTypeMap, requireProps);

			if (isValidCompanyObject) throw new Error(isValidCompanyObject);

			const newCompany = {
				id: uuidv4(),
				...input,
			};
			const data = await dataSources.companyAPI.createCompany(newCompany);

			return { company: data };
		},
		async updateCompany(_, { input, companyId }, { dataSources }) {
			if (!UUIDRegex.test(companyId))
				throw new Error("Invalid input syntax for type uuid:");

			const existingCompany = await dataSources.companyAPI.getCompany(
				companyId,
			);
			if (!existingCompany) {
				throw new Error("Company not found");
			}

			input.id = companyId;
			const data = await dataSources.companyAPI.updateCompany(input);
			return { company: data };
		},
	},
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

// Helper functions

function removeFields(obj, fieldsToRemove) {
	fieldsToRemove.forEach((field) => {
		delete obj[field];
	});
	for (let prop in obj) {
		if (obj[prop] !== null && typeof obj[prop] === "object") {
			removeFields(obj[prop], fieldsToRemove);
		}
	}
	return obj;
}

function checkProps(obj, propTypeMap, requiredProps) {
	for (let prop in requiredProps) {
		if (!obj.hasOwnProperty(requiredProps[prop])) {
			return `Missing required property: ${requiredProps[prop]}`;
		}
	}

	for (let prop in obj) {
		if (
			propTypeMap.hasOwnProperty(prop) &&
			typeof obj[prop] !== propTypeMap[prop]
		) {
			return `Property "${prop}" should be of type "${propTypeMap[prop]}".`;
		}
	}

	return null;
}

const propTypeMap = {
	legalName: "string",
	stateOfIncorporation: "string",
	industry: "string",
	totalNumberOfEmployees: "number",
	numberOfPartTimeEmployees: "number",
	numberOfFullTimeEmployees: "number",
	linkedInCompanyPage: "string",
	facebookCompanyPage: "string",
	website: "string",
	logoS3Key: "string",
	isMailingAddressDifferentFromRegisteredAddress: "boolean",
	phone: "string",
	fax: "string",
	email: "string",
};
const requireProps = [
	"legalName",
	"stateOfIncorporation",
	"industry",
	"totalNumberOfEmployees",
	"numberOfPartTimeEmployees",
	"numberOfFullTimeEmployees",
	"linkedInCompanyPage",
	"facebookCompanyPage",
	"website",
	"logoS3Key",
	"isMailingAddressDifferentFromRegisteredAddress",
	"phone",
	"fax",
	"email",
];
const fieldsToRemove = [
	"isMailingAddressDifferentFromRegisteredAddress",
	"_id",
];
const UUIDRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

module.exports = resolvers;
