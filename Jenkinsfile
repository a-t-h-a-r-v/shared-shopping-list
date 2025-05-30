// Jenkinsfile

pipeline {
    agent any

    environment {
        ANSIBLE_INVENTORY_VM_IP = '192.168.29.41'
        ANSIBLE_VM_SSH_USER = 'atharv'
        # Note: frontend_app_port, backend_api_port, deploy_dir, repo_url are handled by Ansible group_vars
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out code..."
                git credentialsId: 'your-git-credential-id', url: 'https://github.com/your-username/shared-shopping-list.git'
            }
        }

        stage('Install Ansible Dependencies on Agent') {
            steps {
                echo "Installing Ansible and community.docker collection on agent..."
                sh 'pip install --user ansible'
                sh 'ansible-galaxy collection install community.docker'
            }
        }

        stage('Run Ansible Deployment') {
            echo "Starting Ansible deployment playbook..."
            withCredentials([
                sshUserPrivateKey(credentialsId: 'your-ssh-key-id', keyFileVariable: 'ANSIBLE_SSH_KEY_FILE'),
                string(credentialsId: 'ansible-vault-password', variable: 'ANSIBLE_VAULT_PASS')
            ]) {
                sshagent(credentials: ['your-ssh-key-id']) {
                    sh """
                        echo "[webservers]" > ansible/jenkins_inventory.ini
                        echo "${ANSIBLE_INVENTORY_VM_IP} ansible_user=${ANSIBLE_VM_SSH_USER} ansible_ssh_private_key_file=${ANSIBLE_SSH_KEY_FILE}" >> ansible/jenkins_inventory.ini
                        chmod 600 ansible/jenkins_inventory.ini # Secure permissions for the inventory file
                    """
                    echo "Executing ansible-playbook deploy.yml..."
                    sh "ansible-playbook ansible/deploy.yml -i ansible/jenkins_inventory.ini --vault-password-file <(echo ${ANSIBLE_VAULT_PASS})"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up Jenkins workspace."
            cleanWs()
        }
        success {
            echo "Pipeline finished successfully! Application deployed via Ansible."
        }
        failure {
            echo "Pipeline failed! Check Jenkins build logs for errors."
        }
    }
}
