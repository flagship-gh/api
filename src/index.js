(async function () {
    await require("./infrastructure/database")
         .Connect();

     await require("./server")
         .start();
})();
