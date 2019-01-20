export default function Details(callback) {

    this.before_render = function() {
        
    }

    this.selectImg = (e) => {
        const previewImg = document.getElementById('thumbnail-img');
        previewImg.src = e.target.src;
        document.getElementsByClassName('side-img focus')[0].className = ' side-img '
        e.target.className += " focus "
    }

    this.formatDate = (d) => {
        return `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${('00' + d.getDate()).slice(-2)}`
    }

    this.render = function() {
        let data = window.routingData 
        if(!data) {
            data = JSON.parse(localStorage.getItem("routingData"));
        }
        return `<main class="detail-container flex flex-row">
            <aside class="image-preview flex flex-row" >
            <div class="flex flex-column">${[data.images.thumbnail, ...data.images.other].map((img, i)=>{return `<img class="side-img ${i==0?"focus":""}" src="${img}"/>`}).join("")}</div>
            <div class="thumbnail"><img src="${data.images.thumbnail}" id="thumbnail-img"/></div>
            </aside>
            <section class="product-preview">
            <p class="theme-color-2">${data.brand}</p>
            <p class="bold font-mid">${data.name}  (${data.color.join(",  ")})</p>
            <p class="theme-green">Special Price</p>
            <p><span class="bold">Rs ${parseInt(data.price)}<span> <del class="theme-color-2">${data.mrp}</del> <span class="theme-green">${data.discount}% off</span></p>
            <div> <span class="rating-icon">${data.rating} Star</span> <span class="bold theme-color-2">32 ratings and 9 reviews</div>
            <p><span class="bold">Special Offer: </span>No cost EMI with Hdfc bank</p>
            <p><span class="theme-color-2">Seller:</span> Mock Seller</p>
            <hr/>
            <h3>Product Details</h3>
            <p>Color: <span class="bold">${data.color.join(",  ")}</span></p>
            <p>Model Name: ${data.brand}</p>
            <p>Occasion: ${data.occasion}</p>
            <hr/>
            <h3>Ratings & Reviews <span  class="rating-icon">${data.rating} Star</span></h3>
            ${data.reviews.map(ele => {
                return `<p>Rating: <span class="rating-icon">${ele.rating} Star</span></p><p>Review: ${ele.review}</p><p class="theme-color-2"><span class="font-mid bold"> ${ele.createdBy}</span>&nbsp;<span class="font-small">${this.formatDate(new Date(ele.createdAt))}</span></p><hr/>`
            }).join(" ")}
            </section>
        </main>`;
    }

    this.after_render = function() {
       document.querySelectorAll('.side-img').forEach((ele, index)=>{
        ele.addEventListener('click', this.selectImg)
       })
    }
}