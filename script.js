// Dropdown toggle for Experience / Projects / Certifications
document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});
document.querySelectorAll('.sub-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Skills tag cloud animation using 3D library
// Include your tagcloud.min.js in repo or use CDN
var entries = [
    'Python', 'PyTorch', 'TensorFlow', 'Spark', 'Kafka',
    'Airflow', 'AWS', 'Databricks', 'MLflow', 'LangChain',
    'FastAPI', 'Streamlit', 'VectorDB', 'Docker', 'CI/CD'
];

var settings = {
    entries: entries,
    radius: 150,
    maxSpeed: 'fast',
    initSpeed: 'normal',
    direction: 135,
    keep: true
};
TagCloud('#skills-animation', entries, settings);
