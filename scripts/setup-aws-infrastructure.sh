#!/bin/bash

# Configuration
REGION="us-east-1"
PROJECT_NAME="pro-se-litigant"
CLUSTER_NAME="${PROJECT_NAME}-cluster"
SERVICE_NAME="${PROJECT_NAME}-service"
REPO_NAME="${PROJECT_NAME}-api"

echo "🚀 Starting AWS Infrastructure Setup for $PROJECT_NAME..."

# 1. Create ECR Repository
echo "📦 Creating ECR Repository..."
aws ecr create-repository --repository-name $REPO_NAME --region $REGION || echo "Repository already exists."

# 2. Create ECS Cluster
echo "🏗️ Creating ECS Cluster..."
aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $REGION || echo "Cluster already exists."

# 3. Create Log Group
echo "📝 Creating CloudWatch Log Group..."
aws logs create-log-group --log-group-name "/ecs/$PROJECT_NAME-api" --region $REGION || echo "Log group already exists."

# 4. Register Task Definition
echo "📜 Registering Task Definition..."
aws ecs register-task-definition --cli-input-json file://infrastructure/ecs/task-definition.json --region $REGION

# 5. Create Load Balancer (Simplified)
echo "🌐 Note: Load Balancer, VPC, and Subnets should be configured via AWS Console or Terraform for security."
echo "   Required: Target Group on Port 4000, Security Group allowing 80/443."

echo "✅ Basic infrastructure components (ECR, ECS Cluster, Logs) are ready."
echo "👉 Next steps: "
echo "1. Set up your RDS PostgreSQL database."
echo "2. Add your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to GitHub Secrets."
echo "3. Run the GitHub Action by pushing to 'main'."
