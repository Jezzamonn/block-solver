#!/bin/bash
usage="Usage: $(basename "$0") path -- Uploads to the www.jezzamon.com/somepath"

if [ "$#" -ne 1 ]; then
    echo "$usage"
    exit 1
fi

path=$1

gsutil -m rsync -r build gs://www.jezzamon.com/$path/
gsutil -m acl ch -r -u AllUsers:R gs://www.jezzamon.com/$path