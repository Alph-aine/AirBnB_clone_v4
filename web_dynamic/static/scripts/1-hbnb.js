$(document).ready(function () {
  // displays list of clicked checkboxes
  let checkList = [];
  $('input[type=checkbox]').change(function () {
    const name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkList.push(name);
    } else {
      checkList = checkList.filter(value => value !== name);
    }
    $('.amenities h4').text(checkList.join(', '));
  });
});
