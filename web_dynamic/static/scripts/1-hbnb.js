$(function () {
  let checked_list = [];
  let checked_names = [];
  $('input:checkbox').change(function () {
    $(':checkbox').each(function () {
      let checked = $(this).is(":checked");
      if (checked) {
        checked_list.push($(this).data('id'));
        checked_names.push($(this).data('name'));
      }/* else if (checked == false) {
        checked_list.splice($.inArray($(this).data('id'), checked_list), 1);
        checked_names.splice($.inArray($(this).data('name'), checked_names), 1);
      }*/
      $('div.amenities h4').text(checked_names.join(', '));
    });
    console.log(checked_list);
  });
});
