export default function SearchPage(callback, changeRoute) {
    this.before_render = function() {
        this.fetchData();
    }

    this.data = [];
    this.page = 1;
    this.filtered = false;
    this.appliedFilters = {
        search: "",
        brand: [],
        occasion: [],
        sizes: [],
        color: [],
        rating: [],
        discount: []
    };

    this.fetchData = function() {
        fetch('http://localhost:3000/api/v1/shoes').then(function(res){
            return res.json()
        }).then(function(data) {
            this.data = data;
            callback();
        }.bind(this))
    }

    this.lazyLoad = function () {
        let scrollTop = window.scrollY;
        let windowHeight = window.innerHeight;
        let bodyHeight = document.body.scrollHeight - windowHeight;
        let scrollPercentage = (scrollTop / bodyHeight);
        // if the scroll is more than 90% from the top, load more content.
        if(scrollPercentage > 0.9) {
            // Load content
            this.page++;
            fetch('http://localhost:3000/api/v1/shoes?page='+this.page).then(function(res){
            return res.json()
            }).then(function(data) {
                this.data = [...this.data, ...data];
                if(this.filtered) {
                    this.applyFilters()
                }
                callback();
            }.bind(this))
        }
    }.bind(this)

    this.searchData = function(e) {
        this.filtered = true
        this.appliedFilters.search = e.target.value;
        this.applyFilters();
    }.bind(this)

    this.filterData = function(e) {
        this.filtered = true;
        if(e.target.checked) {
            this.appliedFilters[e.target.name] = [...this.appliedFilters[e.target.name], e.target.value]
        }else {
            this.appliedFilters[e.target.name].splice(this.appliedFilters[e.target.name].indexOf(e.target.value), 1)
        }
        this.applyFilters()
    }.bind(this)

    this.applyFilters = function() {
        this.data.forEach(function(data){
            if((this.appliedFilters['brand'].indexOf(data.brand) > -1
            || this.appliedFilters['occasion'].some(el => el.indexOf(data.occasion)>-1)
            || data['color'].some(el => this.appliedFilters['color'].indexOf(el)>-1) 
            || data.sizes.some(el => this.appliedFilters['sizes'].indexOf(el)>-1)  ||
            this.appliedFilters['rating'].some(el => data.rating > parseInt(el)) ) ||
            this.appliedFilters['discount'].some(el => data.discount > parseInt(el))
            || (this.appliedFilters.search.length>0 &&
                (data.brand.toLowerCase().includes(this.appliedFilters.search.toLowerCase())
                || data.name.toLowerCase().includes(this.appliedFilters.search.toLowerCase())
                || data.occasion.toLowerCase().includes(this.appliedFilters.search.toLowerCase())
            )
            )) {
                data.match = true
            }
            else {
                data.match = false
            }
        }.bind(this))
        callback();
    }

    this.render = function() {
        return `<div>
            <header class="search-header flex flex-row flex-center">
                <span class="search-wrapper flex flex-row"><input type="text" id="search-input" value="${this.appliedFilters.search}" class="search-input" placeholder="Search for products, brand and more"/><div class="search-btn" id="search-btn"></div></span>
            </header>
            <main class="flex catalog">
                <section class="filter-sidebar">
                        <h4>Filters</h4>
                        <hr/>
                        <h5>Brands</h5>
                        <input class="filter" ${this.appliedFilters.brand.includes('Adidas')?"checked":""} type="checkbox" name="brand" value="Adidas"/> Adidas<br>
                        <input class="filter" ${this.appliedFilters.brand.includes('Nike')?"checked":""} type="checkbox" name="brand" value="Nike"/> Nike<br>
                        <input class="filter" ${this.appliedFilters.brand.includes('DC')?"checked":""} type="checkbox" name="brand" value="DC" /> DC<br>
                        <input class="filter" ${this.appliedFilters.brand.includes('Vans')?"checked":""} type="checkbox" name="brand" value="Vans"/> Vans<br>
                        <input class="filter" ${this.appliedFilters.brand.includes('Reebok')?"checked":""} type="checkbox" name="brand" value="Reebok" /> Reebok<br><br>
                        <hr/>
                        <h5>Occasions</h5>
                        <input class="filter" ${this.appliedFilters.occasion.includes('casual')?"checked":""} type="checkbox" name="occasion" value="casual"/> Casual<br>
                        <input class="filter" ${this.appliedFilters.brand.includes('party')?"checked":""} type="checkbox" name="occasion" value="party"/> Party<br>
                        <input class="filter" ${this.appliedFilters.brand.includes('wedding')?"checked":""} type="checkbox" name="occasion" value="wedding" /> Wedding<br>
                        <hr/>
                        <h5>Rating</h5>
                        <input class="filter" ${this.appliedFilters.rating.includes('1')?"checked":""} type="checkbox" name="rating" value="1"/> 1 & above<br>
                        <input class="filter" ${this.appliedFilters.rating.includes('2')?"checked":""} type="checkbox" name="rating" value="2"/> 2 & above<br>
                        <input class="filter" ${this.appliedFilters.rating.includes('3')?"checked":""}  type="checkbox" name="rating" value="3"/> 3 & above<br>
                        <input class="filter" ${this.appliedFilters.rating.includes('4')?"checked":""}  type="checkbox" name="rating" value="4"/> 4 & above<br>
                        <hr/>
                        <h5>Colors</h5>
                        <input class="filter" ${this.appliedFilters.color.includes('red')?"checked":""}  type="checkbox" name="color" value="red"/> Red<br>
                        <input class="filter" ${this.appliedFilters.color.includes('blue')?"checked":""} type="checkbox" name="color" value="blue"/> Blue<br>
                        <input class="filter" ${this.appliedFilters.color.includes('green')?"checked":""} type="checkbox" name="color" value="green"/> Green<br>
                        <input class="filter" ${this.appliedFilters.color.includes('black')?"checked":""} type="checkbox" name="color" value="black"/> Black<br>
                        <input class="filter" ${this.appliedFilters.color.includes('brown')?"checked":""} type="checkbox" name="color" value="brown"/> Brown<br>
                        <hr/>
                        <h5>Discount</h5>
                        <input class="filter" ${this.appliedFilters.discount.includes('10')?"checked":""} type="checkbox" name="discount" value="10"/> 10%<br>
                        <input class="filter" ${this.appliedFilters.discount.includes('20')?"checked":""} type="checkbox" name="discount" value="20"/> 20%<br>
                        <input class="filter" ${this.appliedFilters.discount.includes('30')?"checked":""}  type="checkbox" name="discount" value="30"/> 30%<br>
                        <input class="filter" ${this.appliedFilters.discount.includes('40')?"checked":""}  type="checkbox" name="discount" value="40"/> 40%<br>
                        <hr/>
                        <h5>Size</h5>
                        <input class="filter" ${this.appliedFilters.sizes.includes('4')?"checked":""}  type="checkbox" name="sizes" value="4"/> 4<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('5')?"checked":""}  type="checkbox" name="sizes" value="5"/> 5<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('6')?"checked":""}  type="checkbox" name="sizes" value="6"/> 6<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('7')?"checked":""}  type="checkbox" name="sizes" value="7"/> 7<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('8')?"checked":""}  type="checkbox" name="sizes" value="8"/> 8<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('9')?"checked":""}  type="checkbox" name="sizes" value="9"/> 9<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('10')?"checked":""}  type="checkbox" name="sizes" value="10"/> 10<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('11')?"checked":""}  type="checkbox" name="sizes" value="11"/> 11<br>
                        <input class="filter" ${this.appliedFilters.sizes.includes('12')?"checked":""}  type="checkbox" name="sizes" value="12"/> 12<br>
                </section>
                <section class="cards-container">
                    <div class="catalog-header">Shoes <span class="catalog-meta">( Showing ${this.data.length} products)</span></div>
                    <hr/>
                    <div id="cards-container" class="flex flex-row flex-wrap space-around">
                        
                    </div>
                </section>
            </main>
        </div>`;
    }

    this.after_render = function() {
        let cardContainer = []
        this.data.forEach(function(el, index){
            let element = document.createElement('div')
            if(!this.filtered) {
                let card = new Card(el);
                element.innerHTML = card.render();
                element.addEventListener("click", changeRoute.bind(this, "#/shoe/"+el.id, el))
                cardContainer.push(element)

            } else if(el.match) {
                let card = new Card(el);
                element.innerHTML = card.render();
                element.addEventListener("click", changeRoute.bind(this, "#/shoe/"+el.id, el))
                cardContainer.push(element)
            }
        }.bind(this));
        cardContainer.forEach((card)=>{
            document.getElementById('cards-container').appendChild(card);
        })
        document.getElementById("search-input").addEventListener('change', this.searchData);
        document.getElementById("search-btn").addEventListener('change', this.searchData);
        document.querySelectorAll('.filter').forEach(function(element) {
            element.addEventListener('change', this.filterData);
        }.bind(this));
        document.addEventListener('scroll', this.lazyLoad);
    };

    this.destory = function() {
        document.removeEventListener('scroll', this.lazyLoad);
    }
}

function Card(data) {
  
    this.render = function() {
        return `<div class="card">
        <img class="card-image" src="${data.images.thumbnail}"/>
        <div class="card-footer">
            <div class="product-brand theme-color-2">${data.brand}</div>
            <div class="product-name">${data.name}</div>
            <div class="product-price"><span class="bold">Rs. ${parseInt(data.price)}</span>&nbsp;<del class="theme-color-2">${data.mrp}</del>&nbsp;<span class="theme-green">${data.discount}% off</span></div>
            <div class="product-size"><span class="theme-color-2">Size:</span> ${data.sizes.join(',')}</div>
        </div>
        </div>`
    }
}

