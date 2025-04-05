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
                        git config --global user.email "tok2sumit@gmail.com"
                        git config --global user.name "Jenkins CI"

                        git checkout ${BRANCH_NAME}
                        git pull origin ${BRANCH_NAME}

                        # Clean up previous build files in dist
                        rm -rf dist/*

                        # Run build
                        npm run build

                        # Copy new build files to dist/
                        cp -r dist/* dist/

                        # Commit and push changes from dist only
                        git add dist/*
                        git commit -m "🚀 Auto-deploy UAT build via Jenkins" || echo "No changes to commit"
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
