PACKAGE_VERSION=$(cat package.json | jq '.version' | sed 's/[", ]//g')

IMAGE_NAME='scottboyle-web'

npm run build

docker build -t monospaced/$IMAGE_NAME:$PACKAGE_VERSION .

docker push monospaced/$IMAGE_NAME:$PACKAGE_VERSION
