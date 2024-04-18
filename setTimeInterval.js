function myInterval(fn, time = 1000) {
    let timer = null;

    let isClear = false;
    function interval() {
        if (isClear) {
            isClear = false;
            clearTimeout(timer);
            return;
        }
        fn();
        timer = setTimeout(interval, time);
    }
    timer = setTimeout(interval, time);
    return () => (isClear = true);
}

const clear = myInterval(() => {
    console.log(123);
}, 2000);
