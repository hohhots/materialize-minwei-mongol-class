#!/bin/bash

max=111
for i in `seq 2 $max`
do
    ffmpeg -i $i.wav -acodec libmp3lame $i.mp3
done