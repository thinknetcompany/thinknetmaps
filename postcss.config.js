module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-inline-svg'),
        process.env.MINIFY && require('cssnano')
    ]
};
