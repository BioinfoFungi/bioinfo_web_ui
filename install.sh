#!/bin/bash

npm run build

if [ ! -d "$HOME/.bioinfo/admin" ];then
    mkdir ~/.bioinfo/admin
fi

rm -rf ~/.bioinfo/admin/*
ls ~/.bioinfo/admin/

cp -r  dist/* ~/.bioinfo/admin/

ls ~/.bioinfo/admin/