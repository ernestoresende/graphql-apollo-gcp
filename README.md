# graphql-apollo-gcp

An Apollo Server integration for use with Google Cloud Functions.

## Quickstart

Install dependencies with the package manager of your choice (the project uses pnpm by default):

```bash
# NPM
npm install

# Yarn
yarn install

# PNPM
pnpm install
```

> **Warning**
> If you're not using PNPM, delete the `pnpm-lock.yaml` file.

Copy the `.env.example` file and set the environment variables:

```bash
# Copy the example .env file to your local .env
cp .env.example .env
```

Edit the `CLOUD_FUNCTION_NAME` on the `.env` file to match the name of your function. This is used to name both your function entrypoint on the compiled output, and the deployment.

Start and test the development server:

```bash
pnpm run start
```

The start script will build the project into a bundle usable by Google Cloud Functions and start a local development server using the `@google-cloud/functions-framework` package provided for Node.js runtimes. The server will be available at `http://localhost:8080`, and will run with an Apollo Server Playground where you can test your queries.

## Deployment

> **Warning**
> Before making your first deployment, it's highly recommeded that you understand the difference between Cloud Functions 1st and 2nd generation. While Google recommends that you create new functions on 2nd gen whenever possible, they do not yet support deploying from source repositories, or have a published action for GitHub Actions, You can find more information [here](https://cloud.google.com/functions/docs/concepts/version-comparison).

### Local deployment

The project is configured to be deployed to Google Cloud Functions trough the Google Cloud CLI Tool. To deploy the project, run the following command:

```bash
pnpm run gcp:deploy
```

To use the provided deploy script, you need to have the Google Cloud CLI Tool installed and configured on your machine. You can find more information about the CLI Tool [here](https://cloud.google.com/sdk/gcloud).

The script will use the bundled output from the `/dist` directory, and name your function using the provided string on the `CLOUD_FUNCTION_NAME` environment variable.

> **Note**
> The deploy script currently uses POSIX compliant commands, and **will not work on Windows** (I encourage you to file an issue and/or open a pull request if you can help me solve this). If you're using Windows, you can use the `gcloud` CLI tool directly to deploy your function, and change the correct flags accordingly.
>
> Run the `prepack` command to generate the `/dist` directory. Then run the GCloud CLI Tool with the following command:
>
> ```powershell
> gcloud functions deploy <function-name> --runtime nodejs16 --trigger-http --allow-unauthenticated --entry-point=<function-name> --source=dist
> ```
>
> Beware that the `--entry-point` flag should match the name provided in the CLOUD_FUNCTION_NAME environment variable.

### Github Actions deployment

This project is also configured to be deployed to Google Cloud Functions using Github Actions. To use the provided workflow, you will have to supply the following repository secrets:

- `CLOUD_FUNCTION_NAME`: A function name compliant with Google Cloud Functions Gen 2 naming conventions (see [here](https://cloud.google.com/functions/docs/deploy#basics)). The value provided here will be supplied to both the Cloud Function name and the `--entry-point` flag.
- `CLOUD_FUNCTION_REGION`: A valid Cloud Function Location that supports Google Cloud Functions Gen2. You can check the available locations [here](https://cloud.google.com/functions/docs/locations).
- `CREDENTIALS_JSON`: A Service Account Key JSON with correct Role Permissions for Google Cloud Functions. The generated JSON token should be minified before being input here, as GitHub secrets get masked on log output with each line, which could lead to agressive sanitization. Information about how to manage service account keys can be found [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

