#! bin/bash 

sudo apt update -y

sudo apt upgrade -y

sudo apt install docker docker.io -y

sudo apt install awscli -y

aws configure set aws_access_key_id ACCESS_KEY

aws configure set aws_secret_access_key SECRET_KEY

sudo chmod 666 /var/run/docker.sock

aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin ECR_REPO

docker pull ECR_REPO:node-18-alpine