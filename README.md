# Pro Se Litigant - Deployment Guide

This project is configured for deployment using Docker and GitHub Actions.

## Prerequisites

1.  **VPS** with Docker and Docker Compose installed.
2.  **GitHub Repository** hosting this code.
3.  **Domain Name** (optional, but recommended for production).

## Setup on VPS

1.  **Clone the repository** (or copy `docker-compose.prod.yml`, `infrastructure/`, and `deploy.sh` to your server).
    ```bash
    git clone <your-repo-url>
    cd pro-se-litigant
    ```

2.  **Create a `.env` file** based on `.env.example`.
    ```bash
    cp .env.example .env
    nano .env
    ```
    > **Important:** `.env` is listed in `.gitignore` and must **never** be committed to the repository. It contains secrets. Always keep it only on your server.

    **Critical variables to set:**
    *   `DOCKER_IMAGE_OWNER`: Your GitHub username (lowercase).
    *   `POSTGRES_USER`: Database username.
    *   `POSTGRES_PASSWORD`: A strong, unique database password.
    *   `JWT_SECRET`: A secure random string (generate one by running: `openssl rand -hex 32`).
    *   `CORS_ORIGIN`: Your frontend URL (use HTTPS in production, e.g., `https://your-domain.com`).
    *   `NEXT_PUBLIC_API_URL`: Your API URL (use HTTPS in production, e.g., `https://your-domain.com/api`).
    *   `STRIPE_API_KEY`: Your Stripe API key (from the Stripe dashboard).
    *   `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret.
    *   `OPENAI_API_KEY`: Your OpenAI API key.
    *   `LETSENCRYPT_EMAIL`: Email address for Let's Encrypt SSL certificates.

3.  **Login to GitHub Container Registry (GHCR)**
    You need a Personal Access Token (classic) with `read:packages` scope.
    ```bash
    echo <YOUR_PAT> | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
    ```

4.  **Initial Deployment**
    Run the deployment script:
    ```bash
    chmod +x deploy.sh
    ./deploy.sh
    ```

## CI/CD (GitHub Actions)

The repository includes workflows to automatically build and push Docker images to GHCR on every push to `main`.

*   `.github/workflows/deploy-web.yml`: Builds `pro-se-litigant-web`
*   `.github/workflows/deploy-api.yml`: Builds `pro-se-litigant-api`

### Automatic Deployment (Optional)

To enable automatic deployment to your VPS after build:

1.  Add the following secrets to your GitHub Repository (Settings -> Secrets and variables -> Actions):
    *   `VPS_HOST`: IP address of your VPS.
    *   `VPS_USERNAME`: SSH username (e.g., `root` or `ubuntu`).
    *   `VPS_SSH_KEY`: Your private SSH key.

2.  Create a new workflow `.github/workflows/deploy-vps.yml` that uses `appleboy/ssh-action` to run `./deploy.sh` on your server.
