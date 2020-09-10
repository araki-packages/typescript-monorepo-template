import express from 'express';
function main() {
    const app = express();
    app.get('/hogehoge', (req, res) => {
        res.status(200).json({
            hoge: 'fugaan'
        })
    })
    app.listen(3010);
}

main();