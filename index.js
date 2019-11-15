const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'ejs')
  .get('/mail', (req, res) => {
     
      res.render('Pages/index.ejs');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
