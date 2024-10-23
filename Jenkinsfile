pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials' // ID الخاص بـ Docker Hub Credentials
        DOCKER_IMAGE = 'bedomm180/ci-app' // اسم الصورة على Docker Hub
        GITHUB_CREDENTIALS = 'github-credentials2' // ID الخاص بـ GitHub Credentials
        GITHUB_REPO = 'https://github.com/abdelrahmanonline4/nodejs.org' // رابط الـ GitHub Repo
    }

    stages {
        stage('Checkout or Fetch Code') {
            steps {
                // جلب الكود من GitHub باستخدام الـ credentials
                git credentialsId: "${GITHUB_CREDENTIALS}", url: "${GITHUB_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // تثبيت التبعيات باستخدام npm
                    sh 'npm install'
                }
            }
        }

        stage('Run Unit Testing') {
            steps {
                script {
                    // تشغيل اختبارات الوحدة
                    sh 'npm test'
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    // بناء الصورة باستخدام Dockerfile الموجود في المستودع
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // استخدام الـ credentials لدفع الصورة إلى Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE}").push('latest')
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build, test, and push completed successfully!'
        }
        failure {
            echo 'Build, test, or push failed!'
        }
    }
}
