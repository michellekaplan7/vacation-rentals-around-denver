# Images for VRAD
![Houses](https://media.giphy.com/media/pwZQukFKVFM64/giphy.gif)

## Directions for VRAD Project

1. Clone down this repo to extract the `Images` folder
2. Add the `Images` folder into your `public` folder within your main project directory. 
- WARNING: If the `Images` folder is contained within your `src` directory, you will not be able to utilize the images in your React app!

## Things to Note
* All of the photos in this folder have a consistent naming convention that can be tied to the `listing_id` of each individual listing
* There are three photos per listing - for example, if the `listing_id` is `300`, the photos in the folder will be:
  * 300_a.jpg
  * 300_b.jpg
  * 300_c.jpg
* React can be a little finicky with how you interpolate information in `<img src=????` tags. See example below:
```js
 <img src={`${whatYouWantToInterpolate}`} />
```
