#!/bin/bash

#
# video conversion script for publishing as HTML 5 video, via videojs (with hd button extension)
# 2011 by zpea
# feel free to use as public domain / Creative Commons CC0 1.0 (http://creativecommons.org/publicdomain/zero/1.0/)
#

FFMPEG=/usr/bin/ffmpeg
HD_SUFFIX='_hd'
EMBED_WIDTH='640'
EMBED_HEIGHT='360'
SD_RESOLUTION=$EMBED_WIDTH'x'$EMBED_HEIGHT
SERVER_VIDEO_PATH='http://www.example.xx/media/video'

DESCR_H264='mp4 (h.264/aac)'
DESCR_WEBM='webm (vp8/vorbis)'
DESCR_OGG='ogv (theora/vorbis)'

function usage(){
  echo
  echo
  echo usage:
  echo $0' <input video file>'
  echo 
  echo 'The input video file is converted to '$DESCR_H264', '$DESCR_WEBM' and '$DESCR_OGG' videos.'
  echo
  echo 'For each format two versions are created, one "SD" version in low resolution ('$SD_RESOLUTION') and one "HD" version in original resolution (with the "'$HD_SUFFIX'" suffix in the name). Additionally a poster image is created from a screenshot.'
  echo
  echo 'All output files are created in the current working directory and named according to the input file'\''s name' 
  echo
  echo 'At the end a line for use with the videojs plugin for wordpress is generated. ("HD" versions are only useful with an adapted version of videojs)'
  echo
  echo
}


# exactly one argument required
if [ $# -ne 1 ]
then
  usage
  exit 1
fi

INFILE=$1
if [ ! -f $INFILE]
then
  echo 'Input file does not exist or is not a regular file'
  exit 2
fi



BASENAME=${1##*/}
BASE_WITHOUT_EXT=${BASENAME%.*}

OUT_H264=$BASE_WITHOUT_EXT.mp4
OUT_H264_HD=$BASE_WITHOUT_EXT$HD_SUFFIX.mp4

OUT_WEBM=$BASE_WITHOUT_EXT.webm
OUT_WEBM_HD=$BASE_WITHOUT_EXT$HD_SUFFIX.webm

OUT_OGG=$BASE_WITHOUT_EXT.ogv
OUT_OGG_HD=$BASE_WITHOUT_EXT$HD_SUFFIX.ogv

OUT_JPEG=$BASE_WITHOUT_EXT.jpg

# should be unnecessary thanks to -vpre baseline
#H264_OPTS_BASELINE="-vcodec libx264 -b 512k -flags +loop+mv4 -cmp 256 -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 -me_method hex -subq 7 -trellis 1 -refs 5 -bf 0 -flags2 +mixed_refs -coder 0 -me_range 16 -g 250 -keyint_min 25 -sc_threshold 40 -i_qfactor 0.71 -qmin 10 -qmax 51 -qdiff 4"


echo
echo ================================================================
echo '   Starting conversion to SD '$DESCR_H264
echo '   output to '$OUT_H264
echo ================================================================
echo
$FFMPEG -i $INFILE -b 1500k -vcodec libx264 -vpre libx264-slow -vpre libx264-baseline                          -s $SD_RESOLUTION -g 30 $OUT_H264

echo
echo ================================================================
echo '   Starting conversion to HD '$DESCR_H264
echo '   output to '$OUT_H264_HD
echo ================================================================
echo
$FFMPEG -i $INFILE -b 3800k -vcodec libx264 -vpre libx264-slow -vpre libx264-baseline                           -g 30 $OUT_H264_HD


echo
echo ================================================================
echo '   Starting conversion to SD '$DESCR_WEBM
echo '   output to '$OUT_WEBM
echo ================================================================
echo
$FFMPEG -i $INFILE -b 1500k -vcodec libvpx                              -acodec libvorbis -ab 160000 -f webm    -s $SD_RESOLUTION -g 30 $OUT_WEBM

echo
echo ================================================================
echo '   Starting conversion to HD '$DESCR_WEBM
echo '   output to '$OUT_WEBM_HD
echo ================================================================
echo
$FFMPEG -i $INFILE -b 3800k -vcodec libvpx                              -acodec libvorbis -ab 160000 -f webm    -g 30 $OUT_WEBM_HD



echo
echo ================================================================
echo '   Starting conversion to SD '$DESCR_OGG
echo '   output to '$OUT_OGG
echo ================================================================
echo
$FFMPEG -i $INFILE -b 1500k -vcodec libtheora                           -acodec libvorbis -ab 160000            -s $SD_RESOLUTION -g 30 $OUT_OGG

echo
echo ================================================================
echo '   Starting conversion to HD '$DESCR_OGG
echo '   output to '$OUT_OGG_HD
echo ================================================================
echo
$FFMPEG -i $INFILE -b 3800k -vcodec libtheora                           -acodec libvorbis -ab 160000            -g 30 $OUT_OGG_HD



echo
echo ================================================================
echo '   Creating poster jpeg (frame at 5s)'
echo ================================================================
echo
$FFMPEG -i $INFILE -ss 00:05 -vframes 1 -r 1 -f image2 $OUT_JPEG



echo
echo ================================================================
echo '   Tag for embedding'
echo ================================================================
echo
echo '[video webm="'$SERVER_VIDEO_PATH'/'$OUT_WEBM'" ogg="'$SERVER_VIDEO_PATH'/'$OUT_OGG'" mp4="'$SERVER_VIDEO_PATH'/'$OUT_H264'" poster="'$SERVER_VIDEO_PATH'/'$OUT_JPEG'" width="'$EMBED_WIDTH'" height="'$EMBED_HEIGHT'"]'

