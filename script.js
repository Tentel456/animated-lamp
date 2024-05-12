let balance = 0;
const tokenButton = document.getElementById('tokenButton');
const balanceDisplay = document.getElementById('balance');

function getTokens() {
    balance += 100;
    balanceDisplay.innerText = `Balance: ${balance}`;
    tokenButton.classList.add('grey-button');
    // Save balance on server
    saveBalanceToServer(balance);
}

function saveBalanceToServer(balance) {
    const serverUrl = 'https://your-github-username.github.io/your-repository-name';
    fetch(`${serverUrl}/save-balance`, {
        method: 'POST',
        body: JSON.stringify({ balance }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Balance saved successfully');
        } else {
            console.error('Failed to save balance');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

tokenButton.addEventListener('click', getTokens);
