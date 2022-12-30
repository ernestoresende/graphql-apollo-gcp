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

Edit the `CLOUD_FUNCTION_NAME` on the `.env` file to match the name of your function. This is used to name both your function entrypoint on the compiled output, and the deployment (see why this is required [here]()).

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

> **Note:**
> The deploy script currently uses POSIX compliant commands, and will not work on Windows. If you're using Windows, you can use the `gcloud` CLI tool directly to deploy your function, and change the correct flags accordingly:
>
> ```bash
> gcloud functions deploy <function-name> --runtime nodejs16 --trigger-http --allow-unauthenticated --entry-point=<function-name> --source=dist
> ```

### Github Actions deployment

This project is also configured to be deployed to Google Cloud Functions using Github Actions. To use the provided workflow, you'll have to provide the following secrets to your repository:

```bash
WORKLOAD_IDENTITY_PROVIDER="projects/123456789/locations/global/workloadIdentityPools/my-pool/providers/my-provider"
SERVICE_PROVIDER="my-service-account@my-project.iam.gserviceaccount.com"
```
