const {
    createServer
} = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

// we pass the folder name with files as an environment variable
// so we can use a different folder locally

const FOLDER_NAME = process.env.FOLDER_NAME;
const PORT = process.env.PORT || 8080;
const server = createServer((req, res) => {
    // req.url contains full url, with querystring
    // we ignored it before, but here we want to ensure
    // that we only get pathname, without querystring
    // https://nodejs.org/api/http.html#http_message_url

    const parsedURL = url.parse(req.url);

    // we don't need the first / symbol
    const pathname = parsedURL.pathname.slice(1);

    // in order to return a response, we have to call res.end()
    // https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
    //
    // > The method, response.end(), MUST be called on each response.
    // if we don't call it, the connection won't close and a requester
    // will wait for it until the timeout
    // 
    // by default, we return a response with [code 200](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
    // in case something went wrong, we are supposed to return
    // a correct status code, using the res.statusCode = ... property:
    // https://nodejs.org/api/http.html#http_response_statuscode

    if (pathname.startsWith(".")) {
        res.statusCode = 403;
        res.end("Relative paths are not allowed");
    } else if (pathname.includes("/")) {
        res.statusCode = 403;
        res.end("Nested paths are not allowed");
    } else {
        // https://nodejs.org/en/docs/guides/working-with-different-filesystems/
        // in order to stay cross-platform, we can't just create a path on our own
        // we have to use the platform-specific separator as a delimiter
        // path.join() does exactly that for us:
        // https://nodejs.org/api/path.html#path_path_join_paths
        const filePath = path.join(__dirname, FOLDER_NAME, pathname);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
        fileStream.on("error", e => {
            // we handle only non-existant files, but there are plenty
            // of possible error codes. you can get all common codes from the docs:
            // https://nodejs.org/api/errors.html#errors_common_system_errors

            if (e.code === "ENOENT") {
                res.statusCode = 404;
                res.end("This file does not exist.");
            } else {
                res.statusCode = 500;
                res.end("Internal server error");
            }
        });
    }
});
server.listen(PORT, () => {
    console.log(`application is listening at the port ${PORT}`);
});