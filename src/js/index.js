import SearchView from '../views/SearchView.js';
import DetailView from '../views/DetailView.js';
const routes = {
    '/': SearchView,
    '/shoe/:id': DetailView
};

function parseUrl() {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
        resource: null,
        id: null,
        verb: null
    }
    request.resource = r[1]
    request.id = r[2]
    request.verb = r[3]
    return request
}

function router() {

    this.changeRoute = function (route, data) {
        currentPage.destory();
        window.location.hash = route;
        window.routingData=data;
        localStorage.setItem("routingData", JSON.stringify(data))

    }
    const rootNode = document.getElementById("root");
    let request = parseUrl()
    let parsedUrl = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    let page = routes[parsedUrl]
    console.log(parsedUrl)
    let currentPage = new page(callback, this.changeRoute);
    currentPage.before_render();
    rootNode.innerHTML = currentPage.render();
    currentPage.after_render();
    function callback() {
        rootNode.innerHTML = currentPage.render();
        currentPage.after_render();
    };
}




window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);