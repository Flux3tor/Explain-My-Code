document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("codeInput");
    const button = document.getElementById("explainBtn");

    const overviewEl = document.getElementById("overview");
    const lineByLineEl = document.getElementById("lineByLine");
    const issuesEl = document.getElementById("issues");

    button.disabled = true;

    input.addEventListener("input", () => {
        const hasText = input.value.trim().length > 0;
        button.disabled = !hasText;

        overviewEl.textContent = "";
        lineByLineEl.textContent = "";
        issuesEl.textContent = "";
    });

    button.addEventListener("click", () => {
        button.disabled = true;

        overviewEl.textContent = "Analyzing...";
        lineByLineEl.textContent = "";
        issuesEl.textContent = "";

        setTimeout(() => {
            const code = input.value.trim();
            const lines = code.split("\n").length;

            // Fake structured result (this is IMPORTANT)
            const result = {
                 overview: `This code contains ${lines} line(s) and performs some operations.`,
                lineByLine: "Each line will be explained here in the future.",
                issues: "No issues detected yet."
            };

            renderResult(result)
            button.disabled = false;
        }, 600);
    });
    function renderResult(result) {
        overviewEl.textContent = result.overview;
        lineByLineEl.textContent = result.lineByLine;
        issuesEl.textContent = result.issues;
    }
});