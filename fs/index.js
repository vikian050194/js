window.addEventListener("load", () => {
    const $data = document.getElementById("data");
    const $open = document.getElementById("open");
    const $save = document.getElementById("save");

    $open.addEventListener("click", async () => {
        const [fileHandle] = await window.showOpenFilePicker({
            id: "json-data",
            multiple: false,
            startIn: "documents",
            types: [
                {
                    description: "JSON documents",
                    accept: {
                        "application/json": ".json"
                    }
                },
            ],
            excludeAcceptAllOption: false
        });
        const file = await fileHandle.getFile();
        const contents = await file.text();
        $data.value = contents;
    });

    $save.addEventListener("click", async () => {
        const contents = $data.value;

        const fileHandle = await window.showSaveFilePicker({
            id: "json-data",
            suggestedName: "file.json",
            startIn: "documents",
            types: [
                {
                    description: "JSON documents",
                    accept: {
                        "application/json": ".json"
                    }
                },
            ],
            excludeAcceptAllOption: false
        });
        const file = await fileHandle.createWritable();
        await file.write(contents);
        await file.close();
    });
});