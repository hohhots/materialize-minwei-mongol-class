#!/bin/bash

vowels=("a" "e" "i" "o" "o2" "u" "u2")

alphas=("a" "n" "b" "p" "h" "g" "m" "l" "s" "sh" "t" "d" "ch" "zh" "y" "r" "w")

m="w"

  for alpha in "${alphas[@]}"
   do

    dir="$alpha"
    if [ $alpha != "a" ]
    then
     dir="$alpha${vowels[0]}"
    fi

    for num in $(seq 1 ${#vowels[@]})
     do
      source="$dir/$alpha$num$m"
      target="$dir/$alpha${vowels[$num-1]}-$m"
      if [ $alpha == "a" ]
       then
        target="$dir/${vowels[$num-1]}-$m"
       fi

      mv $source.mp3 $target.mp3
      mv $source.ogg $target.ogg
     done

   done





