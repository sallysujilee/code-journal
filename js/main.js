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
  const notes = document.querySelector('#notes').value;
  const entryId = data.nextEntryId;
  data.nextEntryId++;
  const newEntry = {
    entryId,
    title,
    photoUrl,
    notes
  };
  data.entries.unshift(newEntry);
  const placeholderImage = 'images/placeholder-image-square.jpg';
  const previewImage = document.querySelector('.placeholder-img');
  previewImage.setAttribute('src', placeholderImage);
  form.reset();
});
