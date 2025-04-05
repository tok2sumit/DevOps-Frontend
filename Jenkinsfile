pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
        GITHUB_CREDENTIALS_ID = 'Frontend-CharityConnect'
        BRANCH_NAME = 'UAT'
        BUILD_DIR = 'dist'
    }

    stages {
        stage('Checkout UAT Branch') {
            steps {
                script {
                    git branch: "${BRANCH_NAME}", credentialsId: "${GITHUB_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to UAT Branch') {
            steps {
                echo "diployment started"
                withCredentials([string(credentialsId: 'Frontend-CharityConnect', variable: 'GIT_PASS')]) {
                    sh """
                        git config --global user.email "tok2sumit@gmail.com"
                        git config --global user.name "Jenkins CI"

                        # Add and commit new build
                        git add ${BUILD_DIR}
                        git commit -m "🚀 Deploying updated UAT build via Jenkins" || echo "Nothing to commit"
                        git push https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${BRANCH_NAME}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ UAT deployment successful! Check the branch for updates."
        }
        failure {
            echo "❌ UAT deployment failed. Check logs for errors."
        }
    }
}
