docker build . -t asia-south1-docker.pkg.dev/serverless-web-apis-test/vertex-repo/file-fgcloud run deploy file-flow --allow-unauthenticated --platform=managed --region=asia-east1 --source=. --service-account=share-safe-service-account-2@serverless-web-apis-test.iam.gserviceaccount.com --port=3000low-image
docker push asia-south1-docker.pkg.dev/serverless-web-apis-test/vertex-repo/file-flow-image
