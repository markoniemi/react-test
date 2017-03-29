node {
	def npmHome = tool 'NodeJS'
	sh 'env > env.txt'
	stage ('Checkout') {
		git credentialsId: '73534043-e92f-42d2-b0a3-c954b09ebd49', url: 'https://github.com/markoniemi/react-test.git'
	}
	stage ('Test') {
        sh "${npmHome}/bin/npm set progress=false"
		sh "${npmHome}/bin/npm install"
//		sh "${npmHome}/bin/npm install phantomjs-prebuilt sinon karma-sinon"
	}
	stage ('Test') {
		sh "${npmHome}/bin/npm test"
		step([$class: 'JUnitResultArchiver', testResults: '**/reports/test/TESTS.xml'])
	}
	stage ('Sonar') {
        def sonarqubeScanner = tool name: 'SonarQube Runner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        sh "${sonarqubeScanner}/bin/sonar-scanner -e -Dsonar.host.url=${env.SONAR_URL}"
//		sh "${mvnHome}/bin/mvn -Dmaven.test.failure.ignore sonar:sonar -DskipTests=true -Dsonar.host.url=${env.SONAR_URL}"
	}
}
