#!/usr/bin/env -S python3 -u

# Note that running python with the `-u` flag is required on Windows,
# in order to ensure that stdin and stdout are opened in binary, rather
# than text, mode.

import sys
import json
import struct
import time

# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
    # https://docs.python.org/3/library/json.html#basic-usage
    # To get the most compact JSON representation, you should specify 
    # (',', ':') to eliminate whitespace.
    # We want the most compact representation because the browser rejects # messages that exceed 1 MB.
    encodedContent = json.dumps(messageContent, separators=(',', ':')).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout
def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()

# Read patient context stream, save to file
while True:
    with open("/Applications/web-cds/python_demo_app_script/refresh.txt", "r") as f:
        if f.read() == 'refresh':
            sendMessage(encodeMessage("refresh"))
            with open("/Applications/web-cds/python_demo_app_script/refresh.txt", "w") as w:
                pass #do nothing
            f.close()
    time.sleep(1) #just for POC - don't be constantly opening/closing