class Search {

    // constants
    static SEARCH_FAILURE = "Pas de chance, nous n'avons trouvé aucun produit avec ces critères !<br />Tentez une nouvelle recherche.";
    static SEARCH_SUCCESS = "Nous avons trouvé ${num} articles correspondants à vos critères";
    static SEARCH_STATE_ZERO = true;

    constructor() {
        this._resource = null;
        this._results = [];
        this._query = '';
        this._widgetClass = "col-md-4";
        this._resourceURL = "http://henri-potier.xebia.fr/books";
        this._lostAndFound = document.querySelector("#lostAndFound");
    }

    get results() {
        return this._results;
    }
    /**
     * Retrieve the resource and execute a callback function on success if given
     * 
     * @param {function} callback 
     */
    fetchResource(callback) {
        fetch(this._resourceURL)
            .then(response => response.json())
            .then(data => {

                this._resource = data;

                if ('function' == typeof callback) {
                    // Trigger callback function on resource found
                    callback.call(this);
                }
            });
    }

    /**
     * Retrieve the q field value of the query string
     */
    parseQuery() {
        let url = new URL(window.location.href);

        this._query = url.searchParams.get('q');
    }

    parseInput() {
        this._query = document.querySelector("#searchInput").value;
    }
    /**
     *  Try to match the query through the resource on the given field
     *  Set the matching rows in a result array
     * 
     *  Returns TRUE if the result array has one key at least otherwise FALSE
     *  
     * @param {string} field
     */
    parseResults(field) {
        if (this._resource === null || this._resource === undefined || this._query == '') {
            return false;
        }

        let query = this._query.toLowerCase();

        for (let key in this._resource) {
            let row = this._resource[key];

            if (row[field] !== undefined && row[field].toLowerCase().indexOf(query) > -1) {
                this._results.push(row);
            }
        }

        return this._results.length > 0;
    }


    /**
     * Loop through the result set and display a template mapped with the current values
     */
    displayResult() {

        for (let key in this._results) {
            let row = this._results[key];
            let title = row.title;
            let cover = row.cover;
            let price = row.price;

            let synopsis = row.synopsis[0].substring(0, 128);

            let widget = document.createElement("div");
            widget.setAttribute("class", this._widgetClass);

            widget.innerHTML =
                `
    <div class="card mb-4 shadow-sm">
        <img src="${cover}" alt="${title}"  width="278" height="409"  preserveAspectRatio="xMidYMid slice" focusable="false" role="img" />
        <div class="card-body">
            <p class="card-text">
            ${title}
            <br />
            ${synopsis}
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">Voir</button>
                </div>
                <small class="text-muted">${price} €</small>
            </div>
        </div>
    </div>
`;
            this._lostAndFound.appendChild(widget);

        }
    }

    displayResultState(forceZero = false) {
        let num = this._results.length;

        if(num === 0 || forceZero) {
            document.querySelector("#resultState").innerHTML = Search.SEARCH_FAILURE;
            document.querySelector("#resetSearch").style.display = "none";
            return;
        }

        document.querySelector("#resultState").innerHTML = `${Search.SEARCH_SUCCESS}`.replace('${num}', num);
        document.querySelector("#resetSearch").style.display = "inline-block";
    }

    /**
     * Clear the search results
     */
    clearSearch() {
        let widgets = this._lostAndFound.querySelectorAll("." + this._widgetClass);
        let the = this;

        widgets.forEach(function (item) {
            the._lostAndFound.removeChild(item);
        });
    }

}

// Start the search
var showSearchResults = function () {
    let search = new Search();
    let criterion = "title";

    // Get the criterion value from the query string and launch the search
    search.parseQuery();
    search.fetchResource(function () {
        search.parseResults(criterion);
        search.displayResultState();
        search.displayResult();
    });

    document.querySelector("#submitSearchCta").onclick = function() {
        search = new Search();
        // Get the criterion value from the input text box and launch the search
        
        search.parseInput();
        search.fetchResource(function () {
            search.clearSearch();
            search.parseResults(criterion);
            search.displayResultState();
            search.displayResult();
        });
    }
    document.querySelector("#resetSearch").onclick = function () {
        search = new Search();
        search.clearSearch();
        search.displayResultState(Search.SEARCH_STATE_ZERO);
    }

}