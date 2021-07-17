/*** Debugging Utils ***/

/* Event monitoring for each element using id prefix: preview-img */
window.onload = (event) => {
    let intervalInMilliseconds = 3000;
    setTimeout(() => {
        console.debug(`listening on image events, ${intervalInMilliseconds / 1000} seconds after onload event..`);
        const previews = document.querySelectorAll('[id^="preview-img"]');
        previews.forEach((preview) => {
            let image = new Image();
            // image.onload = () => console.debug(preview.id, 'onload');
            // image.onerror = () => console.error(preview.id, 'onerror');
            // image.onabort = () => console.error(preview.id, 'onabort');
            image.addEventListener('load', event => {
                let isImageLoaded = image.complete && image.naturalHeight !== 0;
                console.debug('load', preview.id, preview.src, isImageLoaded, event);
            });
            image.addEventListener('error', event => {
                console.error('error', preview.id, preview.src, event);
            });
            image.addEventListener('abort', event => {
                console.error('abort', preview.id, preview.src, event);
            });
        });
    }, intervalInMilliseconds);
}
