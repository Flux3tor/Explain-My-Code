const button = document.getElementById("explainBtn");
const input = document.getElementById("codeInput");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const code = input.value.trim();

  if (!code) {
    output.textContent = "Please paste some code first.";
    return;
  }

  const lines = code.split("\n").length;

  output.textContent =
    `Your code has ${lines} line(s).\n\n` +
    `This is a placeholder explanation.\n` +
    `Soon, this will explain what the code does line by line.`;
});
