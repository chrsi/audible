/**
 * Fetches a file from the local webserver.
 * @module file-fetcher/filesystefile-fetcher
 * 
 * Requests for files from a local webserver are done using the XMLHttpRequest.
 * The only difference to a usual web request is the status code. Whereas web requests respond with different status codes
 * depending on the outcome, the file system will always return the status code 0.
 * {@link https://stackoverflow.com/questions/17964383/phonegap-ajax-call-fails-everytime/19498463 StackOverflow issue}
 */

 /**
  * Get the content of a file from the filesystem.
  * @param {string} url Location of the resource file
  */
function get(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open('GET',url);
    request.onerror = () => { reject("Resource doesn't exist on the server.") };
    
    request.onreadystatechange = function(){
        if(request.readyState == 4) {
            const result = request.responseText;
            const jsonResult = JSON.parse(result);
            resolve(jsonResult);
        }
    }
    request.send();
  });
}

export default  {
  get
}