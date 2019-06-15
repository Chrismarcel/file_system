import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

// Set port
const port = parseInt(process.env.PORT, 10) || 3080;

// Set app to listen at port
app.listen(port);

export default app;
