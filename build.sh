#!/bin/bash
# Install shell for this project
# Copyright Huawei Technologies Co., Ltd. 2021-2021. All rights reserved.
set -ex
# shellcheck disable=SC2154
if [ "${isRelease}" = "false" ]
then
	releaseVersion=$(node -p "require('./package.json').version").$(date +%Y%m%d%H%M%S)
fi
echo "buildVersion=${releaseVersion}">$WORKSPACE/buildInfo.properties
# npm config
export PATH=/home/shennong/node-v10.8.0-linux-x64/bin:$PATH
rm -f ~/.npmrc
npm config set registry http://cmc.centralrepo.rnd.huawei.com/npm/
npm config set sass_binary_site http://mirrors.tools.huawei.com/node-sass/
# build and package
npm install
npm run build
tar -zcvf dist.tar.gz dist