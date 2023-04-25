const photoUrlInput = document.getElementById('photoUrl');
const photoPreview = document.querySelector('.placeholder-img');

photoUrlInput.addEventListener('input', function () {
  photoPreview.src = photoUrlInput.value;
});

const form = document.querySelector('#contact-form');
form.addEventListener('submit', function (event) {

  event.preventDefault();
  const placeholderImage = 'images/placeholder-image-square.jpg';
  const previewImage = document.querySelector('.placeholder-img');
  previewImage.setAttribute('src', placeholderImage);

  if (data.editing === null) {
    const entryId = data.nextEntryId;
    data.nextEntryId++;
    const newEntry = {};
    newEntry.title = form.elements.title.value;
    newEntry.photoUrl = form.elements.photoUrl.value;
    newEntry.text = form.elements.notes.value;
    newEntry.entryId = entryId;
    data.entries.unshift(newEntry);
    $ul.prepend(renderEntry(newEntry));
  } else {
    data.editing.photoUrl = form.elements.photoUrl.value;
    data.editing.title = form.elements.title.value;
    data.editing.text = form.elements.notes.value;
    const $entriesList = document.querySelectorAll('li');
    for (let i = 0; i < $entriesList.length; i++) {
      if (parseInt($entriesList[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        $entriesList[i].replaceWith(renderEntry(data.editing));
      }
    }
  }

  form.reset();
  viewSwap('entries', 'entry-form');
  data.editing = null;
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.className = 'entry';
  $li.setAttribute('data-entry-id', entry.entryId);

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

  const $titleRow = document.createElement('div');
  $titleRow.className = 'row';
  $textContainer.appendChild($titleRow);

  const $columnFourFifths = document.createElement('div');
  $columnFourFifths.className = 'column-four-fifths';
  $titleRow.appendChild($columnFourFifths);

  const $columnOneFifths = document.createElement('div');
  $columnOneFifths.className = 'column-one-fifths';
  $titleRow.appendChild($columnOneFifths);

  const $h2 = document.createElement('h2');
  $h2.className = 'entry-title';
  $h2.textContent = entry.title;
  $columnFourFifths.appendChild($h2);

  const $pencilIcon = document.createElement('i');
  $pencilIcon.className = 'fa fa-pencil pencil-icon';
  $columnOneFifths.appendChild($pencilIcon);

  const $p = document.createElement('p');
  $p.className = 'entry-text';
  $p.textContent = entry.text;
  $textContainer.appendChild($p);

  const $deleteButton = document.createElement('button');
  $deleteButton.textContent = 'Delete Entry';
  $deleteButton.className = 'delete-entry-button';
  $deleteButton.addEventListener('click', function () {
    const modal = document.querySelector('.confirmation-modal');
    modal.classList.remove('hidden');
  });
  $textContainer.appendChild($deleteButton);

  return $li;

}

const $ul = document.querySelector('ul');
$ul.addEventListener('click', function (event) {

  if (event.target.tagName === 'I') {
    const $editItem = event.target.closest('li.entry');

    const $searchId = Number($editItem.getAttribute('data-entry-id'));

    for (let i = 0; i < data.entries.length; i++) {

      if (data.entries[i].entryId === $searchId) {
        data.editing = data.entries[i];

        break;
      }
    }

    document.querySelector('#title').value = data.editing.title;
    document.querySelector('#photoUrl').value = data.editing.photoUrl;
    document.querySelector('#notes').value = data.editing.text;
    document.querySelector('.placeholder-img').src = data.editing.photoUrl;
    document.querySelector('.heading-title').textContent = 'Edit Entry';
    viewSwap('entry-form', 'New Entry');

  }

});

document.addEventListener('DOMContentLoaded', function () {
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
newEntryButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

const cancelDeleteButton = document.querySelector('.cancel-delete-button');
const confirmDeleteButton = document.querySelector('.confirm-delete-button');

cancelDeleteButton.addEventListener('click', function () {
  const modal = document.querySelector('.confirmation-modal');
  modal.classList.add('hidden');
});

confirmDeleteButton.addEventListener('click', function () {
  const editedEntryId = document.querySelector('.entry-form').dataset.entryId;
  const editedEntryIndex = data.entries.findIndex(entry => entry.entryId === editedEntryId);

  data.entries.splice(editedEntryIndex, 1);

  const editedEntryElement = document.querySelector(`li[data-entry-id="${editedEntryId}"]`);
  editedEntryElement.remove();

  if (data.entries.length === 0) {
    toggleNoEntries(true);
  }

  const modal = document.querySelector('.confirmation-modal');
  modal.classList.add('hidden');
  viewSwap('entries');
});
