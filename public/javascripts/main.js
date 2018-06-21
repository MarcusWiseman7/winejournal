(($) => {
  const pathname = window.location.pathname;

  if (pathname === '/') {
    $('#login').show();
    $('#logout').hide();
    document.getElementById('addWine').disabled = true;
    $('.modal').on('shown.bs.modal', function () {
      $(this).find('[autofocus]').focus();
    });
  }

  if (pathname === '/homepage') {
    $('#logout').show();
    $('#login').hide();
    document.getElementById('addWine').disabled = false;

    // GET all user's drinks from db to display
    const winesTemplate = $('#wines-template').html();
    const compiledWinesTemplate = Handlebars.compile(winesTemplate);

    $.ajax({
      type: 'GET',
      url: '/wines',
      success: (wines) => {
        $('#wines-in-journal').html(compiledWinesTemplate(wines));
      },
      error: (err) => {
        alert('Error getting wines!');
      },
    });
  }

  // POST new user
  $('#newUser').on('click', () => {
    const userInfo = {
      username: $('#username').val(),
      password: $('#password').val(),
    };

    $.ajax({
      type: 'POST',
      url: '/users',
      data: userInfo,
      success: (user) => {
        window.location.replace('/homepage');
        alert(`Welcome to Wine Journal ${user.user.username}!`);
      },
      error: () => {
        alert('Error adding user!');
      },
    });
  });

  // GET wine by id to show
  $('#wines-table').delegate('.modalButton', 'click', function () {
    const showWineTemplate = $('#show-wine-template').html();
    const compiledShowWineTemplate = Handlebars.compile(showWineTemplate);

    $.ajax({
      type: 'GET',
      url: `/add/${this.id}`,
      success: (wine) => {
        $('#show-wine').html(compiledShowWineTemplate(wine));
      },
      error: () => {
        alert('Error getting wine!');
      },
    });
  });

  // GET wine by id to edit
  $('#showWineModal').delegate('.modalButton', 'click', function () {
    const wineEditTemplate = $('#wine-edit-template').html();
    const compiledWineEditTemplate = Handlebars.compile(wineEditTemplate);

    $.ajax({
      type: 'GET',
      url: `/add/${this.id}`,
      success: (wine) => {
        $('#wine-modal-form').html(compiledWineEditTemplate(wine));
      },
      error: () => {
        alert('Error getting wine!');
      },
    });
  });

  // PATCH wine in db
  $('#saveWine').on('click', () => {
    const id = $('#edit-wineId').val();
    const wineInfo = {
      beerName: $('#edit-wineName').val(),
      winery: $('#edit-winery').val(),
      grapes: $('#edit-grapes').val(),
      country: $('#edit-country').val(),
      vintage: $('#edit-vintage').val(),
      price: $('#edit-price').val(),
      location: $('#edit-location').val(),
      rating: $('#edit-rating').val(),
      notes: $('#edit-notes').val(),
    };

    $.ajax({
      type: 'PATCH',
      url: `/add/${id}`,
      data: wineInfo,
      success: (wine) => {
        alert(`Updated ${wine.wine.wineName}`);
        window.location.reload();
      },
      error: () => {
        alert('Error saving wine!');
      },
    });
  });

  // DELETE wine in db
  $('#deleteWine').on('click', () => {
    const id = $('#edit-wineId').val();

    $.ajax({
      type: 'DELETE',
      url: `/add/${id}`,
      success: (wine) => {
        alert(`Deleted ${wine.wine.wineName}`);
        window.location.reload();
      },
      error: () => {
        alert('Error deleting wine!');
      },
    });
  });
})(jQuery);
