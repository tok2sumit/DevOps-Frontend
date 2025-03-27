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

                    # Fetch latest branches
                    git fetch origin

                    # Check if gh-pages branch exists
                    if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
                        git checkout gh-pages
                        git pull origin gh-pages
                    else
                        git checkout -b gh-pages
                    fi

                    # Remove old files except .git
                    git rm -rf . 2>/dev/null || true

                    # Copy new build files
                    cp -r dist/* .  # Adjust 'dist' if your output directory is different

                    # Add and push changes
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
