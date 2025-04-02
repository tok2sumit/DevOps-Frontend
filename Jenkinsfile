pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/tok2sumit/DevOps-Frontend.git'
<<<<<<< HEAD
        GITHUB_CREDENTIALS_ID = 'Frontend-CharityConnect'  // Set in Jenkins Credentials
        BRANCH_NAME = 'UAT'  // This pipeline triggers only on UAT changes
        BUILD_DIR = 'dist'  // Change if using another output directory
=======
        GITHUB_CREDENTIALS_ID = 'Frontend-CharityConnect'
        UAT_BRANCH = 'uat'
        PROD_BRANCH = 'PRODUCTION'  // Updated to match your branch name
        BUILD_DIR = 'dist'
>>>>>>> 121b37de9952ae91045a139e2d01f9791387e1b1
    }

    stages {
        stage('Checkout UAT Branch') {
            steps {
                script {
<<<<<<< HEAD
                    git branch: "${BRANCH_NAME}", credentialsId: "${GITHUB_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
=======
                    git branch: "${UAT_BRANCH}", credentialsId: "${GITHUB_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
>>>>>>> 121b37de9952ae91045a139e2d01f9791387e1b1
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

<<<<<<< HEAD
        stage('Deploy to UAT Branch') {
=======
        stage('Merge UAT into PRODUCTION') {
>>>>>>> 121b37de9952ae91045a139e2d01f9791387e1b1
            steps {
                withCredentials([string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GIT_PASS')]) {
                    sh '''
                    git config --global user.email "tok2sumit@gmail.com"
                    git config --global user.name "Jenkins CI"

<<<<<<< HEAD
                    # Ensure we are on the correct branch
                    git checkout ${BRANCH_NAME}
                    git pull origin ${BRANCH_NAME}

                    # Remove old build files
                    git rm -r --ignore-unmatch ${BUILD_DIR}
                    mkdir -p ${BUILD_DIR}
=======
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
>>>>>>> 121b37de9952ae91045a139e2d01f9791387e1b1

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GIT_PASS')]) {
                    sh '''
                    # Checkout PRODUCTION branch
                    git checkout ${PROD_BRANCH}

                    # Copy built files
                    cp -r ${BUILD_DIR}/* .

<<<<<<< HEAD
                    # Add and commit changes
                    git add .
                    git commit -m "🚀 Deploying updated UAT build via Jenkins"
                    git push https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${BRANCH_NAME}
=======
                    # Commit and push built files
                    git add .
                    git commit -m "🚀 Deploying latest build to PRODUCTION"
                    git push --force https://$GIT_PASS@github.com/tok2sumit/DevOps-Frontend.git ${PROD_BRANCH}
>>>>>>> 121b37de9952ae91045a139e2d01f9791387e1b1
                    '''
                }
            }
        }
    }

    post {
        success {
<<<<<<< HEAD
            echo "✅ UAT deployment successful! Check the branch for updates."
        }
        failure {
            echo "❌ UAT deployment failed. Check logs for errors."
=======
            echo "✅ UAT changes successfully merged, built, and deployed to PRODUCTION!"
        }
        failure {
            echo "❌ Deployment failed! Check logs for errors."
>>>>>>> 121b37de9952ae91045a139e2d01f9791387e1b1
        }
    }
}
