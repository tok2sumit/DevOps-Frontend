pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
        GITHUB_CREDENTIALS_ID = 'Frontend-CharityConnect'  // Set in Jenkins Credentials
        BUILD_DIR = 'dist'  // Change if using another output directory
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git branch: 'master', credentialsId: GITHUB_CREDENTIALS_ID, url: GITHUB_REPO
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

        stage('Deploy to GitHub Pages') {
            steps {
                withCredentials([string(credentialsId: 'Frontend-CharityConnect', variable: 'GIT_PASS')]) {
                    sh '''
                    git config --global user.email "tok2sumit@gmail.com"
                    git config --global user.name "Jenkins CI"

                    # Fetch latest branches
                    git fetch origin

                    # Check if gh-pages branch exists remotely
                    if git ls-remote --exit-code --heads origin gh-pages; then
                        git reset --hard  
                        git clean -fd  
                        git checkout gh-pages
                        git pull origin gh-pages
                    else
                        git checkout --orphan gh-pages
                    fi

                    # Remove all except .git
                    find . -mindepth 1 ! -regex '^./.git(/.*)?' -delete

                    # Copy new build files
                    cp -r ${BUILD_DIR}/* .

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
