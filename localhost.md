# Localhost

Run quadros gallery locally

```
# Step 1
run_previews.cmd

# Step 2
run_gallery.cmd

# Step 3
run_tunnel.cmd
```

After creating a new Quad, run script ```gen_index.cmd``` and copy the image into previews project folder

Committing changes process

1. Commit new preview image to ```w3-quadros.previews.github.io```
2. Switch to ```w3-quadros.github.io``` 
3. Commit and push changes to localhost branch, ignoring localhost js files..
4. Generate new index for preview and main branches
5. Checkout preview branch, merge differences with localhost branch, commit and push
6. Checkout main branch, add new index and Quads files/folders, commit and push