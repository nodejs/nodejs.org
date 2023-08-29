pipeline {
    agent any

    environment {
        USER_CREDENTIALS = credentials('docker_account')
        DOCKER_IMAGE = "node-docker:v-40"
        // DOCKER_IMAGE = "node-docker:v-${BUILD_ID}"
        DOCKER_USERNAME = "${USER_CREDENTIALS_USR}"
        DOCKER_PASSWORD = "${USER_CREDENTIALS_PSW}"

        AWS_CREDENTIALS = credentials('aws_credentials')
        ACCESS_KEY = "${AWS_CREDENTIALS_USR}"
        SECRET_KEY = "${AWS_CREDENTIALS_PSW}"

    }

    stages {
        // stage("install dependencies") {

        //     steps {
        //         sh 'npm ci'
        //     }
        //     post {
        //         success {
        //             echo "Dependencies installed successfully"
        //         }
        //         failure {
        //             echo "Something went wrong please try again later"
        //         }

        //     }

        // }

        // stage("Test&Build"){
        //     parallel {
        //         stage("Test") {

        //             steps {
        //                 sh 'npm run test:unit'
        //             }

        //         }
        //         stage("Build") {

        //             steps {
        //                 sh 'npm run build'
        //             }

        //         }
        //     }
        // }

        // stage('Sonarqube scan') {
        //     steps {
        //         script{
        //             def sonarScannerHome = tool name: 'sq1', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        //             withSonarQubeEnv(installationName: "sq1") {
        //                 sh """
        //                     ${sonarScannerHome}/bin/sonar-scanner \
        //                     -Dsonar.projectKey=nodejs \
        //                     -Dsonar.sources=. \
        //                     -Dsonar.host.url=${env.SONAR_HOST_URL} \
        //                     -Dsonar.login=${env.SONAR_AUTH_TOKEN} \
        //                     -Dsonar.projectName=nodejs \
        //                 """
        //             }
        //         }
        //    }
        // }

        // stage("Sonarqube quality gate check") {
        //     steps {
        //         timeout(time: 2, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

        // stage('Docker Build') {

        //     steps {
        //         sh "docker build -t ${DOCKER_IMAGE} ."
        //     }
        // }

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

        // stage('Create ECR'){
        //     steps {
        //         dir("./terraform/ECR"){
        //             sh 'terraform init'
        //             sh "terraform plan"
        //             sh 'terraform destroy --auto-approve'
        //             sh 'terraform apply --auto-approve'


        //             sh """
        //                 sed -e "s|ACCESS_KEY|${ACCESS_KEY}|g" -e "s|SECRET_KEY|${SECRET_KEY}|g" -e "s|IMG_NAME|${DOCKER_IMAGE}|g" pushToECR-template.sh > pushToECR.sh
        //             """

        //             sh 'chmod +x pushToECR.sh'
        //             sh "./pushToECR.sh"

        //         }
        //     }
        // }

        stage("Create EC2") {
            // when {
            //     branch 'dev'
            // }

            steps {
                dir("./terraform/EC2") {
                    sh """
                        sed -e "s|ACCESS_KEY|${ACCESS_KEY}|g" -e "s|SECRET_KEY|${SECRET_KEY}|g" -e "s|IMG_NAME|${DOCKER_IMAGE}|g" dockerRun-template.sh > dockerRun.sh
                    """

                    sh 'terraform init'
                    sh "terraform plan"
                    // sh 'terraform destroy --auto-approve'
                    sh 'terraform apply --auto-approve'
                }
            }

            post {
                success {
                    echo "Successfully deployed to AWS"
                }

                failure {
                    dir("./terraform") {
                    sh 'terraform destroy --auto-approve'
                    }
                }

            }
        }

        stage("Smoke test on deployment") {
            // when {
            //     branch 'master'
            // }

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


    }
}
