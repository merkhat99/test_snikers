import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {URLConfig} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {CloudConfig} from "@cloudinary/url-gen";

const myCld = new Cloudinary({
  cloud: {
    cloudName: "dbdyyzatb",
  },
});

let cloudConfig = new CloudConfig({cloudName: 'dbdyyzatb'});
let urlConfig = new URLConfig({secure: true});

// let img = myCld.image('samples/cloudinary-icon').resize(thumbnail().width(50).height(50))
let myImage = new CloudinaryImage('samples/cloudinary-icon', cloudConfig, urlConfig);

const Cloundin = () => {
    return <AdvancedImage cldImg={myImage}/>
  };

export default Cloundin;