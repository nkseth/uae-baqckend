websiteName="simpleaccounts"
websiteTld="io"
nameserver="$websiteName-$websiteTld-strapi-website"
maindomain="$websiteName.$websiteTld"
subdomain="strapi-api-test"
helmDir="simpleaccounts-io-strapi-backend"
SVrelease="$(Release.Artifacts._simpleaccounts-io-strapi-backend.BuildNumber)"

websiteName="simpleaccounts"
websiteTld="io"
nameserver="$websiteName-$websiteTld-strapi-website"
maindomain="$websiteName.$websiteTld"
subdomain="strapi-api"
helmDir="simpleaccounts-io-strapi-backend"
SVrelease="$(Release.Artifacts._simpleaccounts-io-strapi-backend.BuildNumber)"


#Prod Deployment

echo "Releaseing New Version $SVrelease"

echo "Deployment Dry Run"

helm upgrade --install $subdomain-backend strapi-websites/$helmDir --values strapi-websites/$helmDir/values.yaml \
--set simpleAccountsBackendRelease=$SVrelease \
--set image.repository.backend.tag=$SVrelease \
--set fullnameOverride=$subdomain-backend \
--set ingress.hosts[0].host=$subdomain.$maindomain \
--set ingress.hosts[0].paths[0]="/*" \
--set ingress.tls[0].hosts[0]=$subdomain.$maindomain \
--set ingress.tls[0].secretName=simpleaccounts-io-strapi-backend-tls \
--set data.databaseName=c2Etc3RyYXBpLXdlYnNpdGUtZGI= \
--set data.databaseUsername=c2Etc3RyYXBpLXdlYnNpdGUtZGItdXNlcg== \
--set data.databasePassword=OG5CcjQ3MXBXTXVUaGk0MA== \
-n $nameserver \
--dry-run --debug --wait

echo "Deploying the application"

helm upgrade --install $subdomain-backend strapi-websites/$helmDir --values strapi-websites/$helmDir/values.yaml \
--set simpleAccountsBackendRelease=$SVrelease \
--set image.repository.backend.tag=$SVrelease \
--set fullnameOverride=$subdomain-backend \
--set ingress.hosts[0].host=$subdomain.$maindomain \
--set ingress.hosts[0].paths[0]="/*" \
--set ingress.tls[0].hosts[0]=$subdomain.$maindomain \
--set ingress.tls[0].secretName=simpleaccounts-io-strapi-backend-tls \
--set data.databaseName=c2Etc3RyYXBpLXdlYnNpdGUtZGI= \
--set data.databaseUsername=c2Etc3RyYXBpLXdlYnNpdGUtZGItdXNlcg== \
--set data.databasePassword=OG5CcjQ3MXBXTXVUaGk0MA== \
-n $nameserver \
--wait

echo "Deployment done successfully"


#Test Deployment
websiteName="simpleaccounts"
websiteTld="io"
nameserver="$websiteName-$websiteTld-strapi-website"
maindomain="$websiteName.$websiteTld"
subdomain="strapi-api-test"
helmDir="simpleaccounts-io-strapi-backend"
SVrelease="$(Release.Artifacts._simpleaccounts-io-strapi-backend.BuildNumber)"

echo "Releaseing New Version $SVrelease"

echo "Deployment Dry Run"

helm upgrade --install $subdomain-backend strapi-websites/$helmDir --values strapi-websites/$helmDir/values.yaml \
--set simpleAccountsBackendRelease=$SVrelease \
--set image.repository.backend.tag=$SVrelease \
--set fullnameOverride=$subdomain-backend \
--set ingress.hosts[0].host=$subdomain.$maindomain \
--set ingress.hosts[0].paths[0]="/*" \
--set ingress.tls[0].hosts[0]=$subdomain.$maindomain \
--set ingress.tls[0].secretName=simpleaccounts-io-strapi-backend-test-tls \
--set data.databaseName=c2Etc3RyYXBpLXRlc3Qtd2Vic2l0ZS1kYg== \
--set data.databaseUsername=c2Etc3RyYXBpLXRlc3Qtd2Vic2l0ZS1kYi11c2Vy \
--set data.databasePassword=OWFYanpjeHpWUWlkQWVwbXByLWcydjc0 \
-n $nameserver \
--dry-run --debug --wait

echo "Deploying the application"

helm upgrade --install $subdomain-backend strapi-websites/$helmDir --values strapi-websites/$helmDir/values.yaml \
--set simpleAccountsBackendRelease=$SVrelease \
--set image.repository.backend.tag=$SVrelease \
--set fullnameOverride=$subdomain-backend \
--set ingress.hosts[0].host=$subdomain.$maindomain \
--set ingress.hosts[0].paths[0]="/*" \
--set ingress.tls[0].hosts[0]=$subdomain.$maindomain \
--set ingress.tls[0].secretName=simpleaccounts-io-strapi-backend-test-tls \
--set data.databaseName=c2Etc3RyYXBpLXdlYnNpdGUtZGI= \
--set data.databaseUsername=c2Etc3RyYXBpLXdlYnNpdGUtZGItdXNlcg== \
--set data.databasePassword=OG5CcjQ3MXBXTXVUaGk0MA== \
-n $nameserver \
--wait

echo "Deployment done successfully."

