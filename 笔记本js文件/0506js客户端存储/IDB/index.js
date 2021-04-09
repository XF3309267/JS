const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
let db;

window.onload = function() {
    //  建立数据库

    let request = window.indexedDB.open('notes_db', 1);
    request.onerror = function() {
        console.log("failed to open");
    };
    request.onsuccess = function() {
        console.log("opened successfully");
        db = request.result;
        displayData();
    };
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });
        console.log("Database setup complete");
    }

    //  添加数据至数据库

    form.onsubmit = addData;
    // submitBtn.addEventListener('click', addData);

    function addData(e) {
        e.preventDefault();
        let newItem = {
            title: titleInput.value,
            body: bodyInput.value
        };
        let transaction = db.transaction(['notes_os'], 'readwrite');
        let objectStore = transaction.objectStore('notes_os');
        var request = objectStore.add(newItem);
        request.onsuccess = function() {
            console.log("request>>success");
            titleInput.value = '';
            bodyInput.value = '';
        };
        transaction.oncomplete = function() {
            console.log("transaction completed: database modification finished");
            displayData();
        };
        transaction.onerror = function() {
            console.log('transaction not opened due to error');
        };
    }
    // 显示数据
    function displayData() {
        console.log("displayData");
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        let objectStore = db.transaction('notes_os').objectStore('notes_os');
        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if (cursor) {
                console.log("cursor");
                console.log("cursor.value.id = " + cursor.value.id);
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');
                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);
                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;
                // Store the ID of the data item inside an attribute on the listItem, so we know 
                // which item it corresponds to. This will be useful later when we want to delete items 
                listItem.setAttribute('data-note-id', cursor.value.id);
                // Create a button and place it inside each listItem
                let deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';
                // Set an event handler so that when the button is clicked, the deleteItem() 
                // function is run 
                deleteBtn.onclick = deleteItem;
                // Iterate to the next item in the cursor
                cursor.continue();
            } else {
                console.log("cursor else");
                // Again, if list item is empty, display a 'No notes stored' message 
                if (!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.'
                    list.appendChild(listItem);
                }
                // if there are no more cursor items to iterate through, say so 
                console.log('Notes all displayed');
            }
        };
    }

    function deleteItem(e) {
        let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
        let transaction = db.transaction(['notes_os'], 'readwrite');
        let objectStore = transaction.objectStore('notes_os');
        let request = objectStore.delete(noteId);
        transaction.oncomplete = function() {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);

            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes stored';
                list.appendChild(listItem);
            }
        }
    }
}