#!/bin/bash
for file in *.js ; do
    echo "//$file" >> ~/temp
    cat "$file" >> ~/temp
done
