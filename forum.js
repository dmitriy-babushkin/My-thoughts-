document.getElementById('postButton').addEventListener('click', function() {
    var text = document.getElementById('userInput').value;
    if(text) {
        var timestamp = new Date();
        var message = {text: text, timestamp: timestamp.getTime()};
        displayMessage(message, true);
        document.getElementById('userInput').value = '';

        saveMessage(message);
    }
});

function saveMessage(message) {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function deleteMessage(messageElement, messageTimestamp) {
    if (!confirm('Вы уверены, что хотите удалить это сообщение?')) {
        return;
    }
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages = messages.filter(message => message.timestamp !== messageTimestamp);
    localStorage.setItem('messages', JSON.stringify(messages));
    messageElement.remove();
}

function deleteMessage(messageElement, messageTimestamp) {
    
    if (!confirm('Вы уверены, что хотите удалить это сообщение?')) {
        return;
    }

    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages = messages.filter(message => new Date(message.timestamp).getTime() !== messageTimestamp);
    localStorage.setItem('messages', JSON.stringify(messages));


    messageElement.remove();
}

function displayMessage(message, isNew) {
    var timestamp = new Date(message.timestamp);
    var postTime = document.createElement('div');
    postTime.textContent = timestamp.toLocaleDateString('en-GB', {timeZone: 'Europe/Moscow'}) + ' ' + 
                           timestamp.toLocaleTimeString('en-GB', {timeZone: 'Europe/Moscow'});
    postTime.className = 'postTime';

    var postText = document.createElement('p');
    postText.textContent = message.text;
    postText.className = 'postText';

 
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function() {
        deleteMessage(postContainer, message.timestamp);
    });

    var postContainer = document.createElement('div');
    postContainer.appendChild(postTime);
    postContainer.appendChild(postText);
    postContainer.appendChild(deleteButton);
    postContainer.className = 'postContainer';

    var postList = document.getElementById('postList');
    postList.insertBefore(postContainer, postList.firstChild); 
}


function loadMessages() {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    for(var i = messages.length - 1; i >= 0; i--) {
        displayMessage(messages[i], false);
    }
}


loadMessages();
function displayTask(task, isNew) {
  
    var taskContent = document.createElement('p');
    taskContent.textContent = task.task; 
    taskContent.className = 'taskContent';

    var taskDeadline = document.createElement('p');
    taskDeadline.textContent = task.deadline; 
    taskDeadline.className = 'taskDeadline';


    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function() {
        deleteTask(taskContainer, task.deadline);
    });


    var taskContainer = document.createElement('div');
    taskContainer.appendChild(taskContent);
    taskContainer.appendChild(taskDeadline);
    taskContainer.appendChild(deleteButton);
    taskContainer.className = 'taskContainer';

    var taskList = document.getElementById('taskList');
    taskList.insertBefore(taskContainer, taskList.firstChild); // Добавьте новые задачи в начало списка
}
