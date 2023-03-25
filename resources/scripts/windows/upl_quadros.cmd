@@echo off
set period=%date:~6,4%%date:~3,2%
cd C:\Dev\rodrigoieh\w3-quadros.github.io\
git add . && git commit -m %period% && git push