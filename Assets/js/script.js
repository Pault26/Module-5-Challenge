// Select elements and define variables
  var currentDayEl = $('#currentDay');
  var containerEl = $('#container');
  var hourCurrent = dayjs().hour();
  var timeBlockHour = $('.col-1 hour')
  var task = $('.description')
  var workDayHours = [
      dayjs().hour(9).format('hA'),
      dayjs().hour(10).format('hA'),
      dayjs().hour(11).format('hA'),
      dayjs().hour(12).format('hA'),
      dayjs().hour(13).format('hA'),
      dayjs().hour(14).format('hA'),
      dayjs().hour(15).format('hA'),
      dayjs().hour(16).format('hA'),
      dayjs().hour(17).format('hA'),
  ];
  
// Gets Current Date and Applies to Header
var currentDay = dayjs().format('dddd, MMMM DD');
currentDayEl.text(currentDay);

// Create time blocks and append to container
  for (var i = 0; i < workDayHours.length; i++) {
    var timeBlockRow = $('<div>')
      .addClass('row time-block')
      .attr({
        id: 'row-' + (i + 9)
      })
  
    var timeBlockHour = $('<div>')
      .addClass('col-1 hour')
      .text(workDayHours[i])
      .attr({
        id: i + 9
      })
  
    var timeBlockSpace = $('<div>')
      .addClass('col-10')
      .attr({
        id: 'time-block-' + (i + 9)
      })
  
    var userInput = $('<p>')
      .addClass('description')
      .text(' ')
      .attr({
        id: 'Hour-' + (i + 9)
      });
  
    changeBlockTime(timeBlockSpace, timeBlockHour);
  
    var saveBtn = $('<button>')
      .addClass('col-1 saveBtn')
      .attr({
        id: 'save-button-' + (i + 9),
        type: 'button',
      })
      .on('click', function () {
        var hour = $(this).siblings().first().text();
        var task = $(this).siblings().last().text();
        saveTask(hour, task)
      })
  
    var saveIcon = $('<i>')
      .addClass('fas fa-save');
  
  
    $(containerEl).append(timeBlockRow);
    $(timeBlockRow).append(timeBlockHour);
    $(timeBlockRow).append(timeBlockSpace);
    $(timeBlockSpace).append(userInput);
    $(timeBlockRow).append(saveBtn);
    $(saveBtn).append(saveIcon);
  }
  
// Add Time Class to blocks
  function changeBlockTime(timeBlockSpace, hour) {
    var currentTimeBlock = dayjs().hour(hour.text(), 'hA').minute(0).second(0);
    var startOfHour = currentTimeBlock.startOf('hour');
    var endOfHour = currentTimeBlock.endOf('hour');
    var isCurrentHour = currentTimeBlock.isSame(dayjs(), 'hour');
    
    $(timeBlockSpace).removeClass('past present future');
    
    if (startOfHour.isBefore(dayjs()) && endOfHour.isBefore(dayjs())) {
      $(timeBlockSpace).addClass('past');
    } else if (isCurrentHour) {
      $(timeBlockSpace).addClass('present');
    } else {
      $(timeBlockSpace).addClass('future');
    }
  }
  

  function loadTask() {
      for (var i = 0; i < workDayHours.length; i++) {
          let task = localStorage.getItem(workDayHours[i])
  
          if (task) {
              $('#' + (i + 9)).siblings().first().children().text(task);
          }
      }
  }

  function saveTask(hour, task) {
      localStorage.setItem(hour, task);
  }

// Add event listeners for editing task
  $('.col-10').on('click', 'p', function () {
  
      var text = $(this)
          .text()
          .trim()
  
      var textInput = $('<textarea>')
          .addClass('form-control')
          .val(text);
  
      $(this).replaceWith(textInput);
  
      textInput.trigger('focus');
  });
  
  $('.col-10').on('blur', 'textarea', function () {
      var text = $(this)
          .val()
          .trim();
  
      var userTextP = $("<p>")
          .addClass("description")
          .text(text);
  
      $(this).replaceWith(userTextP);
  })
  
  loadTask();
