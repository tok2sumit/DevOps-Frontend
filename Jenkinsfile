pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
        GITHUB_TOKEN = credentials('GITHUB_TOKEN')  // Fetch from Jenkins credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', credentialsId: 'GITHUB_TOKEN', url: "${GITHUB_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Change if using another package manager
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'  // Adjust if using a different build command
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'  // Run tests, modify if needed
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                sh '''
                git config --global user.email "tok2sumit@gamil.com"
                git config --global user.name "Jenkins CI"
                git checkout --orphan gh-pages
                git rm -rf .
                cp -r dist/* .  # Adjust 'dist' based on your build output folder
                git add .
                git commit -m "Deploy from Jenkins"
                git push --force origin gh-pages
                '''
            }
        }
    }
}
