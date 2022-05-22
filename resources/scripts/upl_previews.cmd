@@echo off
setlocal enableextensions
set qdir=%qdir%
if "%1"=="" (echo env %qdir%) else (set "qdir=%1" && echo param)
if "%qdir%"=="" (set "qdir=quadros" && echo default) else (echo custom)

cd C:\Dev\rodrigoieh\w3-quadros.previews.github.io
git add . && git commit -m %qdir% && git push