import Home from './components/Home'
import Details from './components/Details'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': new Home(),
  '/details/:id': new Details()
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

  const content = null || document.getElementById('page_container');

  const parseRequestURL = () => {

    let url = location.pathname.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
      resource: null,
      id: null,
      verb: null
    }
    request.resource = r[0]
    request.id = r[1]
    request.verb = r[2]

    return request
  }


  // Get the parsed URl from the addressbar
  let request = parseRequestURL()

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : new Home

  history.params = { id: request.id };

  content.innerHTML = await page.render();

  await page.after_render();
}


export default router