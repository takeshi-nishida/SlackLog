import express from 'express';
import path from 'path';

const app = express();
app.set('port', process.env.PORT || 1337);
app.use(express.static(path.join(__dirname, "../public")));
app.listen(app.get('port'), () => {
    console.log('Server listening at port: ' + app.get('port'));
});