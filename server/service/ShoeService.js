const Brands = ['Adidas', 'Nike', 'Reebok', 'DC', 'Vans'];
const Colors = ['red', 'blue', 'green', 'black', 'brown'];
const Occasions = ['casual', 'party', 'wedding'];
const Ratings = [1,2,3,4,5];
const Discounts = [10, 20, 30, 40, 50];
const Reviews = ['excellent in every aspect', 'Light weight and product as described', 'product is good nd worthy.']
const ShoeImgs = [
    {
        thumbnail: "https://rukminim1.flixcart.com/image/800/960/jqzitu80/shoe/h/s/b/36525603-7-puma-peacoat-white-original-imafcvqztw9rjnck.jpeg",
        other: [
            "https://rukminim1.flixcart.com/image/800/960/jqzitu80/shoe/h/s/b/36525603-7-puma-peacoat-white-original-imafcvqzz5rctahn.jpeg", 
            "https://rukminim1.flixcart.com/image/800/960/jqzitu80/shoe/h/s/b/36525603-7-puma-peacoat-white-original-imafcvqzhx5xarzn.jpeg",
            "https://rukminim1.flixcart.com/image/800/960/jqzitu80/shoe/h/s/b/36525603-7-puma-peacoat-white-original-imafcvqzcggwrmgy.jpeg",
        ]
        
    },
    {
        thumbnail: "https://rukminim1.flixcart.com/image/800/960/jave1zk0/shoe/x/p/g/kor-nw-9-puma-puma-black-asphalt-puma-silver-original-imafycy6xfjetmrr.jpeg",
        other: [
            "https://rukminim1.flixcart.com/image/800/960/jave1zk0/shoe/x/p/g/kor-nw-9-puma-puma-black-asphalt-puma-silver-original-imafycsrxytgc8fw.jpeg",
            "https://rukminim1.flixcart.com/image/800/960/jave1zk0/shoe/x/p/g/kor-nw-9-puma-puma-black-asphalt-puma-silver-original-imafycsqgdheeaph.jpeg",
            "https://rukminim1.flixcart.com/image/800/960/jave1zk0/shoe/x/p/g/kor-nw-9-puma-puma-black-asphalt-puma-silver-original-imafycsq8mbfhtbu.jpeg"
        ]
    }
]

function generateShoesData(startId, count) {
    let shoes = [];
    for(let i=0;i<count;i++) {
        shoes.push(generateMockShoe(startId+i));
    }
    return shoes;
}

function generateMockShoe(id) {
    const totalSizes = Math.floor(generateIntBetweenValues(1,4));
    const mrp = generateIntBetweenValues(300, 4000);
    const discount = getRandomValueFromArray(Discounts);

    return {
        id,
        name: generateRandomString(),
        brand: getRandomValueFromArray(Brands),
        sizes: Array(totalSizes).fill(null).map(()=>generateIntBetweenValues(2,14)),
        color: Colors,
        occasion: getRandomValueFromArray(Occasions),
        mrp,
        discount,
        price: calculateDiscountedPrice(mrp, discount),
        rating: getRandomValueFromArray(Ratings),
        images: getRandomValueFromArray(ShoeImgs),
        reviews: Array(Math.floor(Math.random()*100)).fill(null).map(()=>{
           return {
             createdBy: "Vaibhav Singh",
             rating: getRandomValueFromArray(Ratings),
             review: getRandomValueFromArray(Reviews),
             createdAt: randomDate(new Date(2012, 0, 1), new Date())
           }

        })
    }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
  
function generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

function calculateDiscountedPrice(mrp, discount) {
    return ((100-discount)/100)*mrp
}

function generateIntBetweenValues(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomValueFromArray(choice) {
    return choice[Math.floor(Math.random() * choice.length)];
}

exports.getShoeList = generateShoesData