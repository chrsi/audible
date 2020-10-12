/**
 * Fetches a file from the web.
 * @module file-fetcher/web-file-fetcher
 * 
 * Requests for files from the web using the XMLHttpRequest.
 */

 /**
  * Get the content of a file from the web.
  * @param {string} url Location of the resource file
  */
function get(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onerror = () => { reject("Connection to the server can't be established.") };
    
    request.onreadystatechange = function(){
        if(request.readyState == 4) {
          if (request.status >= 200 && request.status < 300) {
            const result = request.responseText;
            const jsonResult = JSON.parse(result);
            resolve(jsonResult);
          } else {
            reject();
          }
        }
    }
    request.send();
  });
}

export default  {
  get
}