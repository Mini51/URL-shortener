# URL Shortener 

This is a simple URL shortener that you can use to shorten URLs. 

## setup 

1. Install [Node.js](https://nodejs.org/en/). 
2. Install modules: `npm install`.
3. setup up a mongo database(if you don't have one): you can use mongodb atlas which has a free plan. at [https://www.mongodb.com](https://www.mongodb.com)
4. fill out the `config.js` file. 
5. run `npm start`. 
6. enjoy.

<br>

## Usage

<br>
<details open>
<summary>Using the web dashboard</summary>
<br>

To use this tool you can go to the dashboard by going to the following URL: `localhost:3000/dashboard` or `localhost:3000/`

<br>

Make a short URL: input the URL you want to shorten aswell as the secret defined in `config.json` and click `Shorten`. 
<br>

Delete a short URL:  input the secret and the short URL ID and click `Delete`.
</details>
<br>
<details open> 
<summary>Using the command line</summary> 
<br>

Create a new short URL: `curl -XGET -H 'authorization: your secret' -H "Content-type: application/json" -d '{url: "your URL here"}' 'https://localhost:3000/api/create'`
<br>

Delete a short URL: `curl -XGET -H 'authorization: your secret' -H "Content-type: application/json" -d '{url: "your ID here"}' 'https://localhost:3000/api/delete'`

</details>

<br>
<hr>

Made with ❤️ by [mini51](https://github.com/mini51) 

