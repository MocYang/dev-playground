#!/bin/bash
rm ../src/assets/media/main.mpg
rm ../src/assets/media/xiangfei.mpg
rm ../src/assets/media/main.mpg
rm ../src/assets/media/main.mpg
rm ../src/assets/media/main.mpg
rm ../src/assets/media/main.mpg

ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg
ffmpeg -i ../src/assets/media/xiangfei.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg
ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg
ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg
ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg
ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 ../src/assets/media/main.mpg
#ffmpeg -i ../src/assets/media/main.mp4 -f mpegts -codec:v mpeg1video -s 960x540 -b:v 1024k -r 30 -bf 0 -codec:a mp2 -ar 44100 -ac 1 -b:a 512k ../src/assets/media/main.mpg

