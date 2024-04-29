function myInterval(fn, time = 1000) {
    let timer = null;

    const interval = () => {
        fn();
        timer = setTimeout(interval, time);
    };

    // 立即开始，然后按间隔执行
    timer = setTimeout(interval, time);

    // 返回一个函数来清除间隔
    return () => {
        clearTimeout(timer);
    };
}

module.exports = myInterval;