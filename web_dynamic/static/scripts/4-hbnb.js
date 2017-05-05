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

  /* Generate default places */
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    headers: {'Content-Type': 'application/json'},
    dataType: 'json'
  }).always(function (data) {
    for (place of data) {
      $('section.places').append(
	$('<article></article>').append(
	  $('<div class="price_by_night">').text('$' + place.price_by_night),
	  $('<h2></h2>').text(place.name),
	  $('<div class="informations"></div>').append(
	    $('<div class="max_guest"></div>').text(place.max_guest + ' Guests'),
	    $('<div class="number_rooms"></div>').text(place.number_rooms + ' Rooms'),
	    $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms')),
	  $('<div class="user"></div>').html('<b>Owner</b>: ' + place.user_id),
	  $('<div class="description"></div>').html(place.description)));
    }
  });

  /* Generate list of checked amenities */
  let amenities = [];
  $('input:checkbox').change(function () {
    let checked_list = [];
    let checked_names = [];
    $(':checkbox').each(function () {
      let checked = $(this).is(":checked");
      if (checked) {
        checked_list.push($(this).data('id'));
        checked_names.push($(this).data('name'));
      }
      amenities = checked_list;
      $('div.amenities h4').text(checked_names.join(', '));
    });
  });

  /* Search for places with checked amenities */
  $('button').click(() => {
    console.log(amenities.length);
    let params = '{}';
    if (amenities.length > 0) {
      params = '{"amenities": ' + JSON.stringify(amenities) + '}';
    }
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: params,
      headers: {'Content-Type': 'application/json'},
      dataType: 'json'
    }).always(function (data) {
      $('section.places').empty().html('<h1>Places</h1>');
      for (place of data) {
        $('section.places').append(
          $('<article></article>').append(
            $('<div class="price_by_night">').text('$' + place.price_by_night),
            $('<h2></h2>').text(place.name),
            $('<div class="informations"></div>').append(
              $('<div class="max_guest"></div>').text(place.max_guest + ' Guests'),
              $('<div class="number_rooms"></div>').text(place.number_rooms + ' Rooms'),
              $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms')),
            $('<div class="user"></div>').html('<b>Owner</b>: ' + place.user_id),
            $('<div class="description"></div>').html(place.description)));
      }
    });
  });

});
