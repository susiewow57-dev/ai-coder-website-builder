/**
 * AI Coder Agent - Frontend Application
 */

let id = null;

// Form submission
document.getElementById('websiteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const theme = document.getElementById('theme').value;

    const pages = Array.from(document.querySelectorAll('input[name="pages"]:checked')).map(cb => cb.value);
    const features = Array.from(document.querySelectorAll('input[name="features"]:checked')).map(cb => cb.value);

    if (pages.length === 0) {
        alert('Please select at least one page');
        return;
    }

    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                type,
                description,
                pages,
                theme,
                features,
            }),
        });

        const data = await response.json();
        document.getElementById('loading').style.display = 'none';

        if (data.success) {
            id = data.data.id;
            show(data.data);
            load();
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        alert('Error: ' + error.message);
    }
});

function show(website) {
    const content = document.getElementById('resultContent');
    content.innerHTML = `
        <strong>Website ID:</strong> ${website.id}<br>
        <strong>Name:</strong> ${website.name}<br>
        <strong>Type:</strong> ${website.type}<br>
        <strong>Theme:</strong> ${website.theme}<br>
        <strong>Pages:</strong> ${website.pages.join(', ')}<br>
        <strong>Features:</strong> ${website.features.join(', ') || 'None'}<br>
        <strong>Files:</strong> ${website.files.length}<br>
        <strong>Created:</strong> ${new Date(website.createdAt).toLocaleString()}
    `;
    document.getElementById('result').style.display = 'block';
}

async function load() {
    try {
        const response = await fetch('/api/websites');
        const data = await response.json();

        const list = document.getElementById('websitesList');
        list.innerHTML = '';

        if (data.data.length === 0) {
            list.innerHTML = '<p>No websites yet</p>';
            return;
        }

        data.data.forEach(w => {
            const item = document.createElement('div');
            item.className = 'website-item';
            item.innerHTML = `
                <h4>${w.name}</h4>
                <p><strong>Type:</strong> ${w.type}</p>
                <p><strong>Pages:</strong> ${w.pages.join(', ')}</p>
                <p><strong>Theme:</strong> ${w.theme}</p>
                <p><strong>Created:</strong> ${new Date(w.createdAt).toLocaleString()}</p>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

document.querySelector('.btn-download').addEventListener('click', () => {
    if (id) window.location.href = `/api/download/${id}`;
});

document.querySelector('.btn-preview').addEventListener('click', () => {
    if (id) alert(`Preview: /preview/${id}`);
});

window.addEventListener('DOMContentLoaded', load);
