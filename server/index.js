const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Joaquín c la come');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Example app listening on port'+ app.get('port'));
});