pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
        GITHUB_CREDENTIALS_ID = 'GITHUB_TOKEN'  // Set in Jenkins Credentials
        BUILD_DIR = 'dist'  // Change if using another output directory
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git branch: 'master', credentialsId: "${GITHUB_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Install project dependencies
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'  // Adjust if your build command differs
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GIT_PASS')]) {
                    sh '''
                    git config --global user.email "tok2sumit@gmail.com"
                    git config --global user.name "Jenkins CI"

                    # Check if gh-pages branch exists
                    if git ls-remote --exit-code --heads origin gh-pages; then
                        git checkout gh-pages
                    else
                        git checkout --orphan gh-pages
                    fi

                    git rm -rf .  # Clean old files
                    cp -r ${BUILD_DIR}/* .  # Copy new build files

                    git add .
                    git commit -m "🚀 Deploying updated site via Jenkins"
                    git push --force https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git gh-pages
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Site should be live."
        }
        failure {
            echo "❌ Deployment failed. Check logs for errors."
        }
    }
}
