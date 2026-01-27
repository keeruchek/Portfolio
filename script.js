// Dropdown toggle functionality
document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const isActive = btn.classList.contains('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-btn').forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('active');
                otherBtn.nextElementSibling.style.display = 'none';
            }
        });
        
        // Toggle current dropdown
        if (isActive) {
            btn.classList.remove('active');
            content.style.display = 'none';
        } else {
            btn.classList.add('active');
            content.style.display = 'block';
        }
    });
});

// Rotating Tag Cloud Animation for Skills Section
function createTagCloud() {
    const container = document.getElementById('tag-cloud-container');
    if (!container) return;
    
    const skills = [
        'Python', 'PyTorch', 'TensorFlow', 'Spark', 'Kafka',
        'Airflow', 'AWS', 'Databricks', 'MLflow', 'LangChain',
        'FastAPI', 'Streamlit', 'VectorDB', 'Docker', 'CI/CD',
        'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
        'Git', 'Jenkins', 'Terraform', 'CloudFormation', 'SageMaker'
    ];
    
    // Wait for container to have dimensions
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
        setTimeout(createTagCloud, 100);
        return;
    }
    
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.35;
    
    skills.forEach((skill, index) => {
        const tag = document.createElement('div');
        tag.className = 'tag-cloud-tag';
        tag.textContent = skill;
        container.appendChild(tag);
        
        // Calculate initial position on sphere
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        
        const x = centerX + radius * Math.cos(theta) * Math.sin(phi);
        const y = centerY + radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        tag.style.left = x + 'px';
        tag.style.top = y + 'px';
        tag.dataset.phi = phi;
        tag.dataset.theta = theta;
    });
    
    // Auto-rotation animation
    let angleX = 0;
    let angleY = 0;
    const rotationSpeedX = 0.003;
    const rotationSpeedY = 0.002;
    
    function animate() {
        // Continuous rotation
        angleX += rotationSpeedX;
        angleY += rotationSpeedY;
        
        const tags = container.querySelectorAll('.tag-cloud-tag');
        tags.forEach(tag => {
            const phi = parseFloat(tag.dataset.phi);
            const theta = parseFloat(tag.dataset.theta);
            
            // Apply rotations
            let x = Math.cos(theta + angleY) * Math.sin(phi);
            let y = Math.sin(theta + angleY) * Math.sin(phi);
            let z = Math.cos(phi);
            
            // Rotate around X axis
            const tempY = y;
            y = y * Math.cos(angleX) - z * Math.sin(angleX);
            z = tempY * Math.sin(angleX) + z * Math.cos(angleX);
            
            // Project to 2D
            const scale = 300 / (300 + z * radius);
            const screenX = centerX + x * radius * scale;
            const screenY = centerY + y * radius * scale;
            
            tag.style.left = screenX + 'px';
            tag.style.top = screenY + 'px';
            tag.style.opacity = 0.4 + (z / radius + 1) * 0.6;
            tag.style.transform = `scale(${scale})`;
            tag.style.zIndex = Math.floor((z + radius) * 10);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize tag cloud when page loads
window.addEventListener('load', () => {
    createTagCloud();
});

// Also initialize on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
    if (document.readyState === 'loading') {
        return;
    }
    createTagCloud();
});

// Handle window resize for tag cloud
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('tag-cloud-container');
        if (container && container.querySelectorAll('.tag-cloud-tag').length > 0) {
            // Recreate tag cloud on significant resize
            container.innerHTML = '';
            createTagCloud();
        }
    }, 250);
});
