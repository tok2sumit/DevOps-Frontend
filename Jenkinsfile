pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
    }

    stages {
        stage('Checkout Code') {
            steps {
                withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GIT_PASS')]) {
                    git branch: 'master', url: "https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git"
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
                withCredentials([string(credentialsId: 'GITHUB_TOKEN', variable: 'GIT_PASS')]) {
                    sh '''
                    git config --global user.email "tok2sumit@gmail.com"
                    git config --global user.name "Jenkins CI"

                    # Fetch all branches and switch to gh-pages safely
                    git fetch origin gh-pages
                    git checkout gh-pages || git checkout -b gh-pages origin/gh-pages

                    # Remove old files and copy new build
                    git rm -rf .
                    cp -r dist/* .
                    git add .
                    git commit -m "Deploy from Jenkins"

                    # Push to GitHub Pages branch with authentication
                    git push --force https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git gh-pages
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed. Check logs for errors.'
        }
    }
}
