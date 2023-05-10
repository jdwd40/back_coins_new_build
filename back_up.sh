#!/bin/bash

while true
do
    rsync -av --delete /home/jd/projects/games/coins/new/back_coins_new_build /home/jd/projects/games/coins/new/bak/back_coins_new_build_bak
    sleep 300
done
