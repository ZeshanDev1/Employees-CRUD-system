pipeline {
    agent any

    environment {
        // Your GitHub repo URL
        REPO_URL = 'https://github.com/ZeshanDev1/Employees-CRUD-system.git'
        BRANCH = 'main'
        COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_NAME = 'employee-app-jenkins'  // unique project name for docker-compose
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Pull latest code and build containers
                    sh """
                        docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} down
                        docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} up -d --build
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
