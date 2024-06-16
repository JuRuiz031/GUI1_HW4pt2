/*
Juan Fernando Ruiz HW4 GUI1 Summer 2024
Comments: This assignment was not quite as bad as the previous one as I had already begun to get used to JS, but learning new libraries while
I felt like I was just starting to learn the previous ones shows the accelerated nature of this course. Despite that, I feel like the error
validation on this one is quite easy to understand and is not the worst thing in the world, at least if I did it correctly (I think I did).
It was also very nice to be able to just have one HW done and use that to get started on the next one, and then build on top of THAT for part 2.
I like that format because it allows me to see how things build up on top of one another, and it allows me to tackle things one step at a time
so as it does not feel overwhelming. I unfortunately was unable to get the tabs thing to work so that is one thing I need work on and I will ask
for an explanation on how I could add it to my code, but this is all I have submitted so far.

The primary sources I used were w3schools and geeksforgeeks on certain parts of it, as well as some youtube videos like those made by freecodecamp,
brocode and some others. Of course, the documentation that I was given to read for parts 1 and 2 were resources that were relied upon a lot too
*/

$(document).ready(function() {
  // Validation rules
  $("#multiplicationForm").validate({
    rules: {
      startRow: {
        required: true,
        number: true,
        min: -200,
        max: 200
      },
      endRow: {
        required: true,
        number: true,
        min: -200,
        max: 200
      },
      startCol: {
        required: true,
        number: true,
        min: -200,
        max: 200
      },
      endCol: {
        required: true,
        number: true,
        min: -200,
        max: 200
      }
    },
    messages: {
      startRow: {
        required: "Please enter a starting row number.",
        number: "Please enter a valid number for the starting row.",
        min: "Starting row must be between -200 and 200.",
        max: "Starting row must be between -200 and 200."
      },
      endRow: {
        required: "Please enter an ending row number.",
        number: "Please enter a valid number for the ending row.",
        min: "Ending row must be between -200 and 200.",
        max: "Ending row must be between -200 and 200."
      },
      startCol: {
        required: "Please enter a starting column number.",
        number: "Please enter a valid number for the starting column.",
        min: "Starting column must be between -200 and 200.",
        max: "Starting column must be between -200 and 200."
      },
      endCol: {
        required: "Please enter an ending column number.",
        number: "Please enter a valid number for the ending column.",
        min: "Ending column must be between -200 and 200.",
        max: "Ending column must be between -200 and 200."
      }
    },
    submitHandler: function(form) {
      generateTable();
    }
  });

  // Function to bind sliders to inputs and vice versa
  function updateValue(slider, input) {
    $(slider).slider({
      range: "min",
      value: $(input).val(),
      min: $(input).data('slider-min'),
      max: $(input).data('slider-max'),
      slide: function(event, ui) {
        $(input).val(ui.value);
        generateTable();
      }
    });

    $(input).on('input', function() {
      var value = $(this).val();
      $(slider).slider('value', value);
      generateTable();
    });
  }

  // Bind sliders and inputs
  updateValue("#startRowSlider", "#startRow");
  updateValue("#endRowSlider", "#endRow");
  updateValue("#startColSlider", "#startCol");
  updateValue("#endColSlider", "#endCol");

  // Function to generate the multiplication table
  function generateTable() {
    // Get user input
    const startRow = parseInt(document.getElementById("startRow").value);
    const endRow = parseInt(document.getElementById("endRow").value);
    const startCol = parseInt(document.getElementById("startCol").value);
    const endCol = parseInt(document.getElementById("endCol").value);

    // Get the container element for error messages
    const errorContainer = document.getElementById("errorContainer");

    // Clear any previous error messages
    errorContainer.textContent = "";

    // Validate the inputs
    if (isNaN(startRow) || isNaN(endRow) || isNaN(startCol) || isNaN(endCol)) {
      errorContainer.textContent = "Please enter valid numbers.";
      return;
    }
    if (startRow > endRow || startCol > endCol) {
      errorContainer.textContent = "Start values should be less than or equal to end values.";
      return;
    }
    if (startRow < -200 || endRow > 200 || startCol < -200 || endCol > 200) {
      errorContainer.textContent = "Values must be between -200 and 200.";
      return;
    }

    // Get the container element where the table will be displayed
    const tableContainer = document.getElementById("tableContainer");

    // Clear the container before starting
    tableContainer.innerHTML = "";

    // Make a new table element
    const table = document.createElement("table");

    // Make a table header row
    const headerRow = document.createElement("tr");

    // Top left corner cell
    const cornerCell = document.createElement("th");
    cornerCell.textContent = "";
    headerRow.appendChild(cornerCell);

    // Loop through columns to make headers
    for (let j = startCol; j <= endCol; j++) {
      const headerCell = document.createElement("th");
      headerCell.textContent = j;
      headerRow.appendChild(headerCell);
    }

    // Append the header row to the table
    table.appendChild(headerRow);

    // Loop through each row
    for (let i = startRow; i <= endRow; i++) {
      // Make a new table row element
      const row = document.createElement("tr");

      const rowCell = document.createElement("th");
      rowCell.textContent = i;
      row.appendChild(rowCell);

      // Loop through each column
      for (let j = startCol; j <= endCol; j++) {
        // Create a new table cell element
        const cell = document.createElement("td");

        // Calculate the multiplication value and set it
        const value = i * j;
        cell.textContent = value;

        // Append the cell to the current row
        row.appendChild(cell);
      }

      // Append the row to the table
      table.appendChild(row);
    }

    // Append the entire table to the container element
    tableContainer.appendChild(table);
  }

  // Initial table generation
  generateTable();
});
