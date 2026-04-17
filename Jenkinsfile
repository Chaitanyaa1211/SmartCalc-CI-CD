pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "chaitanyaaaa/smartcalc"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t $DOCKER_IMAGE:$TAG .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerHub-Creds',
                usernameVariable: 'USER', passwordVariable: 'PASS')]) {

                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $DOCKER_IMAGE:$TAG'
                }
            }
        }

        stage('Update Deployment') {
            steps {
                sh "sed -i 's|image: .*|image: $DOCKER_IMAGE:$TAG|' k8s/deployment.yaml"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }
}
