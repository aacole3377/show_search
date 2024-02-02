function searchShows() {
    const searchTerm = document.getElementById('searchTerm').value;
    const apiUrl = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let searchHtml = '<div class="row">';
            data.forEach(show => {
                const showHtml = `
    <div class="col-md-4">
        <div class="card">
            <img src="${show.show.image ? show.show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" className="card-img-top" alt="${show.show.name}" 
            data-show-id="${show.show.id}" onClick="showModal(event)">
            <div class="card-body">
                <h5 class="card-title">${show.show.name}</h5>
            </div>
        </div>
    </div>
`;

                searchHtml += showHtml;
            });
            searchHtml += '</div>';
            document.getElementById('searchResults').innerHTML = searchHtml;
        })
        .catch(error => {
            console.log(error);
            document.getElementById('searchResults').innerHTML = '<p>Error searching for TV shows</p>';
        });

}

function showModal(event) {
    const img = event.target;
    const showId = img.getAttribute('data-show-id');
    const description = img.getAttribute('data-description');
    const modalHtml = `
        <div class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${img.alt}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        ${description}
                        <h6>Episodes:</h6>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Season</th>
                                    <th>Episode</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody id="episodeList"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    $('.modal').modal('show');

    const apiUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let episodeHtml = '';
            data.forEach(episode => {
                episodeHtml += `
                    <tr>
                        <td>${episode.season}</td>
                        <td>${episode.number}</td>
                        <td>${episode.name}</td>
                    </tr>
                `;
            });
            document.getElementById('episodeList').innerHTML = episodeHtml;
        })
        .catch(error => {
            console.log(error);
            document.getElementById('episodeList').innerHTML = '<tr><td colspan="3">Error retrieving episode list</td></tr>';
        });
}




