#!/usr/bin/env bash
set -e
echo "Building the project..."
SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
pushd "$SCRIPT_DIR" >/dev/null

if ! command -v node >/dev/null; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  . "$NVM_DIR/nvm.sh"
  nvm install 22
fi

npm ci
npm run build
npm run export
mv out/model_viewer/habitat_suitability/embed.html out/index.html
mv out/model_viewer/habitat_suitability.html out/
rm -rf out/model_viewer

echo "Build completed successfully."
popd >/dev/null
