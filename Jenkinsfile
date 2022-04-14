pipeline {
    agent any //{
        //label 'Salesforce'
    //}
    triggers { 
        pollSCM('H/5 * * * *') 
    }
    
    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'        
        HEROKU_CREDENTIALS = credentials('heroku-salesforce')
        BRANCH_NAME_SHORT = "${GIT_BRANCH.replaceFirst(/^.*\//, '')}"
        REPO_NAME = "${env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1')}"
    }

    parameters {
        string(
            name: 'FRUSQ',
            defaultValue: params.FRUSQ ?: '',
            description: ''
        )

        string(
            name: 'REDIS_URL',
            defaultValue: params.REDIS_URL ?: '',
            description: ''
        )

        string(
            name: 'CLIENT_SECRET',
            defaultValue: params.CLIENT_SECRET ?: '',
            description: ''
        )

        string(
            name: 'REDIRECT_URI',
            defaultValue: params.REDIRECT_URI ?: '',
            description: ''
        )

        string(
            name: 'NODE_ENV',
            defaultValue: params.NODE_ENV ?: '',
            description: ''
        )

        string(
            name: 'TFE_CREDENTIALS',
            defaultValue: params.TFE_CREDENTIALS ?: '',
            description: ''
        )

        string(
            name: 'TFE_ORG_NAME',
            defaultValue: params.TFE_ORG_NAME ?: '',
            description: 'Deve ser criada antes'
        )

        string(
            name: 'TFE_WS_NAME',
            defaultValue: params.TFE_WS_NAME ?: '',
            description: 'Deve ser criada antes, e ajustar Execution=Local'
        )

        string(
            name: 'TF_VERSION',
            defaultValue: params.TF_VERSION ?: '',
            description: 'Versao do terraform formato a.b.c'
        )        

        string(
            name: 'HEROKU_APP_NAME',
            defaultValue: params.HEROKU_APP_NAME ?: '',
            description: 'Limite de 30 caracteres'
        )

        string(
            name: 'HEROKU_ORG_NAME',
            defaultValue: params.HEROKU_ORG_NAME ?: '',
            description: 'Team no Heroku Team (antigamente Organization)'
        )

        string(
            name: 'HEROKU_STACK',
            defaultValue: params.HEROKU_STACK ?: '',
            description: 'Stack do Heroku'
        )

        string(
            name: 'HEROKU_REGION',
            defaultValue: params.HEROKU_REGION ?: '',
            description: ''
        )

        string(
            name: 'HEROKU_FORMATION_TYPE',
            defaultValue: params.HEROKU_FORMATION_TYPE ?: '',
            description: ''
        )
        string(
            name: 'HEROKU_FORMATION_QTY',
            defaultValue: params.HEROKU_FORMATION_QTY ?: '',
            description: ''
        )

        string(
            name: 'HEROKU_FORMATION_SIZE',
            defaultValue: params.HEROKU_FORMATION_SIZE ?: '',
            description: 'private-s, private-m ou private-l'
        )
        string(
            name: 'DEBUG',
            defaultValue: params.DEBUG ?: '',
            description: ''
        )

        string(
            name: 'MAIL_TO',
            defaultValue: params.MAIL_TO ?: '',
            description: ''
        )

        string(
            name: 'SOURCE_PATH',
            defaultValue: params.SOURCE_PATH ?: '',
            description: ''
        )

        string(
            name: 'RUN_DESTROY',
            defaultValue: params.RUN_DESTROY ?: 'no',
            description: 'Para tf destroy deve ter Yes, run destroy.'
        )        
    }

    stages {
        stage("Setup") { 
            steps {
                sh("""
                    curl --silent --disable --location --output ./tf/terraform.zip https://releases.hashicorp.com/terraform/${params.TF_VERSION}/terraform_${params.TF_VERSION}_linux_amd64.zip
                    unzip -o ./tf/terraform.zip -d ./tf 
                    rm -f ./tf/terraform.zip
                    chmod +x ./tf/*.sh ./tf/terraform  
                    ./tf/mk-tf-remote-state.sh
                """)
            }
        }

        stage('terraform init') {
            steps {
                echo 'Rodando terraform init...'
                sh("""
                    ./tf/tf-init.sh
                """)
            }
        }

        stage('terraform plan') {
            steps {
                echo 'Rodando terraform plan...'
                sh("""
                    ./tf/tf-pa.sh plan
                """)
            }
        }

        // TF Apply using SOURCE_URL
        stage('terraform apply') {
            steps {
                echo 'Rodando terraform apply...' 
                sh("""
                    ./tf/tf-pa.sh apply -auto-approve
                """)
            }
        }

        stage('ESLint') {
            steps {
                echo 'Rodando ESLint...' 
                script {
                    withEnv(["NODE_ENV=eslint"]) {
                        sh("""
                            yarn install
                            ./tf/eslint.sh junit || true
                            ./tf/eslint.sh codeframe || true
                        """)
                    }
                }

                archiveArtifacts artifacts: 'eslint-output.codeframe', allowEmptyArchive: true

                junit(
                    allowEmptyResults: true,
                    healthScaleFactor: 1.0,
                    testResults: 'eslint-output.junit'
                )
            }
        }

        stage('terraform destroy') {
            when {   
                beforeInput true             
                environment name: 'RUN_DESTROY', value: 'Yes, run destroy.' 
            }
            input {
                message "Executar terraform destory?"
                ok "Sim"
            }            
            steps {
                echo 'Rodando terraform destroy...' 
                sh("""
                ./tf/tf-pa.sh destroy -auto-approve
                """)
            }
        }        
    }

    post {
        always {
            emailext(
                mimeType: 'text/html',
                body: '''${SCRIPT, template="groovy-html.template"}''',
                from: 'Jenkins', 
                replyTo: '', 
                subject: "[${HEROKU_APP_NAME}] Deploy ${currentBuild.currentResult} de ${REPO_NAME}/${BRANCH_NAME_SHORT}",                 
                recipientProviders: [developers(), culprits(), requestor(), upstreamDevelopers()],
                to: "${MAIL_TO}"
            )

            script {
                if (DEBUG == '1') {
                    sh("""
                        echo "DEBUG Output ls -la"
                        ls -la || true
                        echo "DEBUG ls -la .terraform"
                        ls -la .terraform || true
                        echo "DEBUG Output cat ./Procfile"
                        cat ./Procfile || true
                        echo "DEBUG Output cat ./tf/remote-state.tf"
                        cat ./tf/remote-state.tf || true
                        echo "DEBUG Output terraform -version"
                        ./tf/terraform -version || true
                        echo "DEBUG Output env"
                        env
                    """)   
                }
            }
            echo "Limpando workspace..."
            cleanWs()
        }
    }    
}