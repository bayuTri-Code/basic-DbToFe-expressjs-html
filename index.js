const express = require('express');
const { Pool, Result } = require('pg');
const path = require('path');

const app = express();
const port = 3002;

const poll = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres', 
  port: 5432,
});

app.use(express.static(path.join('')));

app.get('/', (req,res,)=>{
  res.sendFile(path.join(__dirname, '', '/index.html'));
})

app.get('/news', (req, res)=>{
  const query = 'SELECT * FROM news';
  poll.query(query, (error, Result) => {
    if(error){
      console.error('error :', error);
      Result.status(500).send('Internal Server Error');
    }else{
      const news = Result.rows;
      res.json(news);
      console.log('news :', news);
    }
  })
})

app.listen(port, ()=>{
  console.log('Server is running in port', port);
})