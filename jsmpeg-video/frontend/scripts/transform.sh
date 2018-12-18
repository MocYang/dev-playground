#!/bin/bash
rm ../src/assets/media/main.mpg

ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg


