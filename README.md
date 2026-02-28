# Pro Se Litigant - Deployment Guide

This project is configured for deployment using Docker and GitHub Actions.

## Prerequisites

1.  **VPS** with Docker and Docker Compose installed.
2.  **GitHub Repository** hosting this code.
3.  **Domain Name** (optional, but recommended for production).

## Deploying from Git Bash (Windows)

You can run all deployment scripts directly from **Git Bash** on Windows. Git Bash ships with every [Git for Windows](https://gitforwindows.org/) installation.

> **Important:** The repository's `.gitattributes` file enforces LF line endings for all `.sh` files, so scripts checked out on Windows will still run correctly in Git Bash without `\r: command not found` errors.

### Prerequisites (Windows)

1.  Install [Git for Windows](https://gitforwindows.org/) (provides Git Bash).
2.  Install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) and ensure it is running.
3.  Optionally install the [GitHub CLI](https://cli.github.com/) to trigger remote workflows.

### Steps

1.  **Open Git Bash** and clone the repository:
    ```bash
    git clone <your-repo-url>
    cd pro-se-litigant
    ```

2.  **Create a `.env` file** from the example:
    ```bash
    cp .env.example .env
    # Edit .env with your preferred editor, e.g.:
    notepad .env
    ```

3.  **Log in to GitHub Container Registry (GHCR)**:
    ```bash
    docker login ghcr.io -u <YOUR_GITHUB_USERNAME>
    # You will be prompted for your password — enter a Personal Access Token
    # (classic) with the read:packages scope.
    ```

4.  **Run the deployment script**:
    ```bash
    ./deploy.sh
    ```

    If you see a *permission denied* error, make the script executable first:
    ```bash
    chmod +x deploy.sh
    ./deploy.sh
    ```

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
    **Critical variables to set:**
    *   `DOCKER_IMAGE_OWNER`: Your GitHub username (lowercase).
    *   `POSTGRES_USER`: Database username.
    *   `POSTGRES_PASSWORD`: Database password.
    *   `JWT_SECRET`: A secure random string.
    *   `CORS_ORIGIN`: Your frontend URL (e.g., `http://your-domain.com`).
    *   `NEXT_PUBLIC_API_URL`: Your API URL (e.g., `http://your-domain.com/api`).

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

### Manual Deployment from Desktop

You can trigger deployments manually from your desktop using the [GitHub CLI](https://cli.github.com/):

```bash
# Build and push the API image
gh workflow run deploy-api.yml

# Build and push the Web image
gh workflow run deploy-web.yml

# Deploy the latest images to your VPS (requires VPS secrets configured)
gh workflow run deploy-vps.yml
```

Alternatively, you can trigger workflows from the GitHub web UI by navigating to **Actions** → selecting the workflow → clicking **Run workflow**.

### Automatic Deployment (Optional)

To enable automatic deployment to your VPS after build:

1.  Add the following secrets to your GitHub Repository (Settings -> Secrets and variables -> Actions):
    *   `VPS_HOST`: IP address of your VPS.
    *   `VPS_USERNAME`: SSH username (e.g., `root` or `ubuntu`).
    *   `VPS_SSH_KEY`: Your private SSH key.

2.  Create a new workflow `.github/workflows/deploy-vps.yml` that uses `appleboy/ssh-action` to run `./deploy.sh` on your server.
