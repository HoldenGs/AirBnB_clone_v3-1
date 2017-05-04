$(function () {
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
    console.log(checked_list);
  });
});
