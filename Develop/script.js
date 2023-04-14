// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


  for (let i = 9; i <= 17; i++) {
    
    var indexHour = dayjs().hour(i).format('h A');

    // create time block element  
    const timeBlock = $('<div>')
      .addClass('row time-block')
      .attr({'id': 'hour-' + i});
    
    // create hour element
    const hour = $('<div>')
      .addClass('col-2 col-md-1 hour text-center py-3')
      .text(indexHour);

      // create input area element
    const inputArea = $('<textarea>')
    .addClass('col-8 col-md-10 description')
    .attr('rows', 3);
  
    // create save button element
    const saveBtn = $('<button>')
      .addClass('btn saveBtn col-2 col-md-1')
      .attr('aria-label', 'save');

    const saveIcon = $('<i>')
      .addClass('fas fa-save')
      .attr('aria-hidden', true);

    saveBtn.append(saveIcon);

    // append children to time block element
    timeBlock.append(hour, inputArea, saveBtn);
  
    // append time block element to  container
    $('.container').append(timeBlock);

  }


  //we select all the save buttons with the class saveBtn and add eventlisteners to them.
    $(".saveBtn").on("click", function() {
      //using an annonymous function, we grab the textarea value and id of its parent time-block
      var text = $(this).siblings(".description").val().trim();
      var time = $(this).parent().attr("id");

      //we save what user input in the textarea to localstorage and use the
      //id of the time-block as the key
      localStorage.setItem(time, text);
    });



  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  const currentHour = dayjs().format("H");
  
  // Loop through each time block using the .each() method
  $(".time-block").each(function() {
    const blockHour = parseInt($(this).attr("id").split("-").pop());
    // const blockHour = parseInt($(this).attr("data"));
    // const blockHour = $(this).attr("data");
    console.log(blockHour);
    console.log(typeof blockHour);
    
    //apply the appropriate CSS class based on the comparison of blockHour and currentHour
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }

    // console.log(currentHour + " " + blockHour);
    // console.log(parseInt($(".time-block").attr("id")));
    // console.log(parseInt("hour-9".split("-").pop()));
    // console.log($(".time-block").attr("id"));
    // console.log(blockHour)
  });
    

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  var timeBlock = $(".time-block");

  //we use for loop to iterate through each timeBlock to set user input in local storage.
  for(var i = 0; i < timeBlock.length; i++) {

   var timeBlckId = $(timeBlock[i]).attr("id");

    var savedInput = localStorage.getItem(timeBlckId);

    if (savedInput !== null) {
      $(timeBlock[i]).children(".description").val(savedInput);
    }

  }
    

  
  // TODO: Add code to display the current date in the header of the page.
  var currentDay = dayjs().format("dddd, MMMM DD h:mm A")  
  $("#currentDay").text(currentDay);



});