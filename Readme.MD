# RNTest

## Create Android Build
 - In android/app/, rename my-release-key.keystore.bck to my-release-key.keystore
 - On terminal, run command
```shell
$ cd android && ./gradlew assembleRelease
```
 - You will find the APK file in: android/app/build/outputs/apk/release/app-release.apk
