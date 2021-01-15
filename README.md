# e_commerce_app

// helper function to parse through the data (Middleware function)
const bodyParser = (req, res, next) => { //next is a callback from express. Created before promises. Use body-parser library 
  if (req.method==='POST') {
    //get access to email, pass and passConf
    req.on('data', data => {//.on method is same as addEventListener
      // data is sent as hex code
      const parsed = data.toString('utf8').split('&');
      const formData = {};
      for (let pair of parsed) {
        const [key,value] = pair.split('=');
        formData[key] = value;
      }req.body = formData;
      next();});
  } else {next()}
};
