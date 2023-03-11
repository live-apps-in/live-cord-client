pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ui-live-cord .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm ui-live-cord --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 3006:3000 -d --name ui-live-cord ui-live-cord'
            }
        }
    }
}