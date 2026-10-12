#!/bin/sh

# コンテナーの初期設定
# postCreateCommand としてコンテナー内で実行

set -e

# root 所有で作成されるため dcuser 所有に変更
sudo chown -R dcuser:dcuser /home/dcuser/.claude

curl -fsSL https://claude.ai/install.sh | bash
