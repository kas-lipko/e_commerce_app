const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// every route handler will automatically be parsed
app.use(bodyParser.urlencoded({extended:true}));
//route handler
app.get('/', (req, res)=>{//request response
  res.send(`
      <div>
        <form method="POST">
          <input name='email' placeholder='email'/>
          <input name='password' placeholder='password'/>
          <input name='passwordconfirmation' placeholder='password confirmation'/>
          <button>Sign Up</button>
        </form>
      </div>
    `);
});

//express method: what to do after a form has been POSTed
app.post('/', (req, res)=>{
  console.log(req.body);
  res.send('Account created!!!');
});
//port number that nodemon will listen to
//to run server: npm run dev
app.listen(3000, ()=>{
  console.log('listening');
});
