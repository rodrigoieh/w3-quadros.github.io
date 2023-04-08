@@echo off
set period=%date:~6,4%%date:~3,2%
e: && cd e:\code\rodrigoieh.w3\w3-quadros.previews.github.io
git add . && git commit -m %period% && git push