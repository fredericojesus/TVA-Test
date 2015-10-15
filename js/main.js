document.addEventListener('DOMContentLoaded', init);
function init() {
//    history.pushState(null, 'Player', location.pathname + '/player');

    // Bind click handlers
    [].forEach.call(document.querySelectorAll('a'), bindClickByHref);

    // Bind click twitter side tab
    document.getElementsByClassName('twitter-side-tab-handle')[0].addEventListener('click', toggleTwitter);

    setSelectedStationText();
}

function setSelectedStationText() {
    var selectedStation = document.getElementsByClassName('stations-list-station')[2].getAttribute('name');
    document.getElementById('station-selected').getElementsByTagName('span')[0].innerHTML = selectedStation;
}

// helper object
var clickHandlers = {
    stationsList: changeViewToStationsList,
    player: changeViewToPlayer,
    play: play,
    stop: stop,
    close: close,
    next: next,
    previous: previous
};

// toggle twitter tab class
function toggleTwitter(e) {
    e.preventDefault();
    var el = document.getElementsByClassName('twitter-side-tab')[0];

    if (el.className.indexOf('closed') > -1) {
        el.className = el.className.replace(' closed', '');
    } else {
        el.className += ' closed';
    }
}

function bindClickByHref(el) {
    var href = el.getAttribute('href');
    el.addEventListener('click', evtHandler);

    // add the click handler to each <a>
    function evtHandler(e) {
        e.preventDefault();
        if (clickHandlers.hasOwnProperty(href)) {
            clickHandlers[href]();
        }
    }
}

function changeViewToPlayer() {
    //    history.pushState(null, 'Player', location.pathname.replace('/stations-list', '/player'));

    document.getElementById('stations-list').className += 'hidden';
    document.getElementById('player').className = document.getElementById('player').className.replace('hidden', '');

    var controls = document.getElementById('controls');
    controls.children[0].style.display = '';
    controls.children[1].style.display = 'none';
}

function changeViewToStationsList() {
    //    history.pushState(null, 'Stations List', location.pathname.replace('/player', '/stations-list'));

    document.getElementById('stations-list').className = document.getElementById('stations-list').className.replace('hidden', '');
    document.getElementById('player').className += 'hidden';

    var controls = document.getElementById('controls');
    controls.children[0].style.display = 'none';
    controls.children[1].style.display = '';
}

function play() {
    alert('play');
}

function close() {
    alert('close');
}

function stop() {
    alert('stop');
}

var firstval = 0;
function next() {
    firstval += 10;
    parent = document.getElementById('stations-list-stations');
    parent.style.left = firstval + "px";
    if (!(firstval % 150)) {
        firstval = 0;
        var firstChild = parent.firstElementChild;
        var lastChild = parent.lastElementChild;
        parent.insertBefore(lastChild, firstChild);
        parent.style.left= 0;

        setSelectedStationText();
        return;
    }
    setTimeout(next, 20);
}

function previous() {
    firstval += 10;
    parent = document.getElementById('stations-list-stations');
    parent.style.left = "-" + firstval + "px";
    if (!(firstval % 150)) {
        firstval = 0;
        var firstChild = parent.firstElementChild;
        var lastChild = parent.lastElementChild;
        parent.appendChild(firstChild);
        parent.style.left= 0;

        setSelectedStationText();
        return;
    }
    setTimeout(previous, 20);
}
