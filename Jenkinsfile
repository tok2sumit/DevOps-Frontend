pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
        GITHUB_CREDENTIALS_ID = 'Frontend-CharityConnect'
        UAT_BRANCH = 'uat'
        PROD_BRANCH = 'PRODUCTION'  // Updated to match your branch name
        BUILD_DIR = 'dist'
    }

    stages {
        stage('Checkout UAT Branch') {
            steps {
                script {
                    git branch: "${UAT_BRANCH}", credentialsId: "${GITHUB_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
                }
            }
        }

        stage('Build') {
            steps {
                sh '''
                npm install
                npm run build
                '''
            }
        }

        stage('Merge UAT into PRODUCTION') {
            steps {
                withCredentials([string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GIT_PASS')]) {
                    sh '''
                    git config --global user.email "tok2sumit@gmail.com"
                    git config --global user.name "Jenkins CI"

                    # Checkout PRODUCTION branch
                    git checkout ${PROD_BRANCH}

                    # Merge UAT changes into PRODUCTION
                    git merge --no-ff ${UAT_BRANCH} -m "🔀 Merging UAT changes into PRODUCTION"

                    # Push changes to PRODUCTION branch
                    git push https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${PROD_BRANCH}
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GIT_PASS')]) {
                    sh '''
                    # Checkout PRODUCTION branch
                    git checkout ${PROD_BRANCH}

                    # Copy built files
                    cp -r ${BUILD_DIR}/* .

                    # Commit and push built files
                    git add .
                    git commit -m "🚀 Deploying latest build to PRODUCTION"
                    git push --force https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${PROD_BRANCH}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ UAT changes successfully merged, built, and deployed to PRODUCTION!"
        }
        failure {
            echo "❌ Deployment failed! Check logs for errors."
        }
    }
}
