#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 filename \"comma,separated,words\""
    exit 1
fi

# Extract input arguments
output_filename=$1
input_string=$2

# Create a JSON formatted array
json_output="{\"words\":[$(echo $input_string | sed 's/,/","/g' | sed 's/^/"/' | sed 's/$/"/')]}"

# Write the JSON output to the file
echo $json_output >$output_filename

echo "JSON file '$output_filename' created successfully."
