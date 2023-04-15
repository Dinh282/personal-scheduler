// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
 
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

      //when saveBtn is clicked we have a fadeIn and fadeOut effect for a message notifying 
      //user that their entry is saved/
      $(".savedMessage").text("Entry Saved! 💾").fadeIn('slow', function(){
        setTimeout(function() {
          $('.savedMessage').fadeOut('slow')
        }, 600);
      })
    });

  // loop through each time block using the .each() method
  $(".time-block").each(function() {
    //we split hour-x at - to get an array of [hour, x] and we pop off 
    //x to use as value for blockhour
    const blockHour = parseInt($(this).attr("id").split("-").pop());
    const currentHour = dayjs().format("H");

    //apply the appropriate CSS class based on the comparison of blockHour and currentHour
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
    
  var timeBlock = $(".time-block");
  //we use for loop to iterate through each timeBlock to get user input from local storage.
  for(var i = 0; i < timeBlock.length; i++) {

  var timeBlckId = $(timeBlock[i]).attr("id");
  var savedInput = localStorage.getItem(timeBlckId);

  //if there is a value for the key of the time block, then we set it to the text area.
    if (savedInput !== null) {
      $(timeBlock[i]).children(".description").val(savedInput);
    }
  }
    
  //adds display the current date in the header of the page. 
  //setInterval allows the time to be updated every 1 second.
  setInterval(function (){
    var currentDay = dayjs().format("dddd, MMMM DD h:mm:ss A")
    $("#currentDay").text(currentDay);
  }, 1000)


});