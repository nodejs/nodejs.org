<p align="center">
  <br />
  <a href="https://nodejs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/static/images/logos/nodejs-new-pantone-white.svg">
      <img src="./public/static/images/logos/nodejs-new-pantone-black.svg" width="200px">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://nodejs.org">Node.js</a> Website built using Next.js with TypeScript, SCSS and MDXv2
</p>

<p align="center">
  <a title="MIT License" href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" />
  </a>
  <a title="Localised" href="https://crowdin.com/project/nodejs-website">
    <img src="https://badges.crowdin.net/nodejs-website/localized.svg" alt="Crowdin Badge" />
  </a>
  <a title="Vercel" href="https://vercel.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/powered%20by-Vercel%20%E2%96%B2-white">
      <img src="https://img.shields.io/badge/powered%20by-Vercel%20%E2%96%B2-black" alt="Powered by Vercel">
    </picture>
  </a>

  <br />

  <img src="https://github.com/nodejs/nodejs.org/actions/workflows/build.yml/badge.svg" alt="Build and Analysis Checks" />
  <a title="scorecard" href="https://securityscorecards.dev/viewer/?uri=github.com/nodejs/nodejs.org">
    <img src="https://api.securityscorecards.dev/projects/github.com/nodejs/nodejs.org/badge" alt="nodejs.org scorecard badge" />
  </a>

  <br />
  <br />
</p>

## What is this repo?

