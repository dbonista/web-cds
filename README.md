# web-cds
Web-Based CDS Hooks Tools
- Works on Mac

1. Clone repo to the /Applications directory
2. Go to chrome://extensions/ and "Load upacked". Choose your "/Applications/web-cds/athena_chrome_extension folder.
3. Copy the ID of the newly registered extension, you'll need this.
4. Copy the files from /Applications/web-cds/native_hosts to /Library/Google/Chrome/NativeMessagingHosts/ directory. Within both files, make sure that you allowlist the ID you copied in the previous step.
5. You may need to make your demo app files executable through Chrome. Do this using "chmod 755 /Applications/web-cds/python_demo_app_script/native_app.py" and "chmod 755 /Applications/web-cds/python_demo_app_script/refresh_helper.py"

While the program is running:
1. Run "tail -f /Applications/web-cds/python_demo_app_script/context.ndjson" in terminal to follow along with workflow context.
2. At any point, you can set the /Applications/web-cds/python_demo_app_script/refresh.txt file to contain the term "refresh" and the web app will refresh context.
