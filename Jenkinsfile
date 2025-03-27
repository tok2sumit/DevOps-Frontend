pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/tok2sumit/DevOps-Frontend.git'
            }
        }

        stage('Build with Maven') {
            steps {
                sh 'mvn clean package'  // Builds the project
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'  // Runs tests
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                sh '''
                git config --global user.email "tok2sumit@gamil.com"
                git config --global user.name "Jenkins CI"
                git checkout --orphan gh-pages
                git rm -rf .
                cp -r target/* .  # Adjust based on build output
                git add .
                git commit -m "Deploy from Jenkins"
                git push --force origin gh-pages
                '''
            }
        }
    }
}
