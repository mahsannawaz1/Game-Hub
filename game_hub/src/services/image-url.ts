import no_image from "../assets/no-image.png";

const getCroppedImageUrl = (url:string) => {
   if(!url) return no_image;
   const index = url.indexOf('media/') + 'media/'.length;
   return url.slice(0,index) + 'crop/600/400/' + url.slice(index)
}

export default getCroppedImageUrl;