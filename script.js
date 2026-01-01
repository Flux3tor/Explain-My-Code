document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("codeInput");
  const button = document.getElementById("explainBtn");
  const output = document.getElementById("output");

  // Disable button initially
  button.disabled = true;

  // Enable/disable button based on input
  input.addEventListener("input", () => {
    const hasText = input.value.trim().length > 0;
    button.disabled = !hasText;
    output.textContent = "";
  });

  // Handle explain click
  button.addEventListener("click", () => {
    button.disabled = true;
    output.textContent = "Analyzing...";

    // Simulate processing delay
    setTimeout(() => {
      const code = input.value.trim();
      const lines = code.split("\n").length;

      output.textContent =
        `Your code has ${lines} line(s).\n\n` +
        `This is a placeholder explanation.\n` +
        `Soon, this will explain what the code does line by line.`;

      button.disabled = false;
    }, 600);
  });
});
