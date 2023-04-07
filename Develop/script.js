
  var currentDayEl = $('#currentDay');
  var containerEl = $('#container');
  var currentHour = dayjs().hour();
  var timeBlockHour = $('col-1 hour')
  var task = $('.description')
  //create array that lists all of the hours for current work day
  var workDayHours = [
      dayjs().hour(9).format('hA'),
      dayjs().hour(10).format('hA'),
      dayjs().hour(11).format('hA'),
      dayjs().hour(12).format('hA'),
      dayjs().hour(13).format('hA'),
      dayjs().hour(14).format('hA'),
      dayjs().hour(15).format('hA'),
      dayjs().hour(16).format('hA'),
      dayjs().hour(17).format('hA')
  ];

  var currentDay = dayjs().format('dddd, MMMM DD');
  currentDayEl.text(currentDay);

  function auditTimeBlock(timeBlockEventSpace) {
      var currentTimeBlockHour = dayjs($(timeBlockHour).text().trim(), 'hA').hour();
  
      $(timeBlockEventSpace).removeClass('past present future');

      if (currentTimeBlockHour > currentHour) {
          $(timeBlockEventSpace).addClass('future');
      }
      else if (currentTimeBlockHour === currentHour) {
          $(timeBlockEventSpace).addClass('present');
      }
      else {
          $(timeBlockEventSpace).addClass('past');
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
  
      var timeBlockEventSpace = $('<div>')
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
  
      auditTimeBlock(timeBlockEventSpace);
  
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
      $(timeBlockRow).append(timeBlockEventSpace);
      $(timeBlockEventSpace).append(userInput);
      $(timeBlockRow).append(saveBtn);
      $(saveBtn).append(saveIcon);
  }

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

// });
