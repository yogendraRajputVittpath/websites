// Blog functionality with dynamic loading
let blogsData = [];
let selectedCategory = 'All';

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load blogs from JSON
async function loadBlogs() {
    try {
        const response = await fetch('data/blogs.json');
        blogsData = await response.json();
        renderCategories();
        renderBlogs();
    } catch (error) {
        console.error('Error loading blogs:', error);
        document.getElementById('blogGrid').innerHTML = '<div class="col-12"><p class="text-center text-muted-custom">Unable to load blog posts.</p></div>';
    }
}

// Render category filters
function renderCategories() {
    const categories = ['All', ...new Set(blogsData.map(blog => blog.category))];
    const filtersContainer = document.getElementById('categoryFilters');
    
    filtersContainer.innerHTML = categories.map(category => `
        <button class="btn ${selectedCategory === category ? 'btn-primary-custom' : 'btn-outline-custom'}" 
                style="padding: 10px 24px; font-size: 0.95rem; border-radius: 25px;"
                onclick="filterByCategory('${category}')">
            ${category}
        </button>
    `).join('');
}

// Filter blogs by category
function filterByCategory(category) {
    selectedCategory = category;
    renderCategories();
    renderBlogs();
}

// Render blog cards
function renderBlogs() {
    const filteredBlogs = selectedCategory === 'All' 
        ? blogsData 
        : blogsData.filter(blog => blog.category === selectedCategory);
    
    const blogGrid = document.getElementById('blogGrid');
    
    if (filteredBlogs.length === 0) {
        blogGrid.innerHTML = '<div class="col-12"><p class="text-center text-muted-custom">No blog posts found in this category.</p></div>';
        return;
    }
    
    blogGrid.innerHTML = filteredBlogs.map((blog, index) => `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="blog-card">
                <div class="blog-meta">
                    <span class="blog-category">${blog.category}</span>
                    <span class="blog-date">${formatDate(blog.date)}</span>
                </div>
                
                <h4 class="blog-title">${blog.title}</h4>
                
                <p class="blog-description card-text">
                    ${blog.description}
                </p>
                
                <a href="#" class="read-more" onclick="event.preventDefault();">
                    Read More →
                </a>
            </div>
        </div>
    `).join('');
    
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Load blogs on page load
document.addEventListener('DOMContentLoaded', loadBlogs);
