# w3-quadros.github.io

## linux

```shell 
QDIR="/mnt/hgfs/_shared/ubuntu-22.04.2-desktop-amd64/code/rodrigoieh.w3"
# run_previews.sh 
cd $QDIR/w3-quadros.previews.github.io && live-server --no-browser --port=8001
# run_gallery.sh 
cd $QDIR/w3-quadros.github.io && live-server --no-browser --port=8000
# gen_index.sh
cd $QDIR/w3-quadros.github.io && node resources/node/quadros.index.js quadros > resources/js/quadros.index.data.js
```
