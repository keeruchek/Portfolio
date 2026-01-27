// Smooth scroll behavior - less aggressive, more natural
let isScrolling = false;
let scrollTimeout;

// Animated Background Logos - Global array to maintain state
let logoElements = [];

function createAnimatedLogos() {
    // Check if mobile device - reduce animations for performance
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Clear any existing logos
    document.querySelectorAll('.animated-logo').forEach(el => el.remove());
    logoElements = [];
    
    // Reduce number of logos on mobile for better performance
    const logoCount = isMobile ? 3 : 6;
    
    const logos = [
        { text: '</>', class: 'logo-html', speed: 0.5, path: 'circular', size: isMobile ? '2.5em' : '4em' },
        { text: 'JS', class: 'logo-js', speed: 0.7, path: 'figure8', size: isMobile ? '2em' : '3.5em' },
        { text: '🐳', class: 'logo-docker', speed: 0.6, path: 'wave', size: isMobile ? '3em' : '4.5em' },
        { text: 'M', class: 'logo-mongodb', speed: 0.4, path: 'circular', size: isMobile ? '2.5em' : '4em' },
        { text: 'AWS', class: 'logo-aws', speed: 0.55, path: 'figure8', size: isMobile ? '1.8em' : '3em' },
        { text: 'PY', class: 'logo-python', speed: 0.65, path: 'wave', size: isMobile ? '2em' : '3.5em' }
    ];
    
    const container = document.body;
    
    // Only create logos up to logoCount
    const logosToCreate = logos.slice(0, logoCount);
    
    logosToCreate.forEach((logo, index) => {
        const logoEl = document.createElement('div');
        logoEl.className = `animated-logo ${logo.class}`;
        logoEl.textContent = logo.text;
        logoEl.style.fontSize = logo.size || '4em';
        logoEl.style.display = 'block';
        logoEl.style.visibility = 'visible';
        
        // Initial random position (avoid edges)
        const startX = 150 + Math.random() * (window.innerWidth - 300);
        const startY = 150 + Math.random() * (window.innerHeight - 300);
        logoEl.style.left = startX + 'px';
        logoEl.style.top = startY + 'px';
        
        container.appendChild(logoEl);
        
        logoElements.push({
            element: logoEl,
            x: startX,
            y: startY,
            speed: logo.speed,
            path: logo.path,
            radius: isMobile ? (100 + Math.random() * 150) : (200 + Math.random() * 250),
            centerX: startX,
            centerY: startY,
            time: Math.random() * Math.PI * 2,
            isMobile: isMobile
        });
    });
    
    // Start animation loop (slower on mobile)
    if (logoElements.length > 0) {
        animateLogos();
    }
}

// Animation function
function animateLogos() {
    if (logoElements.length === 0) return;
    
    logoElements.forEach((logo) => {
        const element = logo.element;
        const speed = logo.speed;
        const path = logo.path;
        const isMobile = logo.isMobile || false;
        
        // Update time for animation (slower on mobile)
        logo.time += (isMobile ? 0.008 : 0.015) * speed;
        
        let newX, newY;
        
        // Different paths to avoid overlap
        switch(path) {
            case 'circular':
                newX = logo.centerX + Math.cos(logo.time) * logo.radius;
                newY = logo.centerY + Math.sin(logo.time) * logo.radius;
                break;
            case 'figure8':
                newX = logo.centerX + Math.sin(logo.time) * logo.radius;
                newY = logo.centerY + Math.sin(logo.time * 2) * logo.radius * 0.5;
                break;
            case 'wave':
                newX = logo.centerX + logo.time * 30;
                newY = logo.centerY + Math.sin(logo.time * 2) * logo.radius;
                // Reset if goes off screen
                if (newX > window.innerWidth + 150) {
                    logo.centerX = -150;
                    logo.time = 0;
                }
                break;
            default:
                newX = logo.x;
                newY = logo.y;
        }
        
        // Keep logos within bounds with wrapping
        if (newX < -150) newX = window.innerWidth + 150;
        if (newX > window.innerWidth + 150) newX = -150;
        if (newY < -150) newY = window.innerHeight + 150;
        if (newY > window.innerHeight + 150) newY = -150;
        
        // Update position
        logo.x = newX;
        logo.y = newY;
        
        element.style.left = newX + 'px';
        element.style.top = newY + 'px';
        
        // Rotate for visual interest
        element.style.transform = `rotate(${logo.time * 15}deg)`;
    });
    
    requestAnimationFrame(animateLogos);
}

// Handle window resize
window.addEventListener('resize', () => {
    logoElements.forEach(logo => {
        if (logo.x > window.innerWidth) {
            logo.centerX = window.innerWidth / 2;
            logo.x = logo.centerX;
        }
        if (logo.y > window.innerHeight) {
            logo.centerY = window.innerHeight / 2;
            logo.y = logo.centerY;
        }
    });
});

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

// Rotating Tag Cloud Animation for Skills (no backgrounds/borders, auto-rotating)
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
        tag.dataset.x = x;
        tag.dataset.y = y;
        tag.dataset.z = z;
        tag.dataset.phi = phi;
        tag.dataset.theta = theta;
    });
    
    // Auto-rotation animation (no mouse interaction needed)
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

// Initialize tag cloud and animated logos when page loads
window.addEventListener('load', () => {
    createTagCloud();
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        createAnimatedLogos();
    }, 100);
});

// Also try on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.querySelectorAll('.animated-logo').length === 0) {
            createAnimatedLogos();
        }
    }, 200);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
});
