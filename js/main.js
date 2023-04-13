const photoUrlInput = document.getElementById('photo-url');
const photoPreview = document.querySelector('.placeholder-img');

photoUrlInput.addEventListener('input', function () {
  photoPreview.src = photoUrlInput.value;
});

const form = document.querySelector('#contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const photoUrl = document.querySelector('#photo-url').value;
  const text = document.querySelector('#notes').value;
  const entryId = data.nextEntryId;
  data.nextEntryId++;
  const newEntry = {
    entryId,
    title,
    photoUrl,
    text
  };
  data.entries.unshift(newEntry);
  const placeholderImage = 'images/placeholder-image-square.jpg';
  const previewImage = document.querySelector('.placeholder-img');
  previewImage.setAttribute('src', placeholderImage);
  form.reset();
  location.reload();
  viewSwap('entries');
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.className = 'entry';
  // $li.dataset.entryId = entry.id;

  const $container = document.createElement('div');
  $container.className = 'container';
  $li.appendChild($container);

  const $row = document.createElement('div');
  $row.className = 'row';
  $container.appendChild($row);

  const $imgContainer = document.createElement('div');
  $imgContainer.className = 'column-half';
  $row.appendChild($imgContainer);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $imgContainer.appendChild($img);

  const $textContainer = document.createElement('div');
  $textContainer.className = 'column-half';
  $row.appendChild($textContainer);

  const $h2 = document.createElement('h2');
  $h2.className = 'entry-title';
  $h2.textContent = entry.title;
  $textContainer.appendChild($h2);

  const $p = document.createElement('p');
  $p.className = 'entry-text';
  $p.textContent = entry.text;
  $textContainer.appendChild($p);

  return $li;

}

document.addEventListener('DOMContentLoaded', () => {
  const entriesList = document.querySelector('[data-view="entries"] ul');
  if (data.entries.length > 0) {
    toggleNoEntries(false);
    data.entries.forEach(entry => {
      entriesList.appendChild(renderEntry(entry));
    });
  } else {
    toggleNoEntries(true);
  }
});

function toggleNoEntries(show) {
  const noEntries = document.querySelector('.no-entries');

  if (show) {
    noEntries.classList.remove('hidden');
  } else {
    noEntries.classList.add('hidden');
  }

}

function viewSwap(viewName) {
  const entriesView = document.querySelector('[data-view="entries"]');
  const entryFormView = document.querySelector('[data-view="entry-form"]');
  if (viewName === 'entries') {
    entriesView.classList.remove('hidden');
    entryFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    entriesView.classList.add('hidden');
    entryFormView.classList.remove('hidden');
  }
  data.view = viewName;
}

const newEntryButton = document.querySelector('.new-entry-button');
newEntryButton.addEventListener('click', () => {
  viewSwap('entry-form');
});
