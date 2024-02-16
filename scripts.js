document.addEventListener('DOMContentLoaded', function() {
    const noteText = document.getElementById('noteText');
    const createButton = document.getElementById('createButton');
    const noteList = document.getElementById('noteList');

    // Mostrar notas existentes al cargar la página
    showNotes();

    // Agregar evento al botón "Crear"
    createButton.addEventListener('click', function() {
        const text = noteText.value.trim();
        if (text !== '') {
            addNoteToList(text);
            noteText.value = '';
            saveNotes();
        }
    });

    // Función para mostrar todas las notas existentes
    function showNotes() {
        noteList.innerHTML = '';
        const notes = getSavedNotes();
        notes.forEach(function(note, index) {
            const li = createNoteElement(note);
            noteList.appendChild(li);
        });
    }

    // Función para agregar una nueva nota a la lista
    function addNoteToList(text) {
        const li = createNoteElement(text);
        noteList.appendChild(li);
    }

    // Función para crear un elemento de nota con estilos CSS
    function createNoteElement(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.style.width = '343px';
        li.style.height = '107px';
        li.style.padding = '16px';
        li.style.borderRadius = '16px';
        li.style.border = '2px solid black';
        li.style.marginBottom = '16px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
    
        const deleteButton = document.createElement('button'); 
        deleteButton.textContent = 'Borrar';
        deleteButton.style.width = '83px';
        deleteButton.style.height = '30px';
        deleteButton.style.padding = '4px 16px';
        deleteButton.style.borderRadius = '16px';
        deleteButton.style.backgroundColor = '#E0E0E0';
        deleteButton.style.color = 'black';
        deleteButton.style.border = 'none';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.marginTop = '70px';
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveNotes();
        });
        
        li.appendChild(deleteButton);
        return li;
    }

    // Función para guardar las notas en el almacenamiento local
    function saveNotes() {
        const notes = [];
        noteList.querySelectorAll('li').forEach(function(li) {
            const noteText = li.firstChild.textContent; // obtener texto del primer hijo
            notes.push(noteText);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Función para obtener las notas guardadas del almacenamiento local
    function getSavedNotes() {
        const notesJSON = localStorage.getItem('notes');
        return notesJSON ? JSON.parse(notesJSON) : [];
    }
});