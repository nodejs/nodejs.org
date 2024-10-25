pipeline {
    agent any

    stages {
        stage("Setup NodeJS") {
            steps {
                script {
                    // Use the NodeJS plugin to set up the correct Node.js version
                    nodejs(nodeJSInstallationName: 'NodeJS 18') {
                        echo 'Node.js is set up'
                    }
                }
            }
        }

        stage("Checkout code") {
            steps {
                script {
                    def repoUrl = 'https://github.com/Nourhan433/Devops-nodejs.org.git'
                    def localDir = 'Devops-nodejs.org'
                    
                    if (!fileExists(localDir)) {
                        sh "git clone ${repoUrl} ${localDir}"
                    }
                    
                    dir(localDir) {
                        sh 'git fetch --all'
                        def branch = 'main'
                        sh "git checkout ${branch} || git checkout -b ${branch} origin/${branch}"
                    }
                }
            }
        }
        
        stage("Install dependencies") {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 18') {
                    dir('Devops-nodejs.org') {
                        sh 'npm ci'  // This will now have access to the Node.js executable
                    }
                }
            }
        }

        stage("Run unit testing") {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 18') {
                    dir('Devops-nodejs.org') {
                        sh 'npm run test'  // This will now have access to the Node.js executable
                    }
                }
            }
        }

        stage("Dockerize") {
            steps {
                dir('Devops-nodejs.org') {
                    sh 'docker build -t nourhanmohsen/nodejs.org .'  // Ensure Dockerfile is present
                }
            }
        }

        stage("Push Docker image") {
            steps {
                dir('Devops-nodejs.org') {
                    withCredentials([usernamePassword(credentialsId: 'Dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                        sh 'docker push nourhanmohsen/nodejs.org'
                    }
                }
            }
        }
    }
}
