const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp')
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const rand1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*500)+10;
        const camp = new Campground({
            author: '63e9377c55d70532b163a885',
            location: `${cities[rand1000].city},${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptatibus quia dolorum ut quibusdam vel ullam ipsum aut maxime, eos eum provident consectetur voluptatem harum. Dignissimos praesentium beatae unde voluptates!',
            price: price,
            geometry: { 
                type: 'Point',
                coordinates: [ 
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ] 
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dozacq9su/image/upload/v1676671975/YelpCamp/u25ttj5u4czqepwqvhjl.png',
                  filename: 'YelpCamp/u25ttj5u4czqepwqvhjl',
                },
                {
                  url: 'https://res.cloudinary.com/dozacq9su/image/upload/v1676671990/YelpCamp/jhkkkbkb6gkohcr0mzi2.png',
                  filename: 'YelpCamp/jhkkkbkb6gkohcr0mzi2',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() =>{
    mongoose.connection.close();
})
