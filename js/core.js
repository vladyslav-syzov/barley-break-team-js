function checkResult() {
	var result = "";

	for (var y = 0; y < 4; y++) {

		for (var x = 0; x < 4; x++) {

			var cell = document.querySelector(prepareSelector(x, y));

			result += cell.innerHTML + ',';
		}
	}

	return result === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,,";
}

var emptyPosition = {
	x: 3,
	y: 3
};

function prepareSelector(x, y) {
	return '[data-x="{x}"][data-y="{y}"]'
		.replace("{x}", x)
		.replace("{y}", y);
}

function onCellClick() {
	if (Math.abs(this.dataset.x - emptyPosition.x) + Math.abs(this.dataset.y - emptyPosition.y) !== 1) {
		return;
	}

	var emptyCellDiv = document.querySelector(prepareSelector(emptyPosition.x, emptyPosition.y));

	emptyCellDiv.innerHTML = this.innerHTML;
	this.innerHTML = '';

	emptyPosition.x = this.dataset.x;
	emptyPosition.y = this.dataset.y;

	if (checkResult()) {
		alert('You win!');
	}
};

var initialDataCells = [
	{ x: 0, y: 0 },
	{ x: 1, y: 0 },
	{ x: 2, y: 0 },
	{ x: 3, y: 0 },
	{ x: 0, y: 1 },
	{ x: 1, y: 1 },
	{ x: 2, y: 1 },
	{ x: 3, y: 1 },
	{ x: 0, y: 2 },
	{ x: 1, y: 2 },
	{ x: 2, y: 2 },
	{ x: 3, y: 2 },
	{ x: 0, y: 3 },
	{ x: 1, y: 3 },
	{ x: 2, y: 3 },
	{ x: 3, y: 3 }
];

function refresh() {
	var dataCells = initialDataCells.slice();
	for (var i = 0; i < 16; i++) {

		var index = Math.floor(dataCells.length * Math.random());

		var cellItem = dataCells[index];

		var emptyCellDiv = document.querySelector(prepareSelector(cellItem.x, cellItem.y));

		if (i === 0) {
			emptyCellDiv.innerHTML = '';
			emptyPosition = cellItem;
		} else {
			emptyCellDiv.innerHTML = i;
		}

		dataCells.splice(index, 1);
	}
}

document.addEventListener('DOMContentLoaded', init, false);

function init() {
	var cells = document.getElementsByClassName('cell');

	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', onCellClick);
	}
}