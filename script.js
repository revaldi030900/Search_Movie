function searchMovie(){
	$('#movie-list').html('');
	
	$.ajax({
		url: 'http://www.omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey' : 'b0235747',
			's' : $('#input-text').val()
		},

		success: function(result){
			if(result.Response == "True"){
				let movies = result.Search;
				$.each(movies, function(i, data){
					$('#movie-list').append(`
						<div class= "col-md-3">
						 <div class="card mt-2 mb-2">
							  <img src="` + data.Poster + `" class="card-img-top" alt="Movie Poster">
							  <div class="card-body">
							    <h5 class="card-title">` + data.Title + `</h5>
							    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
							    <a href="" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">Detail</a>
							  </div>
						 </div>
						</div>
					  `)
				})

				$('#input-text').val('');
			} else{
				$('#movie-list').html('<h1>'+ result.Error +'</h1>')
			}
		}
	});
}

$('#input-button').on('click', function(){
	searchMovie();
});

$('#input-text').on('keyup', function(event){
	if (event.which === 13){
		searchMovie();
	}
});

$('#movie-list').on('click', '.see-detail', function(){
	$.ajax({
		url: 'http://www.omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey' : 'b0235747',
			'i' : $(this).data('id'),
			'plot' : 'full'
		},
		success: function(movie){
			if(movie.Response === "True"){
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+ movie.Poster +`" class="img-fluid">
							</div>

							<div class="col-md-8">
								<ul class="list-group">
								  <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
								  <li class="list-group-item">Released		: `+ movie.Released +`</li>
								  <li class="list-group-item">Genre			: `+ movie.Genre +`</li>
								  <li class="list-group-item">Actors		: `+ movie.Actors +`</li>
								  <li class="list-group-item">Synopsis			: `+ movie.Plot +`</li>
								  <li class="list-group-item">Rating (Imdb) : `+ movie.imdbRating +`</li>
								</ul>
							</div>
						</div>
					</div>
					`)
			}
		}
	});
});