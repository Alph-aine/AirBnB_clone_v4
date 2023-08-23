$(document).ready(init);
const amenObj = {};
const stateObj = {};
const cityObj = {};
let obj = {};

function init () {
  $('.amenities .popover input').change(function () { obj = amenObj; checkedBoxes.call(this, 1); });
  $('.state_input').change(function () { obj = stateObj; checkedBoxes.call(this, 2); });
  $('.city_input').change(function () { obj = cityObj; checkedBoxes.call(this, 3); });
  apiStatus();
  searchPlaces();
}

function checkedBoxes (nObj) {
  // display list of checked boxes
  if ($(this).is(':checked')) {
    obj[$(this).attr('data-name')] = $(this).attr('data-id');
  } else {
    delete obj[$(this).attr('data-name')];
  }

  const names = Object.keys(obj);
  if (nObj === 1) {
    $('.amenities h4').text(names.sort().join(', '));
  } else if (nObj === 2 || nObj === 3) {
    $('.locations h4').text(names.sort().join(', '));
  }
}

// request api
function apiStatus () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
}

// button search
function searchPlaces () {
  $('button').click(function (response) {
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({
        amenities: Object.values(amenObj),
        states: Object.values(stateObj),
        cities: Object.values(cityObj)
      }),
      contentType: 'application/json',
      success: function (response) {
        for (const r of response) {
          const article = ['<article>',
            '<div class="title_box">',
          `<h2>${r.name}</h2>`,
          `<div class="price_by_night">$${r.price_by_night}</div>`,
          '</div>',
          '<div class="information">',
          `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
          '</div>',
          '<div class="description">',
          `${r.description}`,
          '</div>',
          '</article>'];
          $('section.places').append(article.join(''));
        }
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
}
