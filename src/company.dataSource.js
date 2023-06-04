const { RESTDataSource } = require("@apollo/datasource-rest");

class CompanyAPI extends RESTDataSource {
	baseURL = "https://aws-signed-url.vercel.app/api/";
	// baseURL = "http://localhost:3000//api/";

	getCompanies() {
		return this.get("company");
	}

	getCompany(id) {
		return this.get(`company/${encodeURIComponent(id)}`);
	}

	async getSignedUploadUrl({ fileName, contentType }) {
		const params = new URLSearchParams({ fileName, contentType });
		const data = await this.get(`getSignedUploadUrl?${params}`);

		return data.getSignedUploadUrl;
	}

	async getSignedDownloadUrl(s3Key) {
		const params = new URLSearchParams(s3Key);
		const data = await this.get(`getSignedDownloadUrl?${params}`);

		return data.getSignedDownloadUrl;
	}

	async createCompany(input) {
		const data = await this.post("company/create", { body: input });
		return data;
	}

	async updateCompany(input) {
		const data = await this.post("company/update", { body: input });
		return data;
	}
}
module.exports = CompanyAPI;
