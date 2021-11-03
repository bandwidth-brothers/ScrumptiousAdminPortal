pipeline{
	agent any
	environment{
		scannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
		CI=false
	}
	stages{
		stage('checkout'){
			steps{
				checkout scm
			}
		}
		stage('analysis'){
			steps{
				nodejs(nodeJSInstallationName: 'node'){
					sh 'npm install'
					sh 'npm run build'
					sh 'npm run test'
					withSonarQubeEnv(installationName:'Sonar Home'){
						sh "${scannerHome}/bin/sonar-scanner"
					}
				}
			}
		}
	  	stage('deploy'){
			steps{
				withAWS(region: 'us-east-2', credentials: 'aws-creds'){
					s3Upload(bucket: 'ss-scrumptious-artifacts', file: 'build', path: 'admin-portal/')
				}
			}
		}
	}
}
