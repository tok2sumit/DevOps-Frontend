pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
        GITHUB_CREDENTIALS_ID = 'Frontend-CharityConnect'  // Set in Jenkins Credentials
        BRANCH_NAME = 'UAT'  // This pipeline triggers only on UAT changes
        BUILD_DIR = 'dist'  // Change if using another output directory
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
                withCredentials([string(credentialsId: 'Frontend-CharityConnect', variable: 'GIT_PASS')]) {
                    sh '''
                    git config --global user.email "tok2sumit@gmail.com"
                    git config --global user.name "Jenkins CI"

                    # Ensure we are on the correct branch
                    git checkout ${BRANCH_NAME}
                    git pull origin ${BRANCH_NAME}

                    # Remove old build files
                    git rm -r --ignore-unmatch ${BUILD_DIR}
                    mkdir -p ${BUILD_DIR}

                    # Copy new build files
                    cp -r ${BUILD_DIR}/* .

                    # Add and commit changes
                    git add .
                    git commit -m "🚀 Deploying updated UAT build via Jenkins"
                    git push https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${BRANCH_NAME}
                    '''
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
