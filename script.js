document.getElementById('button-create').addEventListener('click', function() {
    const inputUrl = document.getElementById('input-url').value;
    const errorMessage = document.getElementById('error-message');
    const listUrl = document.getElementById('list-url');

    // Clear previous error message
    errorMessage.textContent = '';

    // Validate URL using regex
    const urlPattern = /^(https?:\/\/[^\s]+)/;
    if (!urlPattern.test(inputUrl)) {
        errorMessage.textContent = 'Please enter a valid url';
        return;
    }

    // Generate a random short URL
    const randomChars = Math.random().toString(36).substring(2, 7); // 5 random characters
    const shortUrl = `localhost/${randomChars}`;

    // Create a new list item
    const listItem = document.createElement('li');

    // Create a span for click count
    const clickCountSpan = document.createElement('span');
    clickCountSpan.textContent = 'Clicks: 0';

    // Initialize click count
    let clickCount = 0;

    // Create the link
    const shortLink = document.createElement('a');
    shortLink.href = inputUrl;
    shortLink.target = '_blank';
    shortLink.textContent = shortUrl;

    // Increment click count on link click
    shortLink.addEventListener('click', function() {
        clickCount++;
        clickCountSpan.textContent = `Clicks: ${clickCount}`;
    });

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    // Edit functionality
    editButton.addEventListener('click', function() {
        if (editButton.textContent === 'Edit') {
            // Replace the link with an input
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.value = randomChars; // Set initial value to random string
            listItem.replaceChild(inputEdit, shortLink);
            editButton.textContent = 'Save'; // Change button text to Save
        } else {
            // Save the new random string
            const newRandomChars = listItem.querySelector('input').value; // Get input value from the list item
            const newShortUrl = `localhost/${newRandomChars}`;
            shortLink.href = inputUrl; // Update href to original URL
            shortLink.textContent = newShortUrl; // Update displayed short URL
            listItem.replaceChild(shortLink, listItem.querySelector('input')); // Replace input with updated link
            editButton.textContent = 'Edit'; // Change button text back to Edit
        }
    });

    // Append elements to the list item
    listItem.appendChild(shortLink);
    listItem.appendChild(document.createTextNode(` - ${inputUrl} `));
    listItem.appendChild(clickCountSpan);
    listItem.appendChild(editButton);

    // Append the list item to the ordered list
    listUrl.appendChild(listItem);
});

// Delete functionality
document.getElementById('button-delete').addEventListener('click', function() {
    const inputUrl = document.getElementById('input-url').value;
    const listUrl = document.getElementById('list-url');

    // If no input, remove all items
    if (!inputUrl) {
        listUrl.innerHTML = '';
        return;
    }

    // Get all list items
    const listItems = listUrl.getElementsByTagName('li');
    const itemsToDelete = [];

    // Check for matching URLs
    for (let i = 0; i < listItems.length; i++) {
        const listItemText = listItems[i].textContent;

        if (listItemText.includes(inputUrl)) {
            itemsToDelete.push(listItems[i]);
        }
    }

    // Remove matched items
    itemsToDelete.forEach(item => listUrl.removeChild(item));
});
