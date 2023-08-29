#! bin/bash 

sudo apt update -y

sudo apt upgrade -y

sudo apt install docker docker.io -y

sudo apt install awscli -y

aws configure set aws_access_key_id ACCESS_KEY

aws configure set aws_secret_access_key SECRET_KEY

sudo chmod 666 /var/run/docker.sock

ecr_repo=$(cd terraform/ECR && terraform output -raw ecr_url)

aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin $ecr_repo

MOD_DOCKER_IMG=$(echo IMG_NAME | sed "s|:|-|g")

docker pull $ecr_repo:$MOD_DOCKER_IMG

docker run -d -p 3000:3000 $ecr_repo:$MOD_DOCKER_IMG