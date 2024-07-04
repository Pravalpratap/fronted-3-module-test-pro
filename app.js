const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

document.addEventListener('DOMContentLoaded', () => {
    fetchDataWithAsyncAwait(); // Using async/await for fetching data
    document.getElementById('searchInput').addEventListener('input', filterData);
});

let cryptoData = [];

// Fetch data using async/await
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cryptoData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render table with data
function renderTable(data) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = ''; // Clear previous data
    data.forEach(crypto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${crypto.name}</td>
            <td>${crypto.symbol}</td>
            <td>${crypto.current_price}</td>
            <td>${crypto.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter data based on search input
function filterData() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(query));
    renderTable(filteredData);
}

// Sort data by specified key
function sortData(key) {
    const sortedData = [...cryptoData].sort((a, b) => {
        if (key === 'market_cap') {
            return b.market_cap - a.market_cap;
        } else if (key === 'percentage_change') {
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }
    });
    renderTable(sortedData);
}
