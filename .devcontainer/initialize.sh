#!/bin/sh

# プロジェクトの前処理
# initializeCommand としてホストで実行

set -e

cd "$(dirname "$0")/.."

if [ ! -d .git ]; then
  git init -b main
fi

git config --local core.autocrlf false
git config --local core.eol lf
git config --local core.hooksPath .githooks
git config --local core.ignorecase false
git config --local core.quotepath false
git config --local fetch.prune true
git config --local merge.ff false
git config --local pull.ff only

if [ ! -d .githooks ]; then
  mkdir .githooks
fi

# .env が存在することを前提としているため、存在しない場合は作成
if [ ! -f .env ]; then
  touch .env
fi
