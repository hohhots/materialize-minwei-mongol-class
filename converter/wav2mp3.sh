#!/bin/bash

for i in *.wav ; do
    ffmpeg -i "$i" -codec:a libmp3lame -qscale:a 2 "${i/.wav}".mp3
done