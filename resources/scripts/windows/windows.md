# w3-quadros.github.io

## windows

### setup

```shell
:: install live-server node package globally
npm i -g live-server
```

### environment

```shell
:: run_previews.cmd
e: && cd e:\code\rodrigoieh.w3\w3-quadros.previews.github.io && live-server --no-browser --port=8001

:: run_gallery.cmd
e: && cd e:\code\rodrigoieh.w3\w3-quadros.github.io && live-server --no-browser --port=8000
```

### updates

```shell
:: gen_index.cmd
e: && cd e:\code\rodrigoieh.w3\w3-quadros.github.io && node resources/node/quadros.index.js quadros > resources/js/quadros.index.data.js
```