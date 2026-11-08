#!/bin/sh

set -e

for user in $(awk -F: '$3 >= 1000 && $3 <= 60000 { print $1 }' /etc/passwd); do
  userdel --remove "$user"
done

# userdel で削除されなかったグループを削除
for group in $(awk -F: '$3 >= 1000 && $3 <= 60000 { print $1 }' /etc/group); do
  groupdel "$group"
done
