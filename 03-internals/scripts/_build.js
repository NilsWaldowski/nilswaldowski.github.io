if (process.env.NODE_ENV === 'production') {
    console.log('production');
} else if (process.env.NODE_ENV === 'development') {
    console.log('development');
} else {
    console.log('nothing');
}
