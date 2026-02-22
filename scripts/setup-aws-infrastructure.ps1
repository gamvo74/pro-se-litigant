# Configuration
$REGION = "us-east-1"
$PROJECT_NAME = "pro-se-litigant"
$CLUSTER_NAME = "${PROJECT_NAME}-cluster"
$REPO_NAME = "${PROJECT_NAME}-api"

Write-Host "STARTING: AWS Infrastructure Setup for $PROJECT_NAME..." -ForegroundColor Cyan

# 1. Create ECR Repository
Write-Host "TASK 1: Creating ECR Repository..." -ForegroundColor Yellow
aws ecr create-repository --repository-name $REPO_NAME --region $REGION

# 2. Create ECS Cluster
Write-Host "TASK 2: Creating ECS Cluster..." -ForegroundColor Yellow
aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $REGION

# 3. Create Log Group
Write-Host "TASK 3: Creating CloudWatch Log Group..." -ForegroundColor Yellow
aws logs create-log-group --log-group-name "/ecs/$PROJECT_NAME-api" --region $REGION

# 4. Register Task Definition
Write-Host "TASK 4: Registering Task Definition..." -ForegroundColor Yellow
aws ecs register-task-definition --cli-input-json file://infrastructure/ecs/task-definition.json --region $REGION

Write-Host "SUCCESS: Basic infrastructure components (ECR, ECS Cluster, Logs) are ready!" -ForegroundColor Green
Write-Host "Next steps: "
Write-Host "1. Configure your GitHub Secrets (AWS_ACCESS_KEY_ID, etc.)."
Write-Host "2. Push your code to the 'main' branch to trigger the deployment."
