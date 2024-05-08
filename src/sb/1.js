async function m1() {
    return 1;
}

async function m2() {
    const n = await m1();
    console.log(n);
}

async function m3() {
    const n = m2();
    console.log(n);
    return 3;
}

m3().then(() => {
    console.log("promise");
});

m3();

console.log("main");
