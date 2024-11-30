/** Convert an "Image URL" to a "Blob" type.
 *  Tutorials links:
 *      https://newbedev.com/javascript-image-url-to-blob-javascript-code-example
 *      https://www.tutorialspoint.com/how-to-convert-an-image-to-blob-using-javascript
*/
const convertImageURLToBlob = async (imageInputURL) => {
    const blobImage =
      fetch(imageInputURL)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
            // Here's where you get access to the blob
            // And you can use it for whatever you want
            // Like calling ref().put(blob)
            return blob;
        });
    return blobImage;
};

const resizeCompressAndReturnNewURL = /* async */ (imageFileBlobInput) => {
    //let u = '';
    const resizedImage = Compress.imageFileResizer(
    //new Promise((resolve: any) => {
        //Compress.imageFileResizer(    
            imageFileBlobInput, // the file from input of 'Blob' type
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri) => {
                //u = uri.toString();
                //resolve(uri.toString());
                console.log(uri);
                // You upload logic goes here
            },
            "base64" // blob or base64 default base64
    );
   // });    
    return resizedImage;
   //return u;  
};

/** Compress images to downgrade their "Size, Dimension (Width & Height) & Quality"
 *  using "ReactJS Image File Resize" library (react-image-file-resizer).
 *  Tutorials links: 
 *      https://dev.to/wchr/compress-images-in-react-react-image-file-resize-4oni
 *      https://www.npmjs.com/package/react-image-file-resizer
 *      https://pretagteam.com/question/reactjs-resize-image-before-upload 
*/
export const imageFileResizeCompression = async (imageInputURL) => {
    const imageFileBlob = await convertImageURLToBlob(imageInputURL); // e.target.files[0];
    console.log('imageFile Size: ', imageFileBlob.size, 'imageFile Type: ', imageFileBlob.type);
    const img =  /* await */ resizeCompressAndReturnNewURL(imageFileBlob); /* .then(x => x); */
    return img;
}