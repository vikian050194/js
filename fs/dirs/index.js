window.addEventListener("load", () => {
    const $data = document.getElementById("data");
    const $open = document.getElementById("open");

    $open.addEventListener("click", async () => {
        const dirHandle = await window.showDirectoryPicker({
            mode: "readwrite"
        });
        const promises = [];
        const stack = [dirHandle];

        while (stack.length > 0) {
            const dir = stack.pop();
            for await (const entry of dir.values()) {
                if (entry.kind !== "file") {
                    stack.push(entry);
                    continue;
                }
                promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
            }
        }

        const files = await Promise.all(promises);
        const elements = files.map(f => {
            const $li = document.createElement("li");
            $li.innerHTML = f;
            return $li;
        });
        $data.append(...elements);
    });
});