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
        stage('Checkout UAT') {
            steps {
                git branch: "${BRANCH_NAME}", credentialsId: "${GITHUB_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to UAT Branch') {
            steps {
                withCredentials([string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GIT_PASS')]) {
                    sh '''
                    git config user.email "tok2sumit@gmail.com"
                    git config user.name "Jenkins CI"

                    # Ensure on correct branch
                    git checkout ${BRANCH_NAME}
                    git pull origin ${BRANCH_NAME}

                    # Remove old build and copy new build
                    git rm -r --ignore-unmatch ${BUILD_DIR}
                    cp -r ${BUILD_DIR}/* .

                    # Commit and push
                    git add .
                    git commit -m "🚀 Auto-deploy UAT build via Jenkins"
                    git push https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${BRANCH_NAME}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ UAT deployment successful!"
        }
        failure {
            echo "❌ Build failed. Check logs."
        }
    }
}
