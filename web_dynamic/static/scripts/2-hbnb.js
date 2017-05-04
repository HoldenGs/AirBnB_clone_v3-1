$(function () {

  /* Check if API is OK! */
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status == "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  }).fail(() => {
    $('div#api_status').removeClass('available');
  });

  /* Generate list of checked amenities */
  $('input:checkbox').change(function () {
    let checked_list = [];
    let checked_names = [];
    $(':checkbox').each(function () {
      let checked = $(this).is(":checked");
      if (checked) {
        checked_list.push($(this).data('id'));
        checked_names.push($(this).data('name'));
      }
      $('div.amenities h4').text(checked_names.join(', '));
    });
  });

});