[Nodejs.org](https://nodejs.org/) by the [OpenJS Foundation](https://openjsf.org/) is the official website for the Node.js® JavaScript runtime. This repo is the source code for the website. It is built using [Next.js](https://nextjs.org), a React Framework.

```bash
npm ci
npx turbo serve

# listening at localhost:3000
```
### Task description
- (1) Create a GitLab repository.
- (2) Set up a Jenkins multibranch pipeline. 
- (3) Configure a local agent. 
- (4) Create an installation stage in the pipeline to set up the necessary dependencies.
- (5) Run unit tests stage.
- (6) Run the build stage.
- (7) Add Code analysis (SonarQube) to the pipeline.
- (8) Dockerize the application.
- (9) Pushing the docker Image AWS ECR.
- (10) Create a terraform IAC to configure (security group, an EC2 instance, and ECR) to deploy the
       application on it. And integrate this terraform with Jenkins Pipeline (to be provisioned using Jenkins).
- (11) Perform smoke testing in the development environment.
- (12)- Deploy the Node.js app to an EC2 on the machine.
- (13)- Include a README file to explain the above steps.


### prerequisites
- Docker
- Terraform
- Jenkins with docker pipeline plugin
- AWS account
- Sonarqube server

### Jenkinsfile breakdown

### Jenkinsfile breakdown:
- environment 
```diff 
    # Using jenkins global credentials
    environment {
        USER_CREDENTIALS = credentials('docker_account')
        DOCKER_IMAGE = "node-docker:v-${BUILD_ID}"
        DOCKER_USERNAME = "${USER_CREDENTIALS_USR}"
        DOCKER_PASSWORD = "${USER_CREDENTIALS_PSW}"

        AWS_CREDENTIALS = credentials('aws_credentials')
        ACCESS_KEY = "${AWS_CREDENTIALS_USR}"
        SECRET_KEY = "${AWS_CREDENTIALS_PSW}"

    }
```

- Stage(1) Install npm dependencies
```diff
        stage("install dependencies") {

            steps {
                sh 'npm ci'
            }
            post {
                success {
                    echo "Dependencies installed successfully"
                }
                failure {
                    echo "Something went wrong please try again later"
                }

            }

        }
```
- stage(2) Unit test and build are done in parallel to reduce time
```diff
        stage("Test&Build"){
            parallel {
                stage("Test") {

                    steps {
                        sh 'npm run test:unit'
                    }

                }
                stage("Build") {

                    steps {
                        sh 'npm run build'
                    }

                }
            }
        }

```
- stage(3) Perform sonarqube scan
```diff
        stage('Sonarqube scan') {
            steps {
                script{
                    def sonarScannerHome = tool name: 'sq1', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv(installationName: "sq1") {
                        sh """
                            ${sonarScannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=nodejs \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=${env.SONAR_HOST_URL} \
                            -Dsonar.login=${env.SONAR_AUTH_TOKEN} \
                            -Dsonar.projectName=nodejs \
                        """
                    }
                }
           }
        }

```
- stage(4) Checking for quality gates as if project doesn't pass we want to fail the following stages
```diff
        stage("Sonarqube quality gate check") {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
```
- stage(5) Build docker image
```diff
        stage('Docker Build') {

            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
-- Docker file ------------------------------------
# Stage 1: Build the React app
FROM node:18-alpine

# Set the environment of node 
ENV NODE_ENV='development'


# Set a working directory
WORKDIR /app

# Clear node cache
RUN npm cache clean --force

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Update npm version
RUN npm install -g npm@9.8.1

# Install dependencies
RUN npm ci

# Copy the rest of the app's source code
COPY . .


# Set directory ownership and permissions
USER root

# Change ownership of the app directory
RUN chown -R node:node /app

# Allow write access to the specific directories
RUN chmod -R 777 /app/public /app/.next

USER node

EXPOSE 3000

# Start the application
CMD [ "npx", "turbo", "serve" ]
-- ------------------------------------------------
```
- stage(6) Edit terraform variable files to pass AWS keys from jenkins global credentials
```diff
        stage('Edit terraform var file') {
            steps {
                dir("./terraform/ECR") {
                    sh """
                      sed -e "s|ACCESS_KEY_TO_REPLACE|${ACCESS_KEY}|g" -e "s|SECRET_KEY_TO_REPLACE|${SECRET_KEY}|g" terraform-template.txt > terraform.tfvars   

                    """
                }

                dir("./terraform/EC2") {
                    sh """
                      sed -e "s|ACCESS_KEY_TO_REPLACE|${ACCESS_KEY}|g" -e "s|SECRET_KEY_TO_REPLACE|${SECRET_KEY}|g" terraform-template.txt > terraform.tfvars   

                    """
                }
            }
        }
```
- stage(7) Create elastic container registry (ECR) to push docker image to
```diff 
        stage('Create ECR'){
            steps {
                dir("./terraform/ECR"){
                    sh 'terraform init'
                    sh "terraform plan"
                    sh 'terraform destroy --auto-approve'
                    sh 'terraform apply --auto-approve'


                    sh """
                        sed -e "s|ACCESS_KEY|${ACCESS_KEY}|g" -e "s|SECRET_KEY|${SECRET_KEY}|g" -e "s|IMG_NAME|${DOCKER_IMAGE}|g" pushToECR-template.sh > pushToECR.sh
                    """

                    sh 'chmod +x pushToECR.sh'
                    sh "./pushToECR.sh"

                }
            }
        }
-- pushToECR.sh --------------------------------------
#! /bin/bash

aws configure set aws_access_key_id ACCESS_KEY

aws configure set aws_secret_access_key SECRET_KEY

ecr_repo=$(terraform output -raw ecr_url)

aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin $ecr_repo

MOD_DOCKER_IMG=$(echo IMG_NAME | sed "s|:|-|g")

docker tag IMG_NAME $ecr_repo:$MOD_DOCKER_IMG

docker push $ecr_repo:$MOD_DOCKER_IMG
-- ---------------------------------------------------
```
- stage(8) Create the EC2 instance to deploy to
```diff
        stage("Create EC2") {
            when {
                branch 'master'
            }
            steps {
                dir("./terraform/EC2") {
                    sh """
                        sed -e "s|ACCESS_KEY|${ACCESS_KEY}|g" -e "s|SECRET_KEY|${SECRET_KEY}|g" -e "s|IMG_NAME|${DOCKER_IMAGE}|g" dockerRun-template.sh > dockerRun.sh
                    """
                    sh 'terraform init'
                    sh "terraform plan"
                    sh 'terraform destroy --auto-approve'
                    sh 'terraform apply --auto-approve'
                }
            }

            post {
                success {
                    echo "Successfully deployed to AWS"
                }

                failure {
                    dir("./terraform/EC2") {
                    sh 'terraform destroy --auto-approve'
                    }
                }
                
            }
        }
-- dockerRun.sh ------------------------------
#! /bin/bash 

sudo apt update -y

sudo apt upgrade -y

sudo apt install docker docker.io -y

sudo apt install awscli -y

aws configure set aws_access_key_id ACCESS_KEY

aws configure set aws_secret_access_key SECRET_KEY

sudo chmod 666 /var/run/docker.sock

aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin ECR_REPO

docker pull ECR_REPO:node-18-alpine
-- -------------------------------------------
```
- stage(9) Test the deployment to check if the image is running
```diff
        stage("Smoke test on deployment") {
            when {
                branch 'master'
            }
            steps {
                dir("./terraform/EC2") {
                    sh 'chmod +x smokeTest.sh'
                    sh "./smokeTest.sh"
                }
            }
            post {
                success {
                    echo "Smoke test successful"
                }
                failure {
                    echo "Public IP not available yet. Please wait and try again later."
                }

            }
        }
```
### EC2 terraform main breakdown

### Provider
- define the cloud provider which provision the desired resources

```diff 
provider "aws" {
    region = "eu-west-3"
    access_key = var.access_key
    secret_key = var.secret_key
}
```

### Variables
```diff 
variable vpc_cider_block {}

variable subnet_cider_block {}

variable avail_zones {}

variable env_prefix {}

variable my_ip {}

variable instance_image {}

variable instance_type {}

variable key_name {}

variable access_key {}

variable secret_key {}

-- terraform.tfvars ------------------------------------
vpc_cider_block = "10.0.0.0/16" # local network between all subnets inside vpc

subnet_cider_block = "10.0.0.0/24" # allow global access

avail_zones = "eu-west-3b" # availibality zones for deployment

env_prefix = ["dev", "prod"] # VPC environments

my_ip = "0.0.0.0/0"

instance_image = "ami-05b5a865c3579bbc4"

instance_type = "t2.micro"

key_name = "connection"

access_key = ""

secret_key = ""
-- ---------------------------------------------------     
```
### Virtual private cloud (VPC)
- An isolated network from other vpcs to ensure security
```diff 
resource "aws_vpc" "myapp-vpc" {
  cidr_block = var.vpc_cider_block
  tags = {
    Name = "${var.env_prefix[0]}-vpc"
  }
}
```
### Internet gateway
- Internet gateways are responsible for exposing the application to the global internet
```diff 
resource "aws_vpc" "myapp-vpc" {
  cidr_block = var.vpc_cider_block
  tags = {
    Name = "${var.env_prefix[0]}-vpc"
  }
}
```
### Route table
- Route tables are responsible for routing requests from the internet gateway to the desired subnet
```diff 
resource "aws_route_table" "private_route_table" {
    vpc_id = aws_vpc.myapp-vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id
    }

    tags = {
        Name: "${var.env_prefix[0]}-rtb"
    }
}
```
### Subnet
- subnets are parts of the vpc with a range of ips and acts as the container for the ec2 instance
```diff 
resource "aws_subnet" "subnet-1" {
  vpc_id            = aws_vpc.myapp-vpc.id
  cidr_block        = var.subnet_cider_block
  availability_zone = var.avail_zones

  tags = {
    Name = "${var.env_prefix[0]}-subnet"
  }
}
```
### Route table association
- define an association between route tables and subnets
```diff 
resource "aws_route_table_association" "rtb-association" {
    subnet_id = aws_subnet.subnet-1.id 
    route_table_id = aws_route_table.private_route_table.id
}
```
### EC2 instance
- EC2 is the virtual machine instance provided by AWS which are used as the servers to host applications
```diff 
resource "aws_instance" "my-app-server" {
    ami               = var.instance_image
    instance_type     = var.instance_type
    
    availability_zone = var.avail_zones
    key_name          = var.key_name
    subnet_id = aws_subnet.subnet-1.id
    vpc_security_group_ids = [ aws_security_group.myapp-sg.id]

    associate_public_ip_address = true
    
    #  bash script for automating deploying process
    user_data =  "${file("dockerRun.sh")}" 


    tags = {
        Name = "${var.env_prefix[0]}-app"
    }
}
```
### Security group
- Security groups can be looked at as a firewall to the ec2 instance as it controls the connections and exposes the ports to be used publicly and blocks all request that are not defined within the group
```diff 
resource "aws_security_group" "myapp-sg" {
    name = "myapp-sg"
    vpc_id = aws_vpc.myapp-vpc.id
    
    # ingress --> inbound filter
    ingress {
        description = "SSH"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = [var.my_ip]
    }

    ingress {
        description = "HTTP"
        from_port   = 8080
        to_port     = 8080
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    # egress --> outbound filter
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
        prefix_list_ids = []
    }

    tags = {
        Name = "${var.env_prefix[0]}-sg"
    }
}
```

### Outputs
```diff 
output "server_ip" {
  value = aws_instance.my-app-server.public_ip
}
```

### Instance profile.tf
- The instance profile gives permission to the EC2 instance to access the ECR repository to pull/push images from/to
```diff
resource "aws_iam_instance_profile" "profile" {
  role = aws_iam_role.role.name
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = aws_iam_role.role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_role" "role" {
  path               = "/"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
}
```

### ECR main.tf breakdown
### Provider
```diff
provider "aws" {
    region = "eu-west-3"
    access_key = var.access_key
    secret_key = var.secret_key
}
```
### Variables
```diff
variable image_tag_mutability {}

variable env_prefix {}

variable access_key {}

variable secret_key {}
-- terraform.tfvars ------------------------------------
image_tag_mutability  = "MUTABLE"

env_prefix = ["dev", "prod"] # VPC environments

access_key = ""

secret_key = ""
-- ---------------------------------------------------     
```

### ECR resource
```diff
# Elastic container registry repository to push my containers to 
# and access the containers from
resource "aws_ecr_repository" "dev_repo" {
  name			= "${var.env_prefix[0]}-repo"
  image_tag_mutability  = var.image_tag_mutability

  tags = {
    Name = "${var.env_prefix[0]}-repo"
  }
}
```
### Output
```diff
output "ecr_url" {
    value = try(aws_ecr_repository.dev_repo.repository_url,"")
}
```