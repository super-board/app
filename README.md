# 알아라 슈퍼보드 App

## React Native Debugger
```
https://github.com/jhen0409/react-native-debugger
```


## Build
```
//cd ios & pod install
npm run ios // if fail, build in xcode
npm run android
```

## Error Handling
- Your Ruby version is 2.6.8, but your Gemfile specified 2.7.5 

```
$ brew update
$ brew install ruby-build
$ brew install rbenv

$ rbenv install 2.7.5
$ rbenv global 2.7.5
```

- M1 MAC pod install Error

Could not find 'ffi' (>= 1.3.0) among 85 total gem(s) (Gem::MissingSpecError)
```
sudo gem uninstall -aIx
rm -rf ~/.gem
sudo gem install cocoapods

sudo chown -R $USER ~/Library/Caches/CocoaPods
```

pod install
```
arch -x86_64 pod install
```
- target has transitive dependencies that include statically linked binaries
https://github.com/facebook/flipper/issues/606


